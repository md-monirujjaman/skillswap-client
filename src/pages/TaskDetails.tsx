import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Task } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { Bookmark, Clock, DollarSign, User } from "lucide-react";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Proposal State
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [proposalFlash, setProposalFlash] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (e: any) {
        setError(e.response?.data?.error || "Task not found");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();

    if (user?.role === 'Freelancer') {
      api.get('/api/users/bookmarks').then(res => {
         const bookmarks = res.data;
         if (bookmarks.some((t: any) => t._id === id || t === id)) {
           setIsBookmarked(true);
         }
      }).catch(console.error);
    }
  }, [id, user]);

  const handleBookmark = async () => {
    try {
      const res = await api.post(`/api/users/bookmark/${id}`);
      setIsBookmarked(res.data.bookmarked);
    } catch (e) {
      alert("Failed to bookmark task");
    }
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    
    setSubmitting(true);
    setProposalFlash("");

    try {
      await api.post("/api/proposals", {
        task_id: id,
        proposed_budget: Number(budget),
        estimated_days: Number(days),
        cover_note: note
      });
      setProposalFlash("Proposal submitted successfully!");
      setBudget(""); setDays(""); setNote("");
    } catch (e: any) {
      setProposalFlash(e.response?.data?.error || "Failed. You might have already applied.");
    } finally {
       setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="py-32 text-center flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center w-12 h-12">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading task details...</p>
    </div>
  );
  if (error || !task) return <div className="py-20 text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8">
      {/* Task Info Sidebar */}
      <div className="flex-1">
        <div className="bg-white dark:bg-[#0b101d]/60 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-200/60 dark:border-slate-800/60 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#e10032]/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-red-50 dark:bg-red-950/20 text-[10px] font-bold uppercase tracking-widest rounded-full text-[#e10032] dark:text-[#ff4d6d] border border-red-100/20 dark:border-red-900/20">
                {task.category}
              </span>
              <span className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full border ${
                task.status === 'Open' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                task.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30' :
                'bg-slate-50 text-slate-500 border-slate-200/50 dark:bg-slate-900/40 dark:text-neutral-400 dark:border-slate-800/50'
              }`}>
                {task.status}
              </span>
            </div>
            {user?.role === 'Freelancer' && (
              <button 
                onClick={handleBookmark} 
                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${isBookmarked ? 'text-[#e10032] dark:text-[#ff4d6d] bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 shadow-[0_4px_12px_rgba(225,0,50,0.15)]' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800'}`}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark Task"}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            )}
          </div>

          <h1 className="text-3xl md:text-4.5xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white leading-tight relative z-10">{task.title}</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 p-6 md:p-8 bg-slate-50/50 dark:bg-black/20 rounded-3xl border border-slate-100 dark:border-slate-800/50 relative z-10">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-3 text-[#e10032] dark:text-[#ff4d6d]">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">Budget</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">${task.budget}</p>
            </div>
            
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pl-6 sm:border-l border-slate-200 dark:border-slate-800">
               <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3 text-slate-500 dark:text-neutral-400">
                 <Clock className="w-5 h-5" />
               </div>
               <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">Deadline</p>
               <p className="text-lg font-bold text-slate-900 dark:text-white">{new Date(task.deadline).toLocaleDateString()}</p>
            </div>
            
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pl-6 sm:border-l border-slate-200 dark:border-slate-800">
               <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3 text-slate-500 dark:text-neutral-400">
                 <User className="w-5 h-5" />
               </div>
               <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">Client</p>
               <p className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-[120px] sm:max-w-full" title={task.client_email}>{task.client_email.split('@')[0]}</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none relative z-10">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Project Details</h3>
            <div className="text-slate-600 dark:text-neutral-300 font-medium leading-relaxed whitespace-pre-wrap p-6 bg-slate-50/30 dark:bg-slate-900/20 rounded-2xl border border-slate-100 dark:border-slate-800/30">
              {task.description}
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="w-full lg:w-[420px]">
        <div className="bg-white dark:bg-[#0b101d]/80 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-200/60 dark:border-slate-800/60 p-8 sticky top-28 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#e10032] to-[#ff4d6d]" />
          
          <h2 className="text-2xl font-extrabold mb-8 text-slate-900 dark:text-white tracking-tight">Submit Proposal</h2>
          
          {proposalFlash && (
            <div className={`mb-8 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
              proposalFlash.includes('success') 
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' 
                : 'bg-red-50 text-[#e10032] border border-red-200/50 dark:bg-red-950/20 dark:text-[#ff4d6d] dark:border-red-900/30'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${proposalFlash.includes('success') ? 'bg-emerald-500' : 'bg-[#e10032]'}`} />
              {proposalFlash}
            </div>
          )}

          {user?.role === 'Client' || user?.role === 'Admin' ? (
             <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-sm font-bold uppercase tracking-wider text-center border border-slate-200/50 dark:border-slate-800/50 text-slate-500 dark:text-neutral-400">
               Only Freelancers can submit proposals.
             </div>
          ) : task.status !== 'Open' ? (
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-sm font-bold uppercase tracking-wider text-center border border-slate-200/50 dark:border-slate-800/50 text-slate-500 dark:text-neutral-400">
               Task is no longer accepting proposals.
            </div>
          ) : (
            <form onSubmit={handleSubmitProposal} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2">My Bid (USD)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input type="number" required min="1" max="100000" disabled={submitting}
                         value={budget} onChange={e => setBudget(e.target.value)}
                         className="w-full pl-9 pr-5 py-3.5 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-bold disabled:opacity-50" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2">Estimated Days</label>
                <div className="relative">
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase tracking-wider">Days</span>
                  <input type="number" required min="1" max="365" disabled={submitting}
                         value={days} onChange={e => setDays(e.target.value)}
                         className="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-bold disabled:opacity-50" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2">Cover Note Message</label>
                <textarea required rows={5} disabled={submitting}
                          value={note} onChange={e => setNote(e.target.value)}
                          placeholder="Why are you a good fit?"
                          className="w-full px-5 py-4 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none resize-none transition-all duration-300 font-medium disabled:opacity-50 leading-relaxed" />
              </div>
              
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#e10032] to-[#ff4d6d] text-white hover:from-[#c2002b] hover:to-[#e10032] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_8px_20px_rgba(225,0,50,0.25)] hover:shadow-[0_12px_25px_rgba(225,0,50,0.35)] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : user ? "Apply Now" : "Login to Apply"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
