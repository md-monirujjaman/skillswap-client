import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useParams } from "react-router-dom";
import { Proposal } from "../../../types";

export default function ManageProposals() {
  const { taskId } = useParams();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await api.get(`/api/proposals/task/${taskId}`);
        setProposals(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, [taskId]);

  const handleAccept = async (proposalId: string) => {
    setProcessing(true);
    try {
      const res = await api.post("/api/payment/create-checkout-session", { proposalId });
      window.location.href = res.data.url; // Redirect to Stripe
    } catch (e: any) {
      alert(e.response?.data?.error || "Error accepting proposal");
      setProcessing(false);
    }
  };

  const handleReject = async (proposalId: string) => {
    if(!confirm("Reject this proposal?")) return;
    try {
      await api.post(`/api/proposals/${proposalId}/reject`);
      setProposals(prev => prev.map(p => p._id === proposalId ? { ...p, status: 'Rejected' } : p));
    } catch (e) {
      alert("Error.");
    }
  };

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
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Review Proposals</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Evaluate freelancer applications and hire the best fit.</p>
      </div>

      {proposals.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          No proposals received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map(p => (
            <div key={p._id} className="p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl bg-white dark:bg-[#0b101d]/60 relative overflow-hidden group hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_12px_35px_rgba(225,0,50,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.45)] transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 relative z-10">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    {p.freelancer_email.split('@')[0]} 
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] uppercase tracking-widest rounded-md text-slate-500 dark:text-neutral-400 font-bold hidden sm:inline-block">({p.freelancer_email})</span>
                  </h3>
                  <div className="text-sm text-slate-500 dark:text-neutral-400 mt-2 font-medium flex items-center gap-2">
                    Bid: <span className="font-black text-[#e10032] dark:text-[#ff4d6d]">${p.proposed_budget}</span> 
                    <span className="text-slate-300 dark:text-slate-700">|</span> 
                    Est: <span className="font-bold text-slate-700 dark:text-slate-300">{p.estimated_days} days</span>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border flex-shrink-0 ${
                  p.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                  p.status === 'Rejected' ? 'bg-slate-50 text-slate-500 border-slate-200/50 dark:bg-slate-900/40 dark:text-neutral-400 dark:border-slate-800/50' :
                  'bg-red-50 text-[#e10032] border-red-200/50 dark:bg-red-950/20 dark:text-[#ff4d6d] dark:border-red-900/30'
                }`}>
                  {p.status}
                </div>
              </div>
              
              <div className="mb-8 p-5 bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-sm text-slate-600 dark:text-neutral-300 whitespace-pre-wrap font-medium leading-relaxed relative z-10">
                "{p.cover_note}"
              </div>
              
              {p.status === 'Pending' && (
                <div className="flex flex-wrap gap-3 relative z-10">
                  <button onClick={() => handleAccept(p._id)} disabled={processing} className="flex-1 md:flex-none bg-gradient-to-r from-[#e10032] to-[#ff4d6d] text-white hover:from-[#c2002b] hover:to-[#e10032] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#e10032]/20 disabled:opacity-50 flex justify-center items-center gap-2">
                    {processing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Accept & Hire"}
                  </button>
                  <button onClick={() => handleReject(p._id)} disabled={processing} className="flex-1 md:flex-none bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-center">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
