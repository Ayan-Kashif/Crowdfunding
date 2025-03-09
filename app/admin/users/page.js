// 'use client'

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Switch } from "@/components/ui/switch";
// import { usersData } from "@/data/users"; // Example data
// import { Search } from "lucide-react";

// export default function UserManagement() {
//   const [users, setUsers] = useState(usersData);
//   const [search, setSearch] = useState("");

//   const handleBanToggle = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, banned: !user.banned } : user
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-10">
//       <Card className="bg-white/10 backdrop-blur-md p-6 shadow-xl border border-white/20">
//         <CardContent>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-white">User Management</h2>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//               <Input
//                 type="text"
//                 placeholder="Search users..."
//                 className="pl-10 bg-white/20 text-white placeholder-gray-300 focus:ring-purple-500"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-white">Name</TableHead>
//                 <TableHead className="text-white">Email</TableHead>
//                 <TableHead className="text-white text-center">Status</TableHead>
//                 <TableHead className="text-white text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users
//                 .filter((user) =>
//                   user.name.toLowerCase().includes(search.toLowerCase())
//                 )
//                 .map((user) => (
//                   <TableRow key={user.id} className="hover:bg-white/10">
//                     <TableCell className="text-white">{user.name}</TableCell>
//                     <TableCell className="text-white">{user.email}</TableCell>
//                     <TableCell className="text-center">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           user.banned ? "bg-red-500 text-white" : "bg-green-500 text-white"
//                         }`}
//                       >
//                         {user.banned ? "Banned" : "Active"}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Switch
//                         checked={!user.banned}
//                         onCheckedChange={() => handleBanToggle(user.id)}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Eye, Ban, Calendar, Globe, Users, DollarSign } from "lucide-react";
import { CheckCircle, XCircle, Hourglass } from "lucide-react";



export default function UserManagement() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            router.push("/admin/login");
        } else {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/admin/users");
            const data = await res.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const toggleBan = async (id, isBanned) => {
        try {
            await fetch(`http://localhost:5000/admin/users/${id}/ban`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ banned: !isBanned }),
            });
            fetchUsers();
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="text-green-500" size={14} />;
            case "pending":
                return <Hourglass className="text-yellow-500" size={14} />;
            case "rejected":
                return <XCircle className="text-red-500" size={14} />;
            default:
                return <Hourglass className="text-gray-400" size={14} />; // Default to pending
        }
    };

    const openCampaigns = (user) => {
        setSelectedUser(user);
    };

    const closeCampaigns = () => {
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r  from-gray-900 via-purple-900 to-blue-900 p-10 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>

            <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full p-3 pl-10 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p className="text-center text-gray-300">Loading users...</p>
                ) : (
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="text-purple-400">
                                <th className="p-3 border-b border-white/20">Name</th>
                                <th className="p-3 border-b border-white/20">Email</th>
                                <th className="p-3 border-b border-white/20">Status</th>
                                <th className="p-3 border-b border-white/20">Campaigns</th>
                                <th className="p-3 border-b border-white/20">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .filter((user) =>
                                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                                    user.email.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((user) => (
                                    <tr key={user._id} className="border-b border-white/10">
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className={`p-3 font-bold ${user.banned ? "text-red-500" : "text-green-400"}`}>
                                            {user.banned ? "Banned" : "Active"}
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => openCampaigns(user)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-1 transition"
                                            >
                                                <Eye size={14} /> {user.campaigns.length} View
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => toggleBan(user._id, user.banned)}
                                                className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition ${user.banned ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}
                                            >
                                                {user.banned ? <CheckCircle size={14} /> : <Ban size={14} />} {user.banned ? "Unban" : "Ban"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">{selectedUser.name}'s Campaigns</h2>
                        <ul className="max-h-60 overflow-y-auto">
                            {selectedUser.campaigns.length > 0 ? (
                                selectedUser.campaigns.map((campaign) => (
                                    <li key={campaign._id} className="p-3 border-b border-gray-600">
                                        <p className="font-bold">{campaign.title}</p>
                                        <p className="text-gray-300 text-sm">{campaign.description}</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={14} /> {campaign.createdAt.slice(0, 10)}</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1"><DollarSign size={14} /> Goal: ${campaign.goal} | Backed: ${campaign.pledged}</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1"> {getStatusIcon(campaign.status)} Status:  {campaign.status}</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1"><Globe size={14} /> Country: {campaign.location}</p>
                                        {campaign.backers.length > 0 ? (
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <Users size={14} /> Backers: {campaign.backers.length}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <Users size={14} /> Backers: No backers
                                            </p>
                                        )}

                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-400">No campaigns created.</p>
                            )}

                        </ul>
                        <button
                            onClick={closeCampaigns}
                            className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
