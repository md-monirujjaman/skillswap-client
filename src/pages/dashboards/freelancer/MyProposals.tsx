import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function MyProposals() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/proposals/mine").then(res => {
      setProposals(res.data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading proposals...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">My Proposals</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Review your submitted applications and their current status.</p>
      </div>
      
      {proposals.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          You haven't submitted any proposals yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0b101d]/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 dark:bg-[#0c1222]/80 border-b border-slate-200/60 dark:border-slate-800/60">
                <tr>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Task Title</th>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Budget Bid</th>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Date Sent</th>
                  <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {proposals.map(p => (
                  <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-[#0f1629]/50 transition-colors">
                    <td className="px-6 py-5 font-extrabold text-slate-900 dark:text-white">{p.task_id?.title || "Deleted Task"}</td>
                    <td className="px-6 py-5 text-[#e10032] dark:text-[#ff4d6d] font-black">${p.proposed_budget}</td>
                    <td className="px-6 py-5 text-slate-500 dark:text-neutral-500 font-mono text-xs">{new Date(p.submitted_at).toLocaleDateString()}</td>
                    <td className="px-6 py-5 text-sm">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border inline-flex ${
                        p.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                        p.status === 'Rejected' ? 'bg-slate-50 text-slate-500 border-slate-200/50 dark:bg-slate-900/40 dark:text-neutral-400 dark:border-slate-800/50' :
                        'bg-red-50 text-[#e10032] border-red-200/50 dark:bg-red-950/20 dark:text-[#ff4d6d] dark:border-red-900/30'
                      }`}>
                        {p.status}
                      </span>
                    </td>
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
