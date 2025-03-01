'use client';
import { useEffect, useState } from "react";
import { Card } from '../components/Card';
import { CardContent } from "../components/CardContent";
import { Progress } from "../components/Progress";
import { Trash2, PlusCircle,ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Campaigns() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState(null);
    const [backers, setBackers] = useState([])
    const [isExpanded, setIsExpanded] = useState(false);
    // Fetch user from localStorage
    useEffect(() => {
        const token = localStorage.getItem("cfToken");
        const storedCreator = localStorage.getItem("cfUser");

        if (storedCreator) {
            setCreator(JSON.parse(storedCreator));  // ✅ Now properly setting creator
        }

        if (!token) {
            toast.error("You must be logged in to create a campaign.");
            router.push("/login");
        }
    }, [router]);

    // Fetch campaigns after creator is set
    useEffect(() => {
        if (!creator || !creator.id) return;

        async function fetchCampaigns() {
            try {
                console.log("Fetching campaigns for:", creator.id);
                const response = await fetch("http://82.29.153.135:5000/myCampaigns", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: creator.id }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCampaigns(data);

            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCampaigns();
    }, [creator]); // ✅ Runs when creator updates

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this campaign?")) return;

        try {
            const response = await fetch(`http://localhost:5000/deleteCampaign/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id));
        } catch (error) {
            console.error("Error deleting campaign:", error);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading campaigns...</p>;

    return (
        <div className="container mt-20 bg-white mx-auto p-6">
            <h1 className="text-2xl text-gray-600 text-center font-bold mb-6">My Campaigns</h1>
            {campaigns?.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500">No campaigns found.</p>
                    <button className="mt-4 flex items-center justify-center gap-2">
                        <PlusCircle size={16} /> Create Campaign
                    </button>
                </div>
            ) : (
                <div className="grid     mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns?.map((campaign) => {
                        const pledgedPercentage = ((campaign.pledged / campaign.goal) * 100).toFixed(2);
                        return (
                            <Card key={campaign._id} className="p-4 shadow-lg">
                            <CardContent>
                              <h2 className="text-xl text-green-700 font-semibold">{campaign.title}</h2>
                              <p className="text-gray-600 mt-2">{campaign.description}</p>
                              <p className="mt-2 text-[#656969] font-bold">Goal: ${campaign.goal}</p>
                              <p className="mt-1 text-[#656969] font-bold">Pledged: ${campaign.pledged}</p>
                              <p className="mt-1 text-sm text-gray-500">Backers: {campaign.backers.length}</p>
                      
                              {/* Toggle button for showing backers */}
                              <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-2 text-blue-500 mt-2"
                              >
                                {isExpanded ? "Hide Backers" : "Show Backers"}
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                      
                              {/* Backers List with Animation */}
                              {isExpanded && (
                                <ul className="mt-2 pl-4 text-gray-700 transition-all duration-300">
                                  {campaign.backers.map((backer) => (
                                    <li key={backer._id} className="border-b py-2">
                                      {backer.name} ({backer.email})
                                    </li>
                                  ))}
                                </ul>
                              )}
                      
                              <Progress value={pledgedPercentage} className="mt-4" />
                              <p className="mt-2 text-[#656969] text-sm">{pledgedPercentage}% of goal reached</p>
                      
                              {/* Delete Button */}
                              <button
                                className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded"
                                onClick={() => handleDelete(campaign._id)}
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                            </CardContent>
                          </Card>
                      
                        );
                    })}
                </div>
            )}
        </div>
    );
}
