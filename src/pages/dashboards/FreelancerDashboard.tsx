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
  const [recentProposals, setRecentProposals] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/dashboard/freelancer").then(res => setStats(res.data.stats)).catch(console.error);
    api.get("/api/dashboard/freelancer/earnings").then(res => setEarnings(res.data.earnings)).catch(console.error);
    api.get("/api/proposals/mine?freelancerEmail=mine").then(res => setRecentProposals(Array.isArray(res.data) ? res.data.slice(0, 4) : [])).catch(() => setRecentProposals([]));
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

      <div className="mb-6 mt-10 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Recent Proposals</h2>
        <a href="/dashboard/freelancer/proposals" className="text-xs font-bold uppercase tracking-wider text-[#e10032] hover:text-[#c7002a] dark:text-[#ff4d6d]">View all</a>
      </div>
      {recentProposals.length === 0 ? (
        <div className="mb-10 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-14 text-center text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-[#0b101d]/20 dark:text-neutral-400">No proposals yet. Browse tasks to find your next project.</div>
      ) : (
        <div className="mb-10 space-y-3">
          {recentProposals.map((proposal) => <div key={proposal._id} className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white p-5 dark:border-slate-800/60 dark:bg-[#0b101d]/60"><div><p className="font-extrabold text-slate-900 dark:text-white">{proposal.task_id?.title || "Task proposal"}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Bid ${proposal.proposed_budget}</p></div><span className="rounded-lg bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e10032] dark:bg-red-950/20 dark:text-[#ff4d6d]">{proposal.status}</span></div>)}
        </div>
      )}

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

      {earnings.length > 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-[#0b101d]/60">
          <div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Earnings Overview</h2><p className="mt-1 text-xs font-medium text-slate-500 dark:text-neutral-400">Your latest completed projects.</p></div><span className="text-xs font-bold uppercase tracking-wider text-[#e10032] dark:text-[#ff4d6d]">${stats.totalEarnings}</span></div>
          <div className="flex h-36 items-end gap-3">
            {earnings.slice(-8).map((payment: any, index: number) => {
              const amount = Number(payment.amount) || 0;
              const maximum = Math.max(...earnings.slice(-8).map((item: any) => Number(item.amount) || 0), 1);
              return <div key={payment._id || index} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] font-bold text-slate-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-neutral-400">${amount}</span><div className="w-full rounded-t-lg bg-gradient-to-t from-[#e10032] to-[#ff4d6d] transition-opacity group-hover:opacity-80" style={{ height: `${Math.max((amount / maximum) * 100, 8)}%` }} /><span className="max-w-full truncate text-[10px] font-bold text-slate-400 dark:text-neutral-500">{new Date(payment.createdAt).toLocaleDateString(undefined, { month: "short" })}</span></div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
