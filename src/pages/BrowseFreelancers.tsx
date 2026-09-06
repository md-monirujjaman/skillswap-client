import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { User } from "../types";
import { Star, BadgeCheck } from "lucide-react";

export default function BrowseFreelancers() {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFr = async () => {
      try {
        const res = await api.get('/api/users/freelancers');
        const payload = res.data?.data || res.data || [];
        const freelancerList = Array.isArray(payload) ? payload : payload.freelancers;
        setFreelancers(Array.isArray(freelancerList) ? freelancerList : []);
      } catch (e) {
        console.error(e);
        setFreelancers([]);
        setError("Freelancers could not be loaded right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFr();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Decorative premium radial underlay */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[250px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#e10032]/4 via-transparent to-transparent dark:from-[#e10032]/8 dark:via-transparent dark:to-transparent pointer-events-none -z-10" />

      <div className="mb-12 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-3.5 font-mono">
          <span>Vetted Network</span>
        </div>
        <h1 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10032] via-[#ff2a5f] to-[#ff7fa1]">Freelancers</span>
        </h1>
        <p className="text-slate-500 dark:text-neutral-400 text-sm md:text-base mt-1.5 font-medium">Work with world-class specialists hand-selected for quality and safety.</p>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="relative inline-flex items-center justify-center w-10 h-10">
            <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
            <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading freelancers...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 border border-dashed rounded-3xl border-red-200 dark:border-red-900 font-medium max-w-xl mx-auto">
          {error}
        </div>
      ) : freelancers.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          No freelancers available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {freelancers.map(fr => (
            <Link to={`/freelancers/${fr._id}`} key={fr._id} className="group h-full block">
              <div className="bg-white dark:bg-[#0b101d]/60 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 text-center hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_12px_35px_rgba(225,0,50,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#e10032]/0 to-transparent group-hover:via-[#e10032]/60 transition-all duration-500" />
                
                <div className="relative mx-auto mb-5">
                  <img 
                    src={fr.image || `https://api.dicebear.com/7.x/initials/svg?seed=${fr.name}`} 
                    alt={fr.name} 
                    className="w-22 h-22 rounded-full object-cover border-4 border-slate-50 dark:border-[#0e172a] shadow-md relative z-10"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e10032] to-pink-500 blur-md opacity-0 group-hover:opacity-25 transition-opacity duration-300 scale-110 -z-10" />
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors duration-300">{fr.name}</h3>
                  {fr.isVerified && <BadgeCheck className="w-5 h-5 text-[#e10032] dark:text-[#ff4d6d]" />}
                </div>
                
                <div className="text-xs font-bold text-slate-500 dark:text-neutral-400 mb-4 bg-slate-50 dark:bg-slate-900/40 w-max mx-auto px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800/40">
                  Hourly: <span className="text-[#e10032] dark:text-[#ff4d6d] font-extrabold">${fr.hourlyRate || 0}</span> / hr
                </div>
                
                <div className="flex flex-wrap justify-center gap-1.5 my-3 flex-1 items-start content-start">
                  {fr.skills && fr.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-neutral-400 text-[10px] font-bold rounded-lg border border-slate-100 dark:border-slate-800/40">{skill}</span>
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-[#e10032] dark:text-[#ff4d6d] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Verified Specialist</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
