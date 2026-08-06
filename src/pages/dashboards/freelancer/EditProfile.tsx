import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "../../../contexts/AuthContext";

export default function EditProfile() {
  const { user, checkAuth } = useAuth();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
      setSkills(user.skills?.join(", ") || "");
      setBio(user.bio || "");
      setHourlyRate(user.hourlyRate?.toString() || "0");
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setIsSaving(true);
    try {
      await api.put("/api/users/profile", {
        name,
        image,
        skills: skills.split(",").map(s => s.trim()).filter(s => s),
        bio,
        hourlyRate: Number(hourlyRate)
      });
      await checkAuth();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Edit Public Profile</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Update your information to attract better clients and projects.</p>
      </div>
      
      {success && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleUpdate} className="space-y-6 text-sm bg-white dark:bg-[#0b101d]/60 p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#e10032]/5 to-transparent pointer-events-none" />
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Full Name</label>
          <input required type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium" />
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Profile Photo URL</label>
          <div className="flex gap-4 items-center">
            {image && (
               <img src={image} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 flex-shrink-0" onError={(e) => e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`} />
            )}
            <input type="url" value={image} onChange={e=>setImage(e.target.value)} placeholder="https://example.com/photo.jpg" className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Skills (comma separated)</label>
            <input type="text" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="React, Node.js, Design" className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-medium" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Hourly Rate (USD)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input type="number" min="0" value={hourlyRate} onChange={e=>setHourlyRate(e.target.value)} className="w-full pl-9 pr-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all duration-300 font-bold" />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Bio</label>
          <textarea rows={5} value={bio} onChange={e=>setBio(e.target.value)} placeholder="Tell clients about your background and expertise..." className="w-full px-5 py-4 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none resize-none transition-all duration-300 font-medium leading-relaxed" />
        </div>
        
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <button type="submit" disabled={isSaving} className="w-full md:w-auto bg-gradient-to-r from-[#e10032] to-[#ff4d6d] text-white hover:from-[#c2002b] hover:to-[#e10032] px-8 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_8px_20px_rgba(225,0,50,0.25)] hover:shadow-[0_12px_25px_rgba(225,0,50,0.35)] disabled:opacity-50 flex items-center justify-center gap-2">
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : "Save Profile Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
