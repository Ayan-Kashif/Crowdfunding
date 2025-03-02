// 'use client'

// import React from "react";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// const ProjectPage = ({ params }) => {
    // const [project, setProject] = useState({})
    // // Example project data (Replace this with real data fetching)  
    // useEffect(() => {
    //     // Async function to fetch student data
    //     const id = params.id
    //     const fetchProject = async () => {

    //         try {
    //             // Destructure id from params
    //             if (!id) {
    //                 throw new Error("Project ID is missing.");
    //             }

    //             const response = await fetch("http://localhost:5000/project", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ projectID: id }),
    //             });


    //             // Check if the response is not OK
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch student data.");
    //             }

    //             const data = await response.json(); // Parse JSON data
    //             setProject(data); // Set student data

    //         } catch (err) {

    //         }
    //     };

    //     fetchProject(); // Call the fetch function

    // }, [params]); // Re-run the effect if params change


//     const calculateDaysLeft = (createdAt, duration) => {
//         const createdDate = new Date(createdAt); // Convert createdAt to Date
//         const endDate = new Date(createdDate);
//         endDate.setDate(createdDate.getDate() + duration); // Add duration to createdAt

//         const today = new Date(); // Get current date
//         const timeDiff = endDate - today; // Difference in milliseconds
//         const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Convert to days

//         return daysLeft; // Return remaining days
//     };

//     //Payment
//     const handlePayment = async (creatorId) => {
//         try {
//             const response = await fetch("http://localhost:5000/stripe/fund-project", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ creatorId }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 console.log("Payment Successful:", data.paymentIntent);
//             } else {
//                 console.error("Payment Failed:", data.error);
//             }
//         } catch (error) {
//             console.error("Error in Payment Request:", error);
//         }
//     };

    // return (
    //     <div className="bg-white pb-40">
    //         <ToastContainer />
    //         <div className="max-w-5xl  text-gray-700 pt-32  mx-auto p-6">
    //             {/* Title and Description */}
    //             <h1 className="text-3xl text-gray-700 text-center font-bold">{project.title}</h1>
    //             <p className="text-lg text-gray-600 mt-2">{project.description}</p>

    //             {/* Content Section */}
    //             <div className="flex  flex-col md:flex-row mt-6 gap-6">
    //                 {/* Left: Image */}
    //                 <div className="w-full md:w-2/3">
    //                     <img
    //                         src={`http://localhost:5000${project.image}`}
    //                         alt={project.title}
    //                         className="w-full max-h-[65vh] object-cover rounded-lg shadow-md"
    //                     />
    //                 </div>

    //                 {/* Right: Project Stats */}
    //                 <div className="w-full md:w-1/3 flex flex-col gap-4">
    //                     <div className="bg-white p-4 rounded-lg shadow-md">
    //                         <p className="text-2xl font-bold text-green-600">
    //                             {/* US$ {project.pledged.toLocaleString()} */}
    //                             US$ 80
    //                         </p>
    //                         <p className="text-sm text-[#656969]">
    //                             {console.log(project.goal)}
    //                             pledged of US$ {project.goal} goal
    //                         </p>
    //                     </div>

    //                     <div className="bg-white p-4 rounded-lg shadow-md">
    //                         <p className="text-2xl font-bold">{project.backers} 23</p>
    //                         <p className="text-sm text-[#656969]">Backers</p>
    //                     </div>

    //                     <div className="bg-white p-4 rounded-lg shadow-md">
    //                         <p className="text-2xl font-bold">{calculateDaysLeft(project.createdAt, project.duration)}</p>
    //                         <p className="text-sm text-[#656969]">Days to go</p>
    //                     </div>

    //                     {/* Back this project button */}
    //                     <button onClick={() => handlePayment(project?.creator)} className="bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition">
    //                         Back this project
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
// };

// export default ProjectPage;













// 'use client'

// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";

// // Load Stripe with your **LIVE PUBLISHABLE KEY** (Replace with your key)
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Qsp8UQ6aazoGitOiokqGt3jmerP6NnoyrVNXtYKbS3bOjyUGz6js02at3gzK7AwQp9Dl3l1cQSj2h1T3qf9oHpn00dD832Yif');

// const ProjectPage = ({ params }) => {
//     const [project, setProject] = useState({});
//     const [loading, setLoading] = useState(false);

 
//     useEffect(() => {
//         // Async function to fetch student data
//         const id = params.id
//         const fetchProject = async () => {

//             try {
//                 // Destructure id from params
//                 if (!id) {
//                     throw new Error("Project ID is missing.");
//                 }

//                 const response = await fetch("http://localhost:5000/project", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ projectID: id }),
//                 });


//                 // Check if the response is not OK
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch student data.");
//                 }

//                 const data = await response.json(); // Parse JSON data
//                 setProject(data); // Set student data

//             } catch (err) {

//             }
//         };

//         fetchProject(); // Call the fetch function

//     }, [params]); // Re-run the effect if params change



//     const calculateDaysLeft = (createdAt, duration) => {
//         const createdDate = new Date(createdAt);
//         const endDate = new Date(createdDate);
//         endDate.setDate(createdDate.getDate() + duration);

//         const today = new Date();
//         return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
//     };

//     // 🔹 **Real Stripe Payment Handling**
//     const handlePayment = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`http://localhost:5000/stripe/create-checkout-session`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ projectId: project._id, amount: 1000 }), // Amount in cents ($10.00)
//             });

//             const data = await response.json();
//             if (!response.ok) throw new Error(data.error);

//             // Redirect to Stripe Checkout
//             const stripe = await stripePromise;
//             await stripe.redirectToCheckout({ sessionId: data.sessionId });
//         } catch (error) {
//             toast.error("Payment Failed: " + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white pb-40">
//             <ToastContainer />
//             <div className="max-w-5xl  text-gray-700 pt-32  mx-auto p-6">
//                 {/* Title and Description */}
//                 <h1 className="text-3xl text-gray-700 text-center font-bold">{project.title}</h1>
//                 <p className="text-lg text-gray-600 mt-2">{project.description}</p>

//                 {/* Content Section */}
//                 <div className="flex  flex-col md:flex-row mt-6 gap-6">
//                     {/* Left: Image */}
//                     <div className="w-full md:w-2/3">
//                         <img
//                             src={`http://localhost:5000${project.image}`}
//                             alt={project.title}
//                             className="w-full max-h-[65vh] object-cover rounded-lg shadow-md"
//                         />
//                     </div>

//                     {/* Right: Project Stats */}
//                     <div className="w-full md:w-1/3 flex flex-col gap-4">
//                         <div className="bg-white p-4 rounded-lg shadow-md">
//                             <p className="text-2xl font-bold text-green-600">
//                                 {/* US$ {project.pledged.toLocaleString()} */}
//                                 US$ 80
//                             </p>
//                             <p className="text-sm text-[#656969]">
//                                 {console.log(project.goal)}
//                                 pledged of US$ {project.goal} goal
//                             </p>
//                         </div>

//                         <div className="bg-white p-4 rounded-lg shadow-md">
//                             <p className="text-2xl font-bold">{project.backers} 23</p>
//                             <p className="text-sm text-[#656969]">Backers</p>
//                         </div>

//                         <div className="bg-white p-4 rounded-lg shadow-md">
//                             <p className="text-2xl font-bold">{calculateDaysLeft(project.createdAt, project.duration)}</p>
//                             <p className="text-sm text-[#656969]">Days to go</p>
//                         </div>

//                         {/* Back this project button */}
//                         <button onClick={() => handlePayment(project?.creator)} className="bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition">
//                             Back this project
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectPage;






'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your **LIVE PUBLISHABLE KEY**
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Qsp8UQ6aazoGitOiokqGt3jmerP6NnoyrVNXtYKbS3bOjyUGz6js02at3gzK7AwQp9Dl3l1cQSj2h1T3qf9oHpn00dD832Yif');

const ProjectPage = ({ params }) => {
    const [project, setProject] = useState({});
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const router=useRouter()

const [funder, setFunder] = useState({})
    
    useEffect(() => {
        const token = localStorage.getItem("cfToken");
        const storedUser = localStorage.getItem("cfUser");
        if (storedUser) {
            setFunder(JSON.parse(storedUser));
        }
        if (!token) {
            toast.error("You must be logged in fund the project.");
            router.push("/login");
        }
    }, [router]);



    useEffect(() => {
        const id = params.id;
        const fetchProject = async () => {
            try {
                if (!id) throw new Error("Project ID is missing.");

                const response = await fetch("http://82.29.153.135:5000/project", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ projectID: id }),
                });

                if (!response.ok) throw new Error("Failed to fetch project data.");

                const data = await response.json();
                setProject(data);
            } catch (err) {
                toast.error("Error loading project.");
            }
        };

        fetchProject();
    }, [params]);

    const calculateDaysLeft = (createdAt, duration) => {
        const createdDate = new Date(createdAt);
        const endDate = new Date(createdDate);
        endDate.setDate(createdDate.getDate() + duration);

        const today = new Date();
        return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
    };

    const handlePayment = async () => {
        if (amount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://82.29.153.135:5000/stripe/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId: project._id, amount: amount * 100 ,userId:funder?.id}), // Convert to cents
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // Redirect to Stripe Checkout
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: data.sessionId });

        } catch (error) {
            toast.error("Payment Failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white pb-40">
            <ToastContainer />
            <div className="max-w-5xl text-gray-700 pt-32 mx-auto p-6">
                <h1 className="text-3xl text-gray-700 text-center font-bold">{project.title}</h1>
                <p className="text-lg text-gray-600 mt-2">{project.description}</p>

                <div className="flex flex-col md:flex-row mt-6 gap-6">
                    <div className="w-full md:w-2/3">
                        <img
                            src={`http://82.29.153.135:5000${project.image}`}
                            alt={project.title}
                            className="w-full max-h-[65vh] object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-2xl font-bold text-green-600">
                                US$ {project.pledged ? project.pledged.toLocaleString() : 0}
                            </p>
                            <p className="text-sm text-[#656969]">
                                pledged of US$ {project.goal} goal
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-2xl font-bold">{project.backers?.length || 0}</p>
                            <p className="text-sm text-[#656969]">Backers</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-2xl font-bold">{calculateDaysLeft(project.createdAt, project.duration)}</p>
                            <p className="text-sm text-[#656969]">Days to go</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <label className="block text-gray-700 font-bold mb-2">Enter Amount:</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="border p-2 w-full rounded-md"
                                min="1"
                            />
                        </div>

                        <button
                            onClick={handlePayment}
                            className="bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition w-full mt-4"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Back this project"}
                        </button>
                    </div>
                </div>
            </div>








         
        </div>



















    );
};

export default ProjectPage;
