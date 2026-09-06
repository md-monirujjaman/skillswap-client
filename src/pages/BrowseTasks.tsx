import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Link, useSearchParams } from "react-router-dom";
import { Task } from "../types";
import { Search } from "lucide-react";

export default function BrowseTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Pagination and Filtering State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [error, setError] = useState("");

  // Update category when URL query param changes
  useEffect(() => {
    const catParam = searchParams.get("category") || "";
    setCategory(catParam);
  }, [searchParams]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    if (newCat) {
      setSearchParams({ category: newCat });
    } else {
      setSearchParams({});
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/tasks", {
        params: { page, limit: 9, search, category },
      });
      const payload = res.data?.data || res.data || {};
      const taskList = Array.isArray(payload) ? payload : payload.tasks;
      setTasks(Array.isArray(taskList) ? taskList : []);
      setTotalPages(Math.max(1, Number(payload.pages) || 1));
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setTasks([]);
      setTotalPages(1);
      setError("Tasks could not be loaded right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, category]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Decorative premium radial underlay */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[250px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#e10032]/4 via-transparent to-transparent dark:from-[#e10032]/8 dark:via-transparent dark:to-transparent pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-3.5 font-mono">
            <span>Explore Opportunities</span>
          </div>
          <h1 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10032] via-[#ff2a5f] to-[#ff7fa1]">Open Tasks</span>
          </h1>
          <p className="text-slate-500 dark:text-neutral-400 text-sm md:text-base mt-1.5 font-medium">Find the perfect job that matches your professional skills.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto relative z-15">
          <div className="relative group flex-1 sm:flex-initial">
             <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#e10032] transition-colors" />
             <input 
               type="text" 
               placeholder="Search tasks..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b101d]/60 backdrop-blur-md rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none w-full sm:w-64 text-sm font-medium transition-all duration-300"
             />
          </div>
          <select 
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b101d]/60 backdrop-blur-md rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none w-full sm:w-48 text-sm font-medium transition-all duration-300 text-slate-800 dark:text-slate-100"
          >
            <option value="" className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100">All Categories</option>
            <option value="Design" className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100">Design</option>
            <option value="Writing" className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100">Writing</option>
            <option value="Development" className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100">Development</option>
            <option value="Marketing" className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100">Marketing</option>
            <option value="Other" className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="relative inline-flex items-center justify-center w-10 h-10">
            <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
            <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading tasks...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 border border-dashed rounded-3xl border-red-200 dark:border-red-900 font-medium max-w-xl mx-auto">
          {error}
        </div>
      ) : tasks.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          No tasks found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Link to={`/tasks/${task._id}`} key={task._id} className="group block h-full">
              <div className="bg-white dark:bg-[#0b101d]/60 border text-left border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6.5 h-full flex flex-col hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_12px_35px_rgba(225,0,50,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.45)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex justify-between items-start mb-5">
                  <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-950/20 text-[10px] font-bold uppercase tracking-widest rounded-full text-[#e10032] dark:text-[#ff4d6d] border border-red-100/10 dark:border-red-900/10">
                    {task.category}
                  </span>
                  <span className="font-extrabold text-lg text-[#e10032] dark:text-[#ff4d6d]">${task.budget}</span>
                </div>
                
                <h3 className="text-xl font-bold tracking-tight mb-2.5 group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors line-clamp-2 leading-snug text-slate-900 dark:text-white">
                  {task.title}
                </h3>
                
                <p className="text-sm text-slate-500 dark:text-neutral-450 line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {task.description}
                </p>
                
                <div className="pt-4.5 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-xs text-slate-500 dark:text-neutral-500 mt-auto">
                  <span className="truncate font-medium text-slate-600 dark:text-neutral-400">Client: <strong className="text-slate-800 dark:text-neutral-300 font-semibold">{task.client_name || task.client_email}</strong></span>
                  <span className="flex-shrink-0 text-slate-400 dark:text-neutral-500 font-mono">Due: {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-2.5 bg-slate-100 dark:bg-[#0b101d]/60 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200"
          >
            Previous
          </button>
          <div className="flex items-center gap-2" aria-label="Task pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
                className={`h-10 min-w-10 rounded-xl px-3 text-xs font-bold transition-colors ${
                  pageNumber === page
                    ? "bg-[#e10032] text-white shadow-md shadow-[#e10032]/20"
                    : "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-[#0b101d]/60 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-6 py-2.5 bg-slate-100 dark:bg-[#0b101d]/60 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
