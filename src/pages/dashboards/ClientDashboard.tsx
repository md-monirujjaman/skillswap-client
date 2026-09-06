import { Routes, Route, Navigate, Link } from "react-router-dom";
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
  const [tasks, setTasks] = useState<any[]>([]);
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
    api.get("/api/tasks/manage").then(res => {
      const payload = res.data?.data || res.data || [];
      const taskList = Array.isArray(payload) ? payload : payload.tasks;
      setTasks(Array.isArray(taskList) ? taskList.slice(0, 4) : []);
    }).catch(() => setTasks([]));
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
      <div className="mt-10 flex items-center justify-between gap-4">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Recent Tasks</h3>
        <Link to="/dashboard/client/post" className="rounded-xl bg-[#e10032] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#c7002a]">Post a New Task</Link>
      </div>
      {tasks.length === 0 ? (
        <div className="mt-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center dark:border-slate-800 dark:bg-[#0b101d]/20">
          <p className="font-bold text-slate-800 dark:text-white">No tasks yet</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">Create a task to start receiving proposals.</p>
          <Link to="/dashboard/client/post" className="mt-5 inline-flex rounded-xl bg-[#e10032] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#c7002a]">Post a Task</Link>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {tasks.map((task) => (
            <Link key={task._id} to={`/tasks/${task._id}`} className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white p-5 transition hover:border-[#e10032]/30 dark:border-slate-800/60 dark:bg-[#0b101d]/60">
              <div><p className="font-extrabold text-slate-900 dark:text-white">{task.title}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">{task.category || "General"} · {task.status}</p></div>
              <span className="font-black text-[#e10032] dark:text-[#ff4d6d]">${task.budget}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
