import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {
  const links = [
    { path: "/dashboard/admin", label: "Overview" },
    { path: "/dashboard/admin/users", label: "Manage Users" },
    { path: "/dashboard/admin/tasks", label: "Manage Tasks" },
    { path: "/dashboard/admin/transactions", label: "Transactions" }
  ];

  return (
    <DashboardLayout roleLinks={links}>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/tasks" element={<ManageTasks />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </DashboardLayout>
  );
}

function AdminOverview() {
  const [stats, setStats] = useState({ totalUsers: 0, totalTasks: 0, activeTasks: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/admin/stats").then(res => {
      setStats(res.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading overview...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Admin Overview</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Platform statistics and activity at a glance.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 dark:from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 mb-3 relative z-10">Total Users</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white relative z-10">{stats.totalUsers}</div>
        </div>
        
        <div className="p-8 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 dark:from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 mb-3 relative z-10">Total Tasks</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white relative z-10">{stats.totalTasks}</div>
        </div>
        
        <div className="p-8 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 dark:from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 mb-3 relative z-10">Active Tasks</div>
          <div className="text-4xl font-black text-[#e10032] dark:text-[#ff4d6d] relative z-10">{stats.activeTasks}</div>
        </div>
        
        <div className="p-8 bg-slate-900 dark:bg-white rounded-3xl border border-slate-800 dark:border-slate-200 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 dark:from-black/5 to-transparent pointer-events-none" />
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 relative z-10">Total Revenue</div>
          <div className="text-4xl font-black text-white dark:text-slate-900 relative z-10">${stats.totalRevenue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    api.get("/api/admin/users").then(res => {
      setUsers(res.data);
      setLoading(false);
    }); 
  }, []);

  const toggleBlock = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/api/admin/users/${id}/block`, { isBlocked: !currentStatus });
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: !currentStatus } : u));
    } catch (e) { alert("Action failed"); }
  };

  const toggleVerify = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/api/admin/users/${id}/verify`, { isVerified: !currentStatus });
      setUsers(users.map(u => u._id === id ? { ...u, isVerified: !currentStatus } : u));
    } catch (e) { alert("Action failed"); }
  };

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading users...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Manage Users</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">View and manage all platform accounts.</p>
      </div>
      
      <div className="bg-white dark:bg-[#0b101d]/60 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-neutral-400 border-b border-slate-200/60 dark:border-slate-800/60">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Block Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Verified</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium">{u.email}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      u.isBlocked
                        ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                    }`}>
                      {u.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {u.role === 'Freelancer' && (
                      <button 
                        onClick={() => toggleVerify(u._id, u.isVerified)} 
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                          u.isVerified 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200/50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30' 
                            : 'bg-slate-100 text-slate-500 border border-slate-200/50 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {u.isVerified ? 'Verified' : 'Unverified'}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {u.role !== 'Admin' && (
                      <button 
                        onClick={() => toggleBlock(u._id, u.isBlocked)} 
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          u.isBlocked 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/40' 
                            : 'bg-red-50 text-[#e10032] border border-red-200/50 dark:bg-red-950/20 dark:text-[#ff4d6d] dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-950/40'
                        }`}
                      >
                        {u.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-neutral-400 text-sm font-medium">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ManageTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    api.get("/api/admin/tasks").then(res => {
      setTasks(res.data);
      setLoading(false);
    }); 
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm("Force delete task?")) return;
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (e) { alert("Failed"); }
  };

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading tasks...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Manage Tasks</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Review and moderate all tasks on the platform.</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          No tasks found.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(t => (
            <div key={t._id} className="p-6 md:p-8 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    t.status === 'Completed' ? 'text-emerald-500' :
                    t.status === 'Open' ? 'text-[#e10032] dark:text-[#ff4d6d]' :
                    t.status === 'In Progress' ? 'text-blue-500' :
                    'text-slate-500 dark:text-neutral-400'
                  }`}>
                    • {t.status}
                  </span>
                </div>
                <div className="font-extrabold text-xl text-slate-900 dark:text-white mb-2 leading-tight tracking-tight group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors">{t.title}</div>
                <div className="text-sm font-medium text-slate-500 dark:text-neutral-400">Client: <strong className="text-slate-700 dark:text-neutral-300">{t.client_email}</strong></div>
              </div>
              
              <button 
                onClick={() => handleDelete(t._id)} 
                className="relative z-10 flex-shrink-0 px-6 py-3 bg-red-50 text-[#e10032] border border-red-200/50 dark:bg-red-950/20 dark:text-[#ff4d6d] dark:border-red-900/30 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors w-full md:w-auto text-center"
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Transactions() {
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    api.get("/api/admin/transactions").then(res => {
      setTxs(res.data);
      setLoading(false);
    }); 
  }, []);

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading transactions...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Transactions History</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">View all platform payments and payouts.</p>
      </div>
      
      <div className="bg-white dark:bg-[#0b101d]/60 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-neutral-400 border-b border-slate-200/60 dark:border-slate-800/60">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Client Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Freelancer Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Payout Size</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {txs.map(t => (
                <tr key={t._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium">{t.client_email}</td>
                  <td className="px-6 py-5 text-sm font-medium">{t.freelancer_email}</td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 dark:text-white">${t.amount}</div>
                  </td>
                  <td className="px-6 py-5 text-sm">{new Date(t.paid_at).toLocaleDateString()}</td>
                  <td className="px-6 py-5 text-right">
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                      t.payment_status === 'paid' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200/50 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                    }`}>
                      {t.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
              
              {txs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-neutral-400 text-sm font-medium">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
