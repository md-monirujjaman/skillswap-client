import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { Task } from "../../../types";
import { Bookmark } from "lucide-react";

export default function BookmarkedTasks() {
  const [bookmarks, setBookmarks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await api.get('/api/users/bookmarks');
        setBookmarks(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await api.post(`/api/users/bookmark/${id}`);
      setBookmarks(bookmarks.filter(b => b._id !== id));
    } catch (e) {
      alert("Failed to remove bookmark");
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Bookmarked Tasks</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Access your saved jobs to apply later.</p>
      </div>
      
      {loading ? (
        <div className="py-24 text-center">
          <div className="relative inline-flex items-center justify-center w-10 h-10">
            <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
            <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading saved jobs...</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          You haven't bookmarked any open jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map(t => (
            <div key={t._id} className="p-6 md:p-8 bg-white dark:bg-[#0b101d]/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <Link to={`/tasks/${t._id}`} className="font-extrabold text-xl text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors pr-6">
                  {t.title}
                </Link>
                <button onClick={() => handleRemove(t._id)} className="text-[#e10032] dark:text-[#ff4d6d] hover:scale-110 active:scale-95 transition-transform flex-shrink-0" title="Remove Bookmark">
                  <Bookmark className="w-6 h-6 fill-current" />
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-neutral-400 mb-6 line-clamp-2 font-medium leading-relaxed relative z-10">{t.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 relative z-10">
                <span className="text-2xl font-black text-[#e10032] dark:text-[#ff4d6d]">${t.budget}</span>
                <span className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl border ${
                  t.status === 'Open' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' : 'bg-slate-50 text-slate-500 border-slate-200/50 dark:bg-slate-900/40 dark:text-neutral-400 dark:border-slate-800/50'
                }`}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
