// 'use client';
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Link from "next/link";

// export default function CreateCampaign() {
//     const [step, setStep] = useState(1);
//     const [creator, setCreator] = useState({})

//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("cfToken");
//         const user = JSON.stringify(localStorage.getItem('cfUser'))
//         console.log(user)
//         setCreator(user)
//         if (!token) {
//             toast.error("You must be logged in to create a campaign.");
//             router.push("/login");
//         }
//     }, [router]);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         creator: creator.name,
//         category: "",
//         location: "",
//         image: null,
//         goal: "",
//         duration: "",
//     });

//     const nextStep = () => setStep((prev) => prev + 1);
//     const prevStep = () => setStep((prev) => prev - 1);

//     const handleChange = (e) => {
//         if (e.target.name === "image") {
//             setFormData({ ...formData, image: e.target.files[0] });
//         } else {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     const handleSubmit = async () => {
//         setIsLoading(true);
//         const token = localStorage.getItem("cfToken");

//         if (!token) {
//             toast.error("You must be logged in to create a campaign.");
//             setIsLoading(false);
//             return;
//         }

//         const formDataToSend = new FormData();

//         // ✅ Append each field explicitly
//         if (formData.title) formDataToSend.append("title", formData.title);
//         if (formData.description) formDataToSend.append("description", formData.description);
//         if (formData.category) formDataToSend.append("category", formData.category);
//         if (formData.location) formDataToSend.append("location", formData.location);
//         if (formData.goal) formDataToSend.append("goal", formData.goal);
//         if (formData.duration) formDataToSend.append("duration", formData.duration);

//         // ✅ Ensure image file is appended correctly
//         if (formData.image) {
//             formDataToSend.append("image", formData.image);
//         }

//         console.log("🚀 Form Data to Send:", [...formDataToSend.entries()]); // Debugging

//         try {
//             const response = await fetch("http://localhost:5000/campaign", {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: formDataToSend, // ✅ Sending FormData without setting Content-Type (it is set automatically)
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || "Something went wrong");
//             }

//             toast.success("Campaign created successfully!");
//             router.push("/dashboard");
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex text-gray-700 flex-col items-center justify-center bg-gray-100 p-6">
//             <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
//                 {step === 1 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Enter Campaign Title</h2>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             placeholder="Campaign Title"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <button onClick={nextStep} className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
//                             Next
//                         </button>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Enter Campaign Description</h2>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             placeholder="Campaign Description"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         ></textarea>
//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
//                         </div>
//                     </div>
//                 )}

//                 {step === 3 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Upload Image</h2>
//                         <input
//                             type="file"
//                             name="image"
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <h2 className="text-2xl font-bold text-center mt-6 mb-4">Enter Location</h2>
//                         <input
//                             type="text"
//                             name="location"
//                             value={formData.location}
//                             onChange={handleChange}
//                             placeholder="Campaign Location"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
//                         </div>
//                     </div>
//                 )}

//                 {step === 4 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Enter Goal Amount (USD)</h2>
//                         <input
//                             type="number"
//                             name="goal"
//                             value={formData.goal}
//                             onChange={handleChange}
//                             placeholder="Goal Amount in USD"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <h2 className="text-2xl font-bold text-center mt-6 mb-4">Enter Duration (Days)</h2>
//                         <input
//                             type="number"
//                             name="duration"
//                             value={formData.duration}
//                             onChange={handleChange}
//                             placeholder="Number of Days"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={isLoading}
//                                 className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
//                             >
//                                 {isLoading ? "Submitting..." : "Submit Campaign"}
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }





// 'use client';
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Link from "next/link";

// export default function CreateCampaign() {
//     const [step, setStep] = useState(1);
//     const [creator, setCreator] = useState(null);
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("cfToken");
//         const storedUser = localStorage.getItem("cfUser");
//         if (storedUser) {
//             setCreator(JSON.parse(storedUser)); // ✅ Correctly parsing stored user object
//             console.log(JSON.parse(storedUser).id)
//         }
//         if (!token) {
//             toast.error("You must be logged in to create a campaign.");
//             router.push("/login");
//         }
//     }, [router]);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         creator: creator?.id || "", // ✅ Ensure creator is correctly assigned
//         category: "",
//         location: "",
//         image: null,
//         goal: "",
//         duration: "",
//     });

//     useEffect(() => {
//         if (creator) {
//             setFormData((prev) => ({ ...prev, creator: creator.id }));
//         }
//     }, [creator]);

//     const nextStep = () => setStep((prev) => prev + 1);
//     const prevStep = () => setStep((prev) => prev - 1);

//     const handleChange = (e) => {
//         if (e.target.name === "image") {
//             setFormData({ ...formData, image: e.target.files[0] });
//         } else {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

// const handleSubmit = async () => {
//     setIsLoading(true);
//     const token = localStorage.getItem("cfToken");

//     if (!token) {
//         toast.error("You must be logged in to create a campaign.");
//         setIsLoading(false);
//         return;
//     }

//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//         if (value) formDataToSend.append(key, value);
//     });

//     try {
//         const response = await fetch("http://localhost:5000/campaign", {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             body: formDataToSend,
//         });

//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error || "Something went wrong");

//         toast.success("Campaign created successfully!");
//         router.push("/dashboard");
//     } catch (error) {
//         toast.error(error.message);
//     } finally {
//         setIsLoading(false);
//     }
// };

//     return (
//         <div className="min-h-screen flex text-gray-700 flex-col items-center justify-center bg-gray-100 p-6">
//             <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
//                 {step === 1 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Enter Campaign Title</h2>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             placeholder="Campaign Title"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <button onClick={nextStep} className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
//                             Next
//                         </button>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Select Category</h2>
//                         <select
//                             name="category"
//                             value={formData.category}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         >
//                             <option value="">Choose a category</option>
//                             <option value="education">Education</option>
//                             <option value="health">Health</option>
//                             <option value="environment">Environment</option>
//                             <option value="disaster">Disaster Relief</option>
//                             <option value="community">Community Support</option>
//                         </select>
//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
//                         </div>
//                     </div>
//                 )}

//                 {step === 3 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Enter Campaign Description</h2>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             placeholder="Campaign Description"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         ></textarea>
//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
//                         </div>
//                     </div>
//                 )}

// {step === 4 && (
//     <div>
//         <h2 className="text-2xl font-bold text-center mb-4">Upload Image</h2>
//         <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//         <h2 className="text-2xl font-bold text-center mt-6 mb-4">Enter Location</h2>
//         <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Campaign Location"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//         <div className="flex justify-between mt-4">
//             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//             <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
//         </div>
//     </div>
// )}

//                 {step === 5 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mt-6 mb-4">Enter Duration (Days)</h2>
//                         <input
//                             type="number"
//                             name="duration"
//                             value={formData.duration}
//                             onChange={handleChange}
//                             placeholder="Number of Days"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />

//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
//                         </div>
//                     </div>


//                 )}
//                 {step === 6 && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-center mb-4">Enter Goal Amount (USD)</h2>
//                         <input
//                             type="number"
//                             name="goal"
//                             value={formData.goal}
//                             onChange={handleChange}
//                             placeholder="Goal Amount in USD"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <div className="flex justify-between mt-4">
//                             <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
//                             <button onClick={handleSubmit} disabled={isLoading} className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
//                                 {isLoading ? "Submitting..." : "Submit Campaign"}
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { FaHeading, FaListAlt, FaUpload, FaMapMarkerAlt, FaClock, FaDollarSign, FaImage } from "react-icons/fa";
import Link from "next/link";

export default function CreateCampaign() {
    const [step, setStep] = useState(1);
    const [creator, setCreator] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [payLoading, setPayLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("cfToken");
        const storedUser = localStorage.getItem("cfUser");
        if (storedUser) {
            setCreator(JSON.parse(storedUser));
        }
        if (!token) {
            toast.error("You must be logged in to create a campaign.");
            router.push("/login");
        }
    }, [router]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        creator: "",
        category: "",
        location: "",
        image: null,
        goal: "",
        duration: ""
    });

    useEffect(() => {
        if (creator) {
            setFormData((prev) => ({ ...prev, creator: creator.id }));
        }
    }, [creator]);


    const handleSubmit = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("cfToken");

        if (!token) {
            toast.error("You must be logged in to create a campaign.");
            setIsLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) formDataToSend.append(key, value);
        });

        try {
            const response = await fetch("http://82.29.153.135:5000/campaign", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Something went wrong");

            toast.success("Campaign created successfully!");
            router.push("/dashboard");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }

        enablePayments()
    };


    const nextStep = () => {
        if (!isStepValid()) {
            console.log('Invalid')
            toast.error("Please fill in the required fields correctly.");
            return;
        }
        setStep((prev) => prev + 1);
        setProgress((prev) => prev + 12.5);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
        setProgress((prev) => prev - 12.5);
    };

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

    };

    const isStepValid = () => {
        console.log("Validating step:", step);
        console.log("Current formData:", formData);
        if (step === 1 && formData.title.trim().length < 3) { return false; }
        if (step === 2 && formData.category === "") { return false; }
        if (step === 3 && formData.description.trim().length < 25) { return false; }
        if (step === 4 && !formData.image) { return false; }
        if (step === 5 && formData.location === "") { return false; }
        if (step === 6 && formData.duration === "") { return false; }
        if (step === 7 && formData.goal === "") { return false; }
        return true;
    };
    console.log(creator)


    const enablePayments = async () => {
        setPayLoading(true);
        console.log(creator)
        const res = await fetch("http://localhost:5000/stripe/create-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: creator?.email, creatorId: creator?.id }),
        });

      

        const data = await res.json();
        if (data.url) {
            window.location.href = data.url; // Redirect to Stripe onboarding
        }

        setPayLoading(false);
    };


    return (
        <>
            <ToastContainer />
            <div className="min-h-screen transition-all duration-500 flex text-gray-700 flex-col items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 relative border-4 border-blue-500" style={{ borderImageSource: `linear-gradient(to right, #3b82f6 ${progress}%, #d1d5db ${progress}%)`, borderImageSlice: 1 }}>
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Enter Campaign Title</h2>
                            <div className="flex items-center border p-3 rounded-lg">
                                <FaHeading className="mr-2 text-blue-500" />
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Campaign Title"
                                    className="w-full outline-none"
                                />
                            </div>
                            <button onClick={nextStep} className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                                Next
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Select Category</h2>
                            <div className="flex items-center border p-3 rounded-lg">
                                <FaListAlt className="mr-2 text-blue-500" />
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full  outline-none"
                                >
                                    <option classname='' value="">Choose a category</option>
                                    <option value="education">Technology</option>
                                    <option value="education">Education</option>
                                    <option value="health">Health</option>
                                    <option value="environment">Environment</option>
                                    <option value="disaster">Disaster Relief</option>
                                    <option value="community">Community Support</option>
                                </select>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
                            </div>
                        </div>
                    )}



                    {step === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Enter Campaign Description</h2>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Campaign Description"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Upload Image</h2>
                            <label className="flex items-center border p-3 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
                                <FaUpload className="mr-2 text-blue-500" />
                                <span className="text-gray-700">Choose File</span>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>


                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
                            </div>
                        </div>
                    )}




                    {step === 5 && (
                        <div>

                            <h2 className="text-2xl font-bold text-center mt-6 mb-4">Enter Location</h2>
                            <div className="flex items-center border p-3 rounded-lg">
                                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Campaign Location"
                                    className="w-full p-3 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
                            </div>
                        </div>

                    )
                    }

                    {step === 6 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mt-6 mb-4">Enter Duration (Days)</h2>
                            <div className="flex items-center border p-3 rounded-lg">
                                <FaListAlt className="mr-2 text-blue-500" />
                                <select
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full  outline-none"
                                >
                                    <option classname='' value="">Choose duration</option>
                                    <option value="1">1 day</option>
                                    <option value="2">2 days</option>
                                    <option value="3">3 days</option>
                                    <option value="7">Week</option>
                                    <option value="30">Month</option>

                                </select>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
                            </div>
                        </div>


                    )}
                    {step === 7 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Enter Goal Amount (USD)</h2>
                            <div className="flex items-center border p-3 rounded-lg">
                                <FaDollarSign className="mr-2 text-blue-500" />
                                <input
                                    type="number"
                                    name="goal"
                                    value={formData.goal}
                                    onChange={handleChange}
                                    placeholder="Goal Amount in USD"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Next</button>
                            </div>
                        </div>
                    )}


                    {step === 8 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Enanble Payments</h2>
                            {/* <button onClick={enablePayments} disabled={payLoading} className="bg-blue-500 text-white px-4 py-2">
                                {payLoading ? "Redirecting..." : "Enable Payments"}
                            </button> */}

                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Back</button>
                                <button onClick={handleSubmit} disabled={isLoading} className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                                    {isLoading ? "Submitting..." : "Submit Campaign"}
                                </button>
                            </div>
                        </div>
                    )

                    }
                </div>
            </div>
        </>
    );
}
