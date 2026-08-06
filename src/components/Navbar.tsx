import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center transition-all duration-300 ${
      isActive
        ? "text-[#e10032] dark:text-[#ff4d6d]"
        : "text-neutral-600 hover:text-[#e10032] dark:text-neutral-400 dark:hover:text-[#ff4d6d] hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40"
    }`;
  };

  return (
    <nav className="bg-white/70 dark:bg-[#060a13]/70 backdrop-blur-2xl border-b border-slate-200/40 dark:border-slate-800/50 sticky top-0 z-50 transition-all duration-300 shadow-[0_2px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      {/* Decorative top brand-colored thin light line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e10032] to-transparent opacity-85 dark:opacity-75" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Column: Logo */}
          <div className="flex items-center flex-1">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <Logo className="flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-[1.02]" />
            </Link>
          </div>
          
          {/* Center Column: Professional Navigation Links with Premium Spinning Conic-Gradient Border */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            {[
              { path: "/", label: "Home" },
              { path: "/tasks", label: "Browse Tasks" },
              { path: "/freelancers", label: "Browse Freelancers" }
            ].map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={getLinkClass(link.path)}
                >
                  {isActive && (
                    <>
                      {/* Premium Spinning Border - Masked to be fully transparent on the inside */}
                      <div 
                        className="absolute inset-0 rounded-full pointer-events-none overflow-hidden -z-10"
                        style={{
                          padding: '1.2px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'destination-out',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                        }}
                      >
                        <div 
                          className="absolute inset-[-200%] animate-spin" 
                          style={{
                            background: `conic-gradient(from 0deg, transparent 0%, transparent 35%, #e10032 45%, #ff4d6d 55%, #e10032 65%, transparent 75%, transparent 100%)`,
                            animationDuration: '3.5s'
                          }}
                        />
                      </div>
                      {/* Premium clean glass pill background that maintains navbar transparency */}
                      <div className="absolute inset-0 rounded-full bg-neutral-100/30 dark:bg-neutral-900/45 backdrop-blur-md -z-10 shadow-[0_2px_12px_rgba(225,0,50,0.08)] border border-neutral-200/5 dark:border-white/5" />
                    </>
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Right Column: Theme Toggle & Actions */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-3.5">
            <button 
              onClick={toggleTheme} 
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white p-2.5 rounded-full transition-all hover:bg-slate-100/80 dark:hover:bg-slate-900/60 border border-transparent hover:border-slate-200/20"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
 
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={`/dashboard/${user.role.toLowerCase()}`} className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-100/50 dark:hover:bg-slate-900/40 border border-transparent hover:border-slate-200/10">Dashboard</Link>
                {user.role === 'Freelancer' && (
                  <Link to={`/freelancers/${user.id}`} className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-100/50 dark:hover:bg-slate-900/40 border border-transparent hover:border-slate-200/10">Profile</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="bg-black text-white dark:bg-white dark:text-black px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-black/10 dark:hover:shadow-white/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3.5">
                <Link to="/login" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-100/50 dark:hover:bg-slate-900/40">
                  Login
                </Link>
                <Link to="/register" className="bg-[#e10032] text-white hover:bg-[#e10032]/95 px-5.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-[#e10032]/20 hover:scale-[1.03] duration-200 hover:shadow-[#e10032]/35">
                  Get Started
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu and toggle */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleTheme} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-md transition mr-2">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-md transition">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-850">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Home</Link>
            <Link to="/tasks" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Browse Tasks</Link>
            <Link to="/freelancers" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Browse Freelancers</Link>
            {user ? (
              <>
                <Link to={`/dashboard/${user.role.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Dashboard</Link>
                {user.role === 'Freelancer' && <Link to={`/freelancers/${user.id}`} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Profile</Link>}
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full mt-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 px-4 py-2 rounded-lg text-base font-medium transition">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 px-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border border-neutral-200 dark:border-white/10">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2.5 rounded-md text-base font-medium bg-[#e10032] text-white hover:bg-[#e10032]/95 shadow-md shadow-[#e10032]/10 font-bold uppercase tracking-wider text-xs">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
