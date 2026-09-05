import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

import MyProposals from "./freelancer/MyProposals";
import ActiveProjects from "./freelancer/ActiveProjects";
import BookmarkedTasks from "./freelancer/BookmarkedTasks";
import EditProfile from "./freelancer/EditProfile";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function FreelancerDashboard() {
  const links = [
    { path: "/dashboard/freelancer", label: "Earnings" },
    { path: "/tasks", label: "Browse Tasks" },
    { path: "/dashboard/freelancer/proposals", label: "My Proposals" },
    { path: "/dashboard/freelancer/projects", label: "Active Projects" },
    { path: "/dashboard/freelancer/bookmarks", label: "Saved Jobs" },
    { path: "/dashboard/freelancer/profile", label: "Edit Profile" }
  ];

  return (
    <DashboardLayout roleLinks={links}>
      <Routes>
        <Route path="/" element={<FreelancerOverview />} />
        <Route path="/proposals" element={<MyProposals />} />
        <Route path="/projects" element={<ActiveProjects />} />
        <Route path="/bookmarks" element={<BookmarkedTasks />} />
        <Route path="/profile" element={<EditProfile />} />
      </Routes>
    </DashboardLayout>
  );
}

function FreelancerOverview() {
  const [stats, setStats] = useState({ totalProposals: 0, pendingProposals: 0, acceptedProposals: 0, totalEarnings: 0 });
  const [earnings, setEarnings] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/dashboard/freelancer").then(res => setStats(res.data.stats)).catch(console.error);
    api.get("/api/dashboard/freelancer/earnings").then(res => setEarnings(res.data.earnings)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Earnings & Overview</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Track your earnings, proposals, and freelance performance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-6 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 text-center relative overflow-hidden group hover:border-[#e10032]/30 transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-2">Total Proposals</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalProposals}</div>
        </div>
        <div className="p-6 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 text-center relative overflow-hidden group hover:border-[#e10032]/30 transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-2">Pending</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">{stats.pendingProposals}</div>
        </div>
        <div className="p-6 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 text-center relative overflow-hidden group hover:border-[#e10032]/30 transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-2">Hired</div>
          <div className="text-4xl font-black text-[#e10032] dark:text-[#ff4d6d]">{stats.acceptedProposals}</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-[#e10032] to-[#ff4d6d] text-white rounded-3xl shadow-[0_10px_30px_rgba(225,0,50,0.3)] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-white/80 font-bold uppercase tracking-widest mb-2">Total Earnings</div>
          <div className="text-4xl font-black tracking-tight">${stats.totalEarnings}</div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Earnings History</h2>
      </div>
      
      {earnings.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          No earnings yet. Complete jobs to start earning.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0b101d]/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-[#0c1222]/80 border-b border-slate-200/60 dark:border-slate-800/60">
                <tr>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Task Title</th>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Client</th>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Amount Made</th>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Date Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {earnings.map((payment: any) => (
                  <tr key={payment._id} className="hover:bg-slate-50/50 dark:hover:bg-[#0f1629]/50 transition-colors">
                    <td className="px-6 py-5 font-extrabold text-slate-900 dark:text-white">{payment.task_title}</td>
                    <td className="px-6 py-5 font-medium text-slate-600 dark:text-neutral-300">{payment.client_name}</td>
                    <td className="px-6 py-5 text-[#e10032] dark:text-[#ff4d6d] font-black">${payment.amount}</td>
                    <td className="px-6 py-5 text-slate-500 dark:text-neutral-500 font-mono text-xs">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
