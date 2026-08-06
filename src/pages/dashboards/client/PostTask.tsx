import React, { useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function PostTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/tasks", {
        title, category, description, budget: Number(budget), deadline
      });
      navigate("/dashboard/client/tasks");
    } catch (e) {
      console.error(e);
      alert("Failed to post task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Post a New Task</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Create a detailed brief to attract the best talent on Skillwrap.</p>
      </div>
      <form onSubmit={handlePost} className="space-y-6 text-sm bg-white dark:bg-[#0b101d]/60 p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#e10032]/5 to-transparent pointer-events-none" />
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Task Title</label>
          <input required type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Design a minimal logo for my startup" className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium appearance-none">
              <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Design</option>
              <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Writing</option>
              <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Development</option>
              <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Marketing</option>
              <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Budget (USD)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input required type="number" min="1" value={budget} onChange={e=>setBudget(e.target.value)} placeholder="500" className="w-full pl-9 pr-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-bold" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Deadline Date</label>
          <input required type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Description</label>
          <textarea required rows={5} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Provide detailed requirements for this task..." className="w-full px-5 py-4 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl resize-none focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium leading-relaxed" />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <button type="submit" disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-[#e10032] to-[#ff4d6d] text-white hover:from-[#c2002b] hover:to-[#e10032] px-8 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_8px_20px_rgba(225,0,50,0.25)] hover:shadow-[0_12px_25px_rgba(225,0,50,0.35)] disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Posting...</span>
              </>
            ) : "Publish Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
