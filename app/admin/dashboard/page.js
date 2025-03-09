'use client'

import { useEffect, useState } from "react";
import { Users, Package, DollarSign, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const router = useRouter()
    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            router.push("/admin/login");
        }
    }, []);


    useEffect(() => {
        fetch("http://82.29.153.135/admin/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl text-blue-500 font-bold my-14 text-center mb-6">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats?.totalUsers} icon={<Users size={28} />} color="bg-blue-500" />
                <StatCard title="Total Campaigns" value={stats?.totalCampaigns} icon={<Package size={28} />} color="bg-green-500" />
                <StatCard title="Total Funds Raised" value={`$${stats?.totalFunds}`} icon={<DollarSign size={28} />} color="bg-purple-500" />
                <StatCard title="Recently Funded" value={stats?.recentFundedCampaigns?.length || 0} icon={<TrendingUp size={28} />} color="bg-orange-500" />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <ActivityCard title="Recently Created Campaigns" data={stats?.recentCreatedCampaigns} dateType="createdAt" />
                <ActivityCard title="Recently Funded Campaigns" data={stats?.recentFundedCampaigns} dateType="updatedAt" />
                <ActivityCard title="Recently Joined Users" data={stats?.recentUsers} dateType="createdAt" isUser />

            </div>
        </div>
    );
}

// 📌 Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
    <div className={`p-5 rounded-2xl shadow-lg text-white flex items-center justify-between ${color} bg-opacity-90`}>
        <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-3xl font-bold mt-1">{value ?? "Loading..."}</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-xl">{icon}</div>
    </div>
);

// 📌 Activity Card Component (Handles both Created and Funded Campaigns)
const ActivityCard = ({ title, data, dateType }) => (
    <div className="p-5 bg-white rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <ul className="mt-3 space-y-3">
            {data?.length ? (
                data.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700">{item.name || item.title}</span>
                        <span className="text-sm text-gray-500">
                            {dateType === "updatedAt" ? `Funded on ${new Date(item.updatedAt).toLocaleDateString()}` :
                                `Created on ${new Date(item.createdAt).toLocaleDateString()}`}
                        </span>
                    </li>
                ))
            ) : (
                <li className="text-gray-500 text-center py-4">No data available</li>
            )}
        </ul>
    </div>
);
