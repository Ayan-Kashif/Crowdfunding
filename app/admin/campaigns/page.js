'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FaCheckCircle, FaTimesCircle, FaTrash, FaGlobe, FaDollarSign, FaClock, FaUsers, FaMapMarkerAlt, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [campaigns, setCampaigns] = useState([]);
    const router=useRouter()
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [filters, setFilters] = useState({
        category: "",
        minGoal: "",
        maxGoal: "",
        minBackers: "",
        maxBackers: "",
        minDuration: "",
        maxDuration: "",
        status: "",
        createdAfter: "",
    });

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            router.push("/admin/login");
        } else {
            fetchCampaigns();
        }
    }, []);


    async function fetchCampaigns() {
        setLoading(true);
        try {
            const adminToken = localStorage.getItem("adminToken");
            const response = await fetch("http://82.29.153.135:5000/admin/campaigns", {
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCampaigns(data);
            setFilteredCampaigns(data);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            toast.error("Failed to load campaigns!");
        } finally {
            setLoading(false);
        }
    }

    const capitalize = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
    };

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };



    // Function to apply filters
    const applyFilters = () => {
        let filtered = campaigns.filter(campaign => {
            return (
                (!filters.category || campaign.category.toLowerCase().includes(filters.category.toLowerCase())) &&
                (!filters.status || campaign.status === filters.status) &&
                (!filters.minGoal || campaign.goal >= Number(filters.minGoal)) &&
                (!filters.maxGoal || campaign.goal <= Number(filters.maxGoal)) &&
                (!filters.minBackers || campaign.backers >= Number(filters.minBackers)) &&
                (!filters.maxBackers || campaign.backers <= Number(filters.maxBackers)) &&
                (!filters.minDuration || campaign.duration >= Number(filters.minDuration)) &&
                (!filters.maxDuration || campaign.duration <= Number(filters.maxDuration)) &&
                (!filters.createdAfter || new Date(campaign.createdAt) >= new Date(filters.createdAfter))
            );
        });
        setFilteredCampaigns(filtered);
    };

    // Function to reset filters
    const resetFilters = () => {
        setFilters({
            category: "",
            minGoal: "",
            maxGoal: "",
            minBackers: "",
            maxBackers: "",
            minDuration: "",
            maxDuration: "",
            status: "",
            createdAfter: "",
        });
        setFilteredCampaigns(campaigns);
    };







    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/approve`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error("Failed to approve campaign");

            toast.success("Campaign approved!");
            fetchCampaigns();
        } catch (error) {
            console.error("Error approving campaign:", error);
            toast.error("Approval failed!");
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/reject`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error("Failed to reject campaign");

            toast.info("Campaign rejected.");
            fetchCampaigns();
        } catch (error) {
            console.error("Error rejecting campaign:", error);
            toast.error("Rejection failed!");
        }
    };




    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-thin mt-20 text-blue-600  mb-6 text-center">Admin Dashboard</h1>

            {/* FILTERS SECTION */}
            <div className="bg-white p-5 text-gray-600  rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <input type="text" placeholder="Category" value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="p-2 border rounded" />

                    {/* Status Filter */}
                    <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="p-2 border rounded">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    {/* Goal Range */}
                    <input type="number" placeholder="Min Goal ($)" value={filters.minGoal}
                        onChange={(e) => setFilters({ ...filters, minGoal: e.target.value })}
                        className="p-2 border rounded" />
                    <input type="number" placeholder="Max Goal ($)" value={filters.maxGoal}
                        onChange={(e) => setFilters({ ...filters, maxGoal: e.target.value })}
                        className="p-2 border rounded" />

                    {/* Backers Range */}
                    <input type="number" placeholder="Min Backers" value={filters.minBackers}
                        onChange={(e) => setFilters({ ...filters, minBackers: e.target.value })}
                        className="p-2 border rounded" />
                    <input type="number" placeholder="Max Backers" value={filters.maxBackers}
                        onChange={(e) => setFilters({ ...filters, maxBackers: e.target.value })}
                        className="p-2 border rounded" />

                    {/* Duration Range */}
                    <input type="number" placeholder="Min Duration (days)" value={filters.minDuration}
                        onChange={(e) => setFilters({ ...filters, minDuration: e.target.value })}
                        className="p-2 border rounded" />
                    <input type="number" placeholder="Max Duration (days)" value={filters.maxDuration}
                        onChange={(e) => setFilters({ ...filters, maxDuration: e.target.value })}
                        className="p-2 border rounded" />

                    {/* Created After */}
                    <input type="date" value={filters.createdAfter}
                        onChange={(e) => setFilters({ ...filters, createdAfter: e.target.value })}
                        className="p-2 border rounded" />
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={applyFilters} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Apply Filters</button>
                    <button onClick={resetFilters} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Reset</button>
                </div>
            </div>

            <div className="p-6 bg-gray-100 min-h-screen">
               
                {loading ? (
                    <p className="text-gray-500 text-center">Loading campaigns...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCampaigns.map((campaign) => (
                            <div key={campaign._id} className="bg-white p-5 rounded-lg shadow-md">
                                <h2 className="text-xl  text-green-500 font-bold">{campaign.title}</h2>
                                <p className="text-gray-700 mt-2">
                                    {expanded[campaign._id] ? campaign.description : `${campaign.description.slice(0, 100)}...`}
                                    <button onClick={() => toggleExpand(campaign._id)} className="text-blue-500 text-xs ml-2">
                                        {expanded[campaign._id] ? "Show Less" : "Show More"}
                                    </button>
                                </p>
                                <div className="mt-3 text-sm text-gray-600 space-y-2">
                                    <p><FaDollarSign className="inline-block text-green-600" /> Goal: ${campaign.goal}</p>
                                    <p><FaLayerGroup className="inline-block text-blue-600" /> Category: {capitalize(campaign.category)}</p>
                                    <p><FaMapMarkerAlt className="inline-block text-red-600" /> Location: {campaign.location}</p>
                                    <p><FaClock className="inline-block text-purple-600" /> Duration: {campaign.duration} days</p>
                                    <p><FaCalendarAlt className="inline-block text-gray-600" /> Created: {new Date(campaign.createdAt).toLocaleDateString()}</p>
                                    {campaign.status === "approved" && (
                                        <>
                                           {campaign.backers > 0 ? (
                                            <p className="text-sm flex  items-center gap-1"><FaUsers className="inline-block text-yellow-600" size={14} /> Backers: {campaign.backers}</p>
                                        ) : (
                                            <p className="text-sm  flex   items-center gap-1"><FaUsers className="inline-block text-yellow-600" size={14} /> Backers: No backers</p>
                                        )
                                        }
                                         
                                            <p><FaGlobe className="inline-block text-teal-600" /> Backed Amount: ${campaign.pledged}</p>
                                            <p><FaCheckCircle className="inline-block text-green-600" /> Approved At: {new Date(campaign.approvedAt).toLocaleDateString()}</p>
                                        </>
                                    )}
                                    {campaign.status === "rejected" && (
                                        <p><FaTimesCircle className="inline-block text-red-600" /> Rejected At: {new Date(campaign.rejectedAt).toLocaleDateString()}</p>
                                    )}
                                  
                                </div>

                                <div className="mt-4 flex gap-2">
                                    {campaign.status === "pending" && (
                                        <>
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                                onClick={() => handleApprove(campaign._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                                                onClick={() => handleReject(campaign._id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {campaign.status === "approved" && (
                                        <button className="bg-green-300 text-green-800 px-4 py-2 rounded-md" disabled>
                                            Approved
                                        </button>
                                    )}

                                    {campaign.status === "rejected" && (
                                        <button className="bg-yellow-300 text-yellow-800 px-4 py-2 rounded-md" disabled>
                                            Rejected
                                        </button>
                                    )}

                                 
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

































