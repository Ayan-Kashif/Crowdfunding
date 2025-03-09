const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')
const Stripe = require("stripe");
const Admin = require("./models/Admin");

const Campaign = require("./models/Campaign");


require("dotenv").config();
const app = express()
app.use(express.json());
app.use(cors());


const stripe = new Stripe('sk_test_51Qsp8UQ6aazoGitOzBp05ADMgLTdkGvefg2UKqUA45I7a2yPYXtnlKQmvqd3vv3MCJIrIlXNyqelEnwOiTClrd7u00OQssjmKx');

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
    console.log("Server running on port 5000");
});



// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save uploaded files in "uploads/" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});




// Get all campaigns
// app.get("/campaigns", async (req, res) => {
//     try {
//         const campaigns = await Campaign.find().populate('creator', 'name');
//         res.status(200).json(campaigns);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


app.get("/campaigns", async (req, res) => {
    try {
        const currentTime = new Date();

        // Fetch campaigns and filter them based on remaining time
        const campaigns = await Campaign.find().populate('creator', 'name');

        const activeCampaigns = campaigns.filter(campaign => {
            const endTime = new Date(campaign.createdAt);
            endTime.setDate(endTime.getDate() + campaign.duration); // Adding days to createdAt
        
            return (
                endTime > currentTime && // Campaign is still active
                campaign.status === "approved" && // Campaign is approved
                !campaign.creator.banned // Creator is not banned
            );
        });

        res.status(200).json(activeCampaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fix __dirname for ES module
const __dirName = path.resolve();

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirName, 'uploads')));




//For project
app.post("/project", async (req, res) => {
    const { projectID } = req.body
    try {
        const project = await Campaign.findOne({ _id: projectID });  // Fetch project based on id
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Failed to fetch students" });
    }
})


// Signup Route
app.post("/signup", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
         res.status(400).json({ message: "All fields are required!" });
        }

        let existingUser = await User.findOne({ email });
   if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
}

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

         // Generate JWT token
         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

         // Send response
         return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } , message: "User registered successfully" });

      
    } catch (error) {
        next(error);
    }
});

// Login Route
app.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if fields are missing
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send response
        return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
});





// Configure Multer for file uploads

const upload = multer({ storage });

// Handle campaign creation with image upload
app.post("/campaign", upload.single("image"), async (req, res) => {
    try {
        console.log("🚀 Form Data Received:", req.body); // Debugging
        console.log("📸 File Uploaded:", req.file); // Debugging

        const { title, description, goal, duration, category, location, creator } = req.body;

        if (!title || !description || !goal || !duration || !location || !creator) {
            console.log('All fields are required')
            return res.status(400).json({ error: "All fields are required." });

        }

        const newCampaign = new Campaign({
            title,
            description,
            goal: Number(goal), // Convert string to number
            duration: Number(duration),
            location,
            category,

            image: req.file ? `/uploads/${req.file.filename}` : null, // Save image URL
            status: "pending",
            creator: creator || null, // Authenticated user (optional)
        });

        await newCampaign.save();
        res.status(201).json({ message: "Campaign submitted for approval", campaign: newCampaign });






    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});




//Payments

app.post('/stripe/create-account', async (req, res) => {
    try {
        const { email, creatorId } = req.body; // Get user details
        console.log(creatorId)
        // Create a Stripe Connect account for the campaign creator
        const account = await stripe.accounts.create({
            type: "express",
            country: "US", // Change based on your needs
            email: email,
            capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
        });

        // Create an onboarding link for the user
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: "http://82.29.153.135:3000/retry",
            return_url: `http://82.29.153.135:3000/create-campaign`,
            type: "account_onboarding",
        });
        await User.findByIdAndUpdate(creatorId, { accountID: account.id });



        console.log(account.id)
        res.json({ url: accountLink.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
})

app.post('/stripe/fund-project', async (req, res) => {
    try {
        const { creatorId } = req.body;
        const creator = await User.findOne({ _id: creatorId });

        if (!creator || !creator.accountID) {
            return res.status(400).json({ error: "Invalid creator or missing account ID" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents ($10.00)
            currency: 'usd',
            payment_method_types: ['card'],
            confirm: true,
            payment_method: 'pm_card_visa', // Test card token
            transfer_data: {
                destination: creator.accountID,
            },
        });

        console.log('Payment successful:', paymentIntent);
        res.json({ success: true, paymentIntent });

    } catch (error) {
        console.error('Payment failed:', error);
        res.status(500).json({ error: error.message });
    }
});


app.post("/stripe/create-checkout-session", async (req, res) => {
    try {
        const { projectId, amount, userId } = req.body; // userId = donor

        // ✅ Find the project
        const project = await Campaign.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }

        // ✅ Find the project creator
        const creator = await User.findById(project.creator);
        if (!creator || !creator.accountID) {
            return res.status(400).json({ error: "Invalid creator or missing account ID" });
        }

        // ✅ Create Checkout Session with Transfer
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Project Funding" },
                        unit_amount: amount, // Amount in cents ($10 = 1000)
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            payment_intent_data: {
                transfer_data: {
                    destination: creator.accountID, // ✅ Project creator's Stripe account
                },
            },
        });

        // ✅ Update pledged amount & backers **BEFORE** sending response
        project.pledged += amount / 100; // Convert cents to dollars
        project.backers.push({
            user: userId, // Donor
            amount: amount / 100,
            date: new Date(),
        });

        // Increase backers count
        project.backersCount = project.backers.length;
        await project.save();

        // ✅ Send response **ONLY ONCE**
        res.json({ sessionId: session.id });

    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: error.message });
    }
});



// Personal Campaigns

app.post("/myCampaigns", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "User ID is required." });
        }
        const campaigns = await Campaign.find({ creator: id });// Fetch backers for each campaign separately
        const campaignsWithBackers = await Promise.all(
            campaigns.map(async (campaign) => {
                const backers = await User.find({ _id: { $in: campaign.backers.map(b => b.user) } });
                return { ...campaign.toObject(), backers }; // Convert Mongoose document to object
            })
        );

        res.status(200).json(campaignsWithBackers);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Delete a campaign by ID
app.delete("/deleteCampaign/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        if (!id) {
            return res.status(400).json({ error: "Campaign ID is required." });
        }
        const campaign = await Campaign.findById({ _id: id });
        if (!campaign) {
            return res.status(404).json({ error: "Campaign not found." });
        }
        await campaign.deleteOne();
        res.status(200).json({ message: "Campaign deleted successfully." });
    } catch (error) {
        console.error("Error deleting campaign:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});








//Approve route
app.put("/approve", async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        if (!id) {
            return res.status(400).json({ message: "Campaign ID is required" });
        }


        const updatedCampaign = await Campaign.findByIdAndUpdate(
            id,
            { status: 'approved', approvedAt: Date.now() },
            { new: true } // Ensures the updated document is returned
        );
        if (!updatedCampaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.json(updatedCampaign);
        console.log(updatedCampaign)










    } catch (err) {
        console.error("Error updating Campaign:", err);
        res.status(500).json({ message: "Failed to update Campaign", error: err.message });
    }
});



//Reject Route

app.put("/reject", async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        if (!id) {
            return res.status(400).json({ message: "Campaign ID is required" });
        }


        const updatedCampaign = await Campaign.findByIdAndUpdate(
            id,
            { status: 'rejected', rejectedAt: Date.now() },
            { new: true } // Ensures the updated document is returned
        );
        if (!updatedCampaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.json(updatedCampaign);
        console.log(updatedCampaign)










    } catch (err) {
        console.error("Error updating Campaign:", err);
        res.status(500).json({ message: "Failed to update Campaign", error: err.message });
    }
});



// Admin







//Login router for the House Masters
app.post("/admin-login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    try {
        const admin = await Admin.findOne({ username });
        console.log(admin)
        if (!admin) return res.status(401).json({ message: "Invalid credentials" });


        // ✅ CORRECT: Compare plain password with hashed one
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("🔹 Password match result:", isMatch);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});



app.put("/admin-change-password", async (req, res) => {
    const { oldPassword, newPassword } = req.body;


    try {
        const admin = await Admin.findOne();
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
        await admin.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});









(async () => {
    const password = "admin123";  // Set the correct password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("🔹 Correct Hashed Password:", hashedPassword);
})();




// Ban or unban a user
app.put("/admin/users/:id/ban", async (req, res) => {
    try {
        const { id } = req.params;
        const { banned } = req.body; // Get the new ban status from the request
        console.log(id, banned)
        const user = await User.findByIdAndUpdate(
            id,
            {banned:banned}, // Use $set to explicitly update the field
            { new: true, runValidators: true } // Ensures updated document is returned
        );


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: `User ${banned ? "banned" : "unbanned"} successfully`, user });
    } catch (error) {
        console.error("Error banning user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get("/admin/campaigns", async (req, res) => {
    try {
        const currentTime = new Date();

        // Fetch campaigns and filter them based on remaining time
        const campaigns = await Campaign.find().populate('creator', 'name');

        const activeCampaigns = campaigns.filter(campaign => {
            const endTime = new Date(campaign.createdAt);
            endTime.setDate(endTime.getDate() + campaign.duration); // Adding days to createdAt

            return (endTime > currentTime); // Only return campaigns that have time left
        });

        res.status(200).json(activeCampaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get("/admin/stats", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCampaigns = await Campaign.countDocuments();
        const totalFunds = await Campaign.aggregate([
            { $group: { _id: null, total: { $sum: "$pledged" } } }
        ]);

        // Fetch recently created campaigns
        const recentCreatedCampaigns = await Campaign.find()
            .sort({ createdAt: -1 })
            .limit(5);

        // Fetch recently funded campaigns
        const recentFundedCampaigns = await Campaign.find({ pledged: { $gt: 0 } })
            .sort({ updatedAt: -1 })
            .limit(5);

        // Fetch recently joined users
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({ 
            totalUsers, 
            totalCampaigns, 
            totalFunds: totalFunds[0]?.total || 0, 
            recentCreatedCampaigns, 
            recentFundedCampaigns, 
            recentUsers 
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/admin/users", async (req, res) => {
    try {
        const users = await User.find(); // Get all users

        // Fetch campaigns for each user dynamically
        const usersWithCampaigns = await Promise.all(
            users.map(async (user) => {
                const campaigns = await Campaign.find({ creator: user._id }); // Get campaigns by user ID
                return { ...user.toObject(), campaigns }; // Merge campaigns with user object
            })
        );

        res.status(200).json(usersWithCampaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

