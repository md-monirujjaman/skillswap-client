import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

// Sub-pages (We will stub these first, and add data fetching)
import PostTask from "./client/PostTask";
import MyTasks from "./client/MyTasks";
import ManageProposals from "./client/ManageProposals";
import ClientProposals from "./client/ClientProposals";
import PaymentHistory from "./client/PaymentHistory";

export default function ClientDashboard() {
  const links = [
    { path: "/dashboard/client", label: "Overview" },
    { path: "/dashboard/client/post", label: "Post a Task" },
    { path: "/dashboard/client/tasks", label: "My Tasks" },
    { path: "/dashboard/client/proposals", label: "Proposals" },
    { path: "/dashboard/client/payments", label: "Payment History" }
  ];

  return (
    <DashboardLayout roleLinks={links}>
      <Routes>
        <Route path="/" element={<ClientOverview />} />
        <Route path="/post" element={<PostTask />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/proposals" element={<ClientProposals />} />
        <Route path="/payments" element={<PaymentHistory />} />
        <Route path="/tasks/:taskId/proposals" element={<ManageProposals />} />
      </Routes>
    </DashboardLayout>
  );
}

// Inline Overview Component
import { useEffect, useState } from "react";
import api from "@/lib/api";

function ClientOverview() {
  const [stats, setStats] = useState({ totalTasks: 0, openTasks: 0, inProgressTasks: 0, totalSpent: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/dashboard/client").then(res => {
      const payload = res.data?.data || res.data || {};
      const nextStats = payload.stats || payload;
      setStats({
        totalTasks: Number(nextStats.totalTasks) || 0,
        openTasks: Number(nextStats.openTasks) || 0,
        inProgressTasks: Number(nextStats.inProgressTasks) || 0,
        totalSpent: Number(nextStats.totalSpent) || 0,
      });
    }).catch((requestError) => {
      console.error(requestError);
      setError("Dashboard statistics could not be loaded right now.");
    });
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Client Overview</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Monitor your tasks, spending, and project activities.</p>
      </div>
      {error && <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 text-center relative overflow-hidden group hover:border-[#e10032]/30 transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-2">Total Tasks</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalTasks}</div>
        </div>
        <div className="p-6 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 text-center relative overflow-hidden group hover:border-[#e10032]/30 transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-2">Open Tasks</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">{stats.openTasks}</div>
        </div>
        <div className="p-6 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 text-center relative overflow-hidden group hover:border-[#e10032]/30 transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-2">In Progress</div>
          <div className="text-4xl font-black text-[#e10032] dark:text-[#ff4d6d]">{stats.inProgressTasks}</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-[#e10032] to-[#ff4d6d] text-white rounded-3xl shadow-[0_10px_30px_rgba(225,0,50,0.3)] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] text-white/80 font-bold uppercase tracking-widest mb-2">Total Spent</div>
          <div className="text-4xl font-black tracking-tight">${stats.totalSpent}</div>
        </div>
      </div>
    </div>
  );
}
