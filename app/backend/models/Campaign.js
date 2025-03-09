const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
    min: 1,
  },
  pledged: {
    type: Number,
    
    default:0
  },
  raised: {
    type: Number,
    default: 0, // Initially, no funds raised
  },
  duration: {
    type: Number,
    required: true, // In days
  },
  endDate: {
    type: Date, // Auto-calculated when campaign is created
  },
  image: {
    type: String, // URL of the campaign image
    required: true,
  },
  location: {
    type: String, // URL of the campaign image
    required: true,
  },
   category: {
    type: String,
    enum: ["technology",'gaming','green tech' ,'education','consumer products' ,'healthcare' ,"other"], // Categorization for filtering
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who created the campaign
    required: true,
  },

  backers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

// Auto-calculate the end date based on duration
CampaignSchema.pre("save", function (next) {
  if (this.isNew) {
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + this.duration);
  }
  next();
});

module.exports = mongoose.model("Campaign", CampaignSchema);
