// 'use client';

// import { useEffect, useState } from 'react';

// export default function Campaigns() {
//     const [campaigns, setCampaigns] = useState([]);

//     useEffect(() => {
//         async function fetchCampaigns() {
//             try {
//                 const res = await fetch('http://localhost:5000/campaigns'); // API Route to get all campaigns
//                 if (!res.ok) throw new Error('Failed to fetch');
//                 const data = await res.json();
//                 setCampaigns(data);
//             } catch (error) {
//                 console.error('Error fetching campaigns:', error);
//             }
//         }
//         fetchCampaigns();
//     }, []);

//     return (
//         <div className="container mx-auto p-6 min-h-screen bg-white py-40">
//             <h1 className="text-3xl font-bold mb-6">Explore Campaigns</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {campaigns.map((campaign) => (

//                     <div key={campaign._id} className="relative group  rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105  hover:h-[400px] hover:border-dotted hover:border hover:shadow-md hover:border-gray-500 hover:bg-white">

//                         {/* Project Image */}
//                         <img src={`http://localhost:5000${campaign.image}`} alt="Project Title" className="w-full h-40 object-cover" />

//                         {/* Project Details */}
//                         <div className="p-4">
//                             {/* Creator & Title */}
//                             <div className="flex items-center gap-3">
//                                 {/* Creator Initials */}
//                                 <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 font-semibold rounded-full">
//                                     {campaign?.creator?.name
//                                         ? campaign.creator.name
//                                             .split(" ")
//                                             .slice(0, 3)
//                                             .map(part => part.charAt(0).toUpperCase())
//                                             .join("")
//                                         : ""}
//                                 </div>

//                                 {/* Title */}
//                                 <h2 className="text-xl text-gray-800 hover:underline cursor-pointer">
//                                     {campaign.title}
//                                 </h2>
//                             </div>

//                             {/* Creator Name */}
//                             <p className="text-sm text-gray-500 mt-1">{campaign.creator?.name || "Unknown"}</p>

//                             {/* Time Remaining */}
//                             <div className="flex items-center text-gray-600 text-sm mt-2">
//                                 <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" />
//                                 </svg>
//                                 <span>5 days left</span>
//                             </div>

//                             {/* Description (Initially Hidden) */}
//                             <p className="text-gray-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                 {campaign.description}
//                             </p>
//                         </div>
//                     </div>


//                 ))}
//             </div>
//         </div>
//     );
// }





'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
export default function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        async function fetchCampaigns() {
            try {
                const res = await fetch('http://localhost:5000/campaigns'); // API Route to get all campaigns
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setCampaigns(data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        }
        fetchCampaigns();
    }, []);

    // Filter campaigns based on search term and selected category
    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || campaign.category === selectedCategory)
    );

    const calculateDaysLeft = (createdAt, duration) => {
        const createdDate = new Date(createdAt); // Convert createdAt to Date
        const endDate = new Date(createdDate);
        endDate.setDate(createdDate.getDate() + duration); // Add duration to createdAt

        const today = new Date(); // Get current date
        const timeDiff = endDate - today; // Difference in milliseconds
        const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Convert to days

        return daysLeft; // Return remaining days
    };

    return (
        <div className="container mx-auto p-6   min-h-screen bg-white py-40">


            {/* Search Bar */}
            <div className="flex justify-center items-center bg-white  text-gray-500 mb-6">
                {/* < FiSearch/> */}
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-1/2 p-3 border shadow-md  rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Category Filters */}
            <div className="flex justify-center space-x-6 mb-16">
                {['All', 'Technology', 'Education', 'Health', 'Art'].map((category) => (
                    <button
                        key={category}
                        className={`text-lg font-semibold text-gray-700 pb-1 transition-all ${selectedCategory === category ? 'border-b-2 border-blue-500 text-blue-600' : 'hover:text-blue-500'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                    <Link href={`/${campaign._id}`}>
                        <div key={campaign._id} className="relative group rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:h-[400px] hover:border-dotted hover:border hover:shadow-md hover:border-gray-500 hover:bg-white">

                            {/* Project Image */}
                            <img src={`http://localhost:5000${campaign.image}`} alt={campaign.title} className="w-full h-40 object-cover" />

                            {/* Project Details */}
                            <div className="p-4">
                                {/* Creator & Title */}
                                <div className="flex items-center gap-3">
                                    {/* Creator Initials */}
                                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 font-semibold rounded-full">
                                        {campaign?.creator?.name
                                            ? campaign.creator.name
                                                .split(" ")
                                                .slice(0, 3)
                                                .map(part => part.charAt(0).toUpperCase())
                                                .join("")
                                            : ""}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl text-gray-800 hover:underline cursor-pointer">
                                        {campaign.title}
                                    </h2>
                                </div>

                                {/* Creator Name */}
                                <p className="text-sm text-gray-500 mt-1">{campaign.creator?.name || "Unknown"}</p>

                                {/* Time Remaining */}
                                <div className="flex items-center text-gray-600 text-sm mt-2">
                                    <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-9-9 9 9 0 019 9z" />
                                    </svg>
                                    <span>{calculateDaysLeft(campaign.createdAt, campaign.duration)} days left</span>
                                </div>

                                {/* Description (Initially Hidden) */}
                                <p className="text-gray-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {campaign.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}

