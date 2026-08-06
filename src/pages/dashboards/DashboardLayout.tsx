// This matches the challenge structural rules for dashboards.
import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children, roleLinks }: { children: React.ReactNode, roleLinks: {path: string, label: string}[] }) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row gap-0 bg-white/70 dark:bg-[#0b101d]/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden min-h-[650px] relative">
      
      {/* Mobile Toggle Header - Ultra Premium Glassmorphic design with glowing highlights */}
      <div className="md:hidden flex items-center justify-between p-5 border-b border-slate-100/85 dark:border-slate-800/50 bg-gradient-to-r from-white/90 via-slate-50/70 to-white/95 dark:from-[#0a0f1d]/90 dark:via-[#0c1222]/80 dark:to-[#090e1a]/95 backdrop-blur-xl relative overflow-hidden">
        {/* Colorful subtle background light behind the avatar */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 w-28 h-28 bg-[#e10032]/8 dark:bg-[#e10032]/12 blur-2xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="relative p-0.5 bg-gradient-to-tr from-[#e10032] via-[#ff4d6d] to-pink-500 rounded-full shadow-sm shadow-[#e10032]/10">
            <img src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-[#0c1222]" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c1222] shadow-sm animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-800 dark:text-neutral-100 block tracking-tight leading-tight">{user.name}</span>
            <span className="text-[9px] uppercase font-bold tracking-[0.18em] text-[#e10032] dark:text-[#ff4d6d] block mt-0.5">{user.role} Dashboard</span>
          </div>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="relative z-10 p-3 bg-white/80 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl transition-all duration-300 text-slate-600 dark:text-neutral-400 border border-slate-200/40 dark:border-white/5 shadow-sm active:scale-95"
        >
          {mobileMenuOpen ? <X size={16} className="text-[#e10032] dark:text-[#ff4d6d]" /> : <Menu size={16} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 bg-gradient-to-b from-slate-50/60 via-slate-50/25 to-transparent dark:from-[#080d19]/80 dark:via-[#070b14]/50 dark:to-transparent backdrop-blur-xl border-r border-slate-200/40 dark:border-slate-800/50 p-6 md:py-10 flex flex-col transition-all duration-350 ${mobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
        <div className="hidden md:block mb-10 text-center md:text-left px-2 relative">
           {/* Subtle decorative theme accent background glow */}
           <div className="absolute top-0 left-0 w-24 h-24 bg-[#e10032]/8 dark:bg-[#e10032]/12 blur-2xl rounded-full pointer-events-none -z-10" />
           
           <div className="relative w-16 h-16 mb-4 rounded-full p-[2px] bg-gradient-to-tr from-[#e10032] via-[#ff4d6d] to-pink-500 shadow-md shadow-[#e10032]/10 dark:shadow-[#e10032]/5">
             <img src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#080d17]" />
             <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-[#080d17] shadow-md animate-pulse" />
           </div>
           
           <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight mb-1 tracking-tight">{user.name}</h3>
           <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-[0.18em]">{user.role} Account</p>
        </div>

        <div className="text-[9px] font-extrabold tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-500 mb-4 px-3.5 block md:block">
          Menu Navigation
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {roleLinks.map(link => (
            <NavLink 
              key={link.path}
              to={link.path}
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `relative px-4.5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-between overflow-hidden group border ${
                isActive 
                  ? 'text-[#e10032] dark:text-[#ff4d6d] bg-[#e10032]/6 dark:bg-[#e10032]/10 border-slate-200/20 dark:border-white/5 shadow-sm' 
                  : 'text-neutral-500 dark:text-neutral-400 border-transparent hover:text-[#e10032] dark:hover:text-[#ff4d6d] hover:bg-slate-100/40 dark:hover:bg-slate-900/40'
              }`}
            >
              {({ isActive }) => (
                <>
                  {/* Left edge neon-like highlight */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-[#e10032] to-[#ff4d6d] rounded-r-full" />
                  )}
                  
                  <span className={`${isActive ? 'translate-x-1.5' : 'translate-x-0 group-hover:translate-x-1'} transition-transform duration-300`}>
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e10032] dark:bg-[#ff4d6d] shadow-[0_0_8px_rgba(225,0,50,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}
