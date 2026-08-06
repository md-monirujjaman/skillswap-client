import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, LayoutGrid, PenTool, Code, TrendingUp, Users, Star, BadgeCheck, User as UserIcon, Briefcase, Sparkles, Zap, ShieldCheck, Palette, Feather, Terminal, Megaphone, Film, Compass } from "lucide-react";
import { motion } from "motion/react";
import api from "@/lib/api";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [data, setData] = useState<{
    latestTasks: any[];
    topFreelancers: any[];
    stats: { totalTasks: number; totalUsers: number; totalPayout: number } | null;
  }>({ latestTasks: [], topFreelancers: [], stats: null });
  const [loading, setLoading] = useState(true);

  const heroStars = [
    { id: 1, top: '12%', left: '8%', size: 14, delay: 0.2, duration: 5, type: 'sparkle', rotate: true },
    { id: 2, top: '18%', left: '82%', size: 18, delay: 1.5, duration: 6, type: 'sparkle', rotate: true },
    { id: 3, top: '48%', left: '12%', size: 6, delay: 0.8, duration: 4.5, type: 'dot' },
    { id: 4, top: '68%', left: '88%', size: 16, delay: 2.1, duration: 7, type: 'sparkle', rotate: true },
    { id: 5, top: '82%', left: '16%', size: 12, delay: 1.1, duration: 5.5, type: 'sparkle' },
    { id: 6, top: '15%', left: '48%', size: 8, delay: 3.2, duration: 6.5, type: 'dot' },
    { id: 7, top: '78%', left: '38%', size: 14, delay: 0.5, duration: 5, type: 'sparkle', rotate: true },
    { id: 8, top: '32%', left: '92%', size: 8, delay: 1.7, duration: 4.8, type: 'dot' },
    { id: 9, top: '58%', left: '72%', size: 12, delay: 2.6, duration: 5.8, type: 'sparkle' },
    { id: 10, top: '85%', left: '64%', size: 6, delay: 1.9, duration: 4.2, type: 'dot' },
    { id: 11, top: '28%', left: '26%', size: 16, delay: 2.4, duration: 6.2, type: 'sparkle', rotate: true },
    { id: 12, top: '64%', left: '78%', size: 8, delay: 0.4, duration: 5.2, type: 'dot' },
    { id: 13, top: '5%', left: '70%', size: 10, delay: 1.8, duration: 5.4, type: 'sparkle' },
    { id: 14, top: '38%', left: '4%', size: 15, delay: 0.9, duration: 6.8, type: 'sparkle', rotate: true },
    { id: 15, top: '90%', left: '45%', size: 7, delay: 2.7, duration: 4.9, type: 'dot' },
    { id: 16, top: '22%', left: '95%', size: 12, delay: 1.3, duration: 5.1, type: 'sparkle' },
    { id: 17, top: '74%', left: '55%', size: 16, delay: 3.1, duration: 7.2, type: 'sparkle', rotate: true },
    { id: 18, top: '42%', left: '85%', size: 8, delay: 0.6, duration: 4.6, type: 'dot' },
    { id: 19, top: '52%', left: '22%', size: 14, delay: 1.4, duration: 5.9, type: 'sparkle', rotate: true },
    { id: 20, top: '88%', left: '90%', size: 9, delay: 2.2, duration: 5.3, type: 'dot' },
    { id: 21, top: '35%', left: '60%', size: 24, delay: 2.9, duration: 8, type: 'glow' },
    { id: 22, top: '60%', left: '18%', size: 32, delay: 0.7, duration: 9, type: 'glow' },
    { id: 23, top: '10%', left: '35%', size: 11, delay: 1.2, duration: 5.7, type: 'sparkle' },
    { id: 24, top: '45%', left: '40%', size: 28, delay: 3.5, duration: 7.5, type: 'glow' }
  ];

  useEffect(() => {
    api.get("/api/home")
      .then(res => {
        if (res?.data) {
          setData({
            latestTasks: Array.isArray(res.data.latestTasks) ? res.data.latestTasks : [],
            topFreelancers: Array.isArray(res.data.topFreelancers) ? res.data.topFreelancers : [],
            stats: res.data.stats || null,
          });
        }
      })
      .catch((err) => {
        console.warn("Home data fetch notice:", err);
        setData({ latestTasks: [], topFreelancers: [], stats: null });
      })
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-[#060a13] transition-colors min-h-screen">
      {/* Premium Elite Hero Section with smooth theme transitions */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative w-full overflow-hidden py-32 md:py-44 px-6 md:px-12 mb-16 text-center flex flex-col items-center justify-center transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-[#02050b] via-[#060a13] to-[#060a13] text-white border-b border-neutral-900/45' 
            : 'bg-gradient-to-b from-white via-slate-50/20 to-slate-50 text-slate-900 border-b border-slate-200/40'
        }`}
      >
        {/* Minimalist, Ultra-Premium Geometric Background aligned with Brand Theme (#e10032, Black, White) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {theme === 'dark' ? (
            <>
              {/* Premium centered brand red radial glow right behind the main heading */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1300px] h-[400px] md:h-[650px] bg-[radial-gradient(circle,rgba(225,0,50,0.14)_0%,transparent_70%)] transition-all duration-500"></div>
              
              {/* Subtle top brand glow */}
              <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#e10032]/8 to-transparent"></div>
            </>
          ) : (
            <>
              {/* Soft centered red brand radial glow for premium light mode */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1300px] h-[400px] md:h-[650px] bg-[radial-gradient(circle,rgba(225,0,50,0.04)_0%,transparent_75%)] transition-all duration-500"></div>
              
              {/* Soft top gradient */}
              <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#e10032]/4 to-transparent"></div>
            </>
          )}

          {/* Premium Tech Grid System - Structured vertical and horizontal layout lines */}
          <div className="absolute inset-x-0 top-0 bottom-0 flex justify-between px-8 md:px-24 opacity-[0.02] dark:opacity-[0.06]">
            <div className="w-[1px] h-full bg-current"></div>
            <div className="w-[1px] h-full bg-current hidden sm:block"></div>
            <div className="w-[1px] h-full bg-current hidden md:block"></div>
            <div className="w-[1px] h-full bg-current"></div>
          </div>
          <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between py-12 md:py-24 opacity-[0.02] dark:opacity-[0.06]">
            <div className="h-[1px] w-full bg-current"></div>
            <div className="h-[1px] w-full bg-current hidden sm:block"></div>
            <div className="h-[1px] w-full bg-current"></div>
          </div>

          {/* Subtle brand red highlight accent lines in the corners to elevate premium feel */}
          <div className="absolute top-0 left-12 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#e10032]/30 to-transparent"></div>
          <div className="absolute bottom-0 right-12 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#e10032]/30 to-transparent"></div>

          {/* Elegant Floating & Sparkling Starry Background Effects */}
          {heroStars.map((star) => (
            <motion.div
              key={star.id}
              style={{
                position: 'absolute',
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: star.type === 'glow' ? [0.08, 0.25, 0.08] : [0.15, 0.9, 0.15],
                scale: star.type === 'glow' ? [0.9, 1.3, 0.9] : [0.85, 1.2, 0.85],
                y: [0, -10, 0],
                rotate: star.rotate ? [0, 180, 360] : 0,
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut"
              }}
              className="pointer-events-none select-none"
            >
              {star.type === 'sparkle' ? (
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-[#e10032] dark:text-[#ff4d6d]/90 drop-shadow-[0_0_8px_rgba(225,0,50,0.6)]">
                  <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
                </svg>
              ) : star.type === 'glow' ? (
                <div className="w-full h-full rounded-full bg-[#e10032]/25 dark:bg-[#ff4d6d]/20 blur-md" />
              ) : (
                <div className="w-full h-full rounded-full bg-current text-[#e10032]/40 dark:text-[#ff4d6d]/40 shadow-[0_0_8px_rgba(225,0,50,0.3)]" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Elegant Vetted Network Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-xs mb-8 shadow-sm transition-all ${
              theme === 'dark'
                ? 'border-[#e10032]/25 bg-[#e10032]/8 text-[#ff4d6d]'
                : 'border-[#e10032]/20 bg-[#e10032]/5 text-[#e10032]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e10032] fill-[#e10032]/10 animate-pulse" />
            <span className="tracking-[0.18em] uppercase text-[9px] font-extrabold">The modern freelance platform</span>
          </motion.div>

          {/* Typography Header designed with award-winning layout weights */}
          <h1 className={`text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05] max-w-5xl text-center transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            <span className="block">Get your tasks done</span>
            <span className="block mt-2">
              by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10032] via-[#ff2a5f] to-[#ff7fa1] drop-shadow-[0_0_35px_rgba(225,0,50,0.18)]">skilled freelancers</span>
            </span>
          </h1>

          <p className={`text-base md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium text-center transition-colors ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Skillwrap connects clients with skilled freelancers for micro-tasks. Post, propose, pay — all in one seamless platform.
          </p>

          {/* Action Buttons with high fidelity interactions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto relative z-20">
            <Link 
              to="/dashboard/client" 
              className="w-full sm:w-auto bg-[#e10032] text-white hover:bg-[#e10032]/95 px-8 py-4.5 rounded-2xl font-bold text-xs tracking-widest uppercase shadow-lg shadow-[#e10032]/20 hover:shadow-[#e10032]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Post a Task 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link 
              to="/tasks" 
              className={`w-full sm:w-auto px-8 py-4.5 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] ${
                theme === 'dark'
                  ? 'bg-neutral-900/50 border border-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-850 hover:border-neutral-700'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Browse Tasks
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Rest of the Page in a beautiful container constraint */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">


      {/* Dynamic Section 1 — Latest Featured Tasks */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-12 mb-16"
      >
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#e10032] dark:text-[#ff4d6d] mb-2 font-mono">Curated Work</div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Tasks</h2>
          </div>
          <Link to="/tasks" className="text-[#e10032] dark:text-[#ff2a5f] hover:underline font-bold text-sm md:text-base flex items-center gap-1 group">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-10 text-[#71717a]">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.latestTasks.map((task) => (
              <motion.div variants={itemVariants} key={task._id}>
                <Link to={`/tasks/${task._id}`} className="group block h-full">
                  <div className="bg-white dark:bg-[#0b101d]/60 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 h-full flex flex-col hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_8px_30px_rgba(225,0,50,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-5 gap-2">
                      <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-950/20 text-[10px] font-bold uppercase tracking-widest rounded-full text-[#e10032] dark:text-[#ff4d6d] truncate border border-red-100/30 dark:border-red-900/10">
                        {task.category}
                      </span>
                      <span className="font-extrabold text-gray-900 dark:text-white">${task.budget}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors line-clamp-2 leading-snug">
                      {task.title}
                    </h3>
                    <div className="pt-5 mt-auto flex flex-col gap-1.5 text-[13px] font-medium text-[#71717a] dark:text-neutral-400">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-500"><UserIcon className="w-3.5 h-3.5" /> <span className="truncate text-slate-700 dark:text-neutral-300">{task.client_name || task.client_email}</span></span>
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-500"><Briefcase className="w-3.5 h-3.5" /> <span className="text-slate-700 dark:text-neutral-300">Due: {new Date(task.deadline).toLocaleDateString()}</span></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {data.latestTasks.length === 0 && (
              <div className="col-span-full text-center py-12 text-[#71717a] bg-gray-50/50 dark:bg-slate-900/10 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 font-medium">No open tasks right now.</div>
            )}
          </div>
        )}
      </motion.section>

      {/* Dynamic Section 2 — Top Freelancers */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-20 md:py-28 mb-16 relative rounded-[2.5rem] p-8 md:p-14 overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className={`absolute inset-0 -z-10 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-gradient-to-b from-[#080d19]/60 to-[#04070e]/80' : 'bg-gradient-to-b from-slate-50/50 to-white'
        }`}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#e10032]/5 to-transparent dark:from-[#e10032]/8 dark:to-transparent rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-4 font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Vetted Talents</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10032] via-[#ff2a5f] to-[#ff7fa1]">Freelancers</span>
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto transition-colors ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Work with world-class, pre-vetted specialists selected for their elite communication and technical skill.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
              <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 animate-pulse">Loading Specialists</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.topFreelancers.map((user) => (
              <motion.div variants={itemVariants} key={user._id}>
                <Link to={`/freelancers/${user._id}`} className="bg-white dark:bg-[#0b101d]/60 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 text-center hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_12px_35px_rgba(225,0,50,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.4)] transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e10032]/0 to-transparent group-hover:via-[#e10032]/60 transition-all duration-500" />
                  
                  <div className="relative mx-auto mb-6">
                    <img 
                      src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-[#0f172a] shadow-md relative z-10"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e10032] to-pink-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 scale-110 -z-10"></div>
                  </div>

                  <h3 className="font-extrabold text-lg mb-2 flex items-center justify-center gap-1.5 text-gray-900 dark:text-white group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors">
                    {user.name}
                    {user.isVerified && (
                      <BadgeCheck className="w-5 h-5 text-[#e10032]" />
                    )}
                  </h3>

                  <div className="flex gap-1 justify-center items-center text-[#e10032] dark:text-[#ff4d6d] mb-5 text-xs font-bold bg-red-50 dark:bg-red-950/20 w-max mx-auto px-3 py-1 rounded-full border border-red-100/20 dark:border-red-900/10">
                    <Star className="w-3.5 h-3.5 fill-[#e10032] dark:fill-[#ff4d6d] text-transparent" /> {user.average_rating || "5.0"}
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-6 h-12 overflow-hidden">
                    {(user.skills || []).slice(0, 3).map((s: string) => (
                      <span key={s} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-neutral-400 rounded-lg text-[11px] font-semibold border border-slate-100 dark:border-slate-800/40">{s}</span>
                    ))}
                  </div>

                  <div className="text-xs mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-4 text-slate-500 dark:text-neutral-500">
                    <span className="font-extrabold text-black dark:text-white">{user.finished_jobs || 0}</span> finished jobs
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        id="how-it-works-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-20 md:py-28 mb-16 relative"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(225,0,50,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(225,0,50,0.05)_0%,transparent_70%)]"></div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-4 font-mono">
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Workflow</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            How <span className="text-[#e10032]">Skillwrap</span> Works
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto transition-colors ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Your streamlined path from a task idea to a completed project with secure escrow and vetted talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative max-w-6xl mx-auto">
          {[
            {
              title: "Post a Task",
              description: "Describe what you need done, set your budget, and choose a deadline.",
              badge: "Step 01",
              accent: "from-[#e10032]/10 to-transparent",
            },
            {
              title: "Get Proposals",
              description: "Review offers from talented freelancers. Pick the one that fits best.",
              badge: "Step 02",
              accent: "from-rose-500/10 to-transparent",
            },
            {
              title: "Hire and Pay",
              description: "Pay securely via Stripe. The freelancer begins working immediately.",
              badge: "Step 03",
              accent: "from-[#e10032]/15 to-transparent",
            }
          ].map((step, idx) => (
            <motion.div 
              variants={itemVariants} 
              key={idx} 
              className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-500 overflow-hidden group min-h-[290px] ${
                theme === 'dark'
                  ? 'bg-[#0b101d]/60 border-slate-800/60 hover:border-[#ff4d6d]/40 hover:bg-[#0c1222]/80 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-slate-200/60 hover:border-[#e10032]/30 hover:shadow-[0_20px_50px_rgba(225,0,50,0.06)]'
              }`}
            >
              {/* Corner ambient card light */}
              <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br ${step.accent} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  {/* Icon wrapper */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                    theme === 'dark'
                      ? 'bg-[#e10032]/10 border-[#e10032]/20 text-[#ff426f] group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white'
                      : 'bg-[#e10032]/5 border-[#e10032]/10 text-[#e10032] group-hover:bg-[#e10032] group-hover:border-transparent group-hover:text-white'
                  }`}>
                    {idx === 0 && <PenTool className="w-5 h-5 transition-colors duration-300" />}
                    {idx === 1 && <Users className="w-5 h-5 transition-colors duration-300" />}
                    {idx === 2 && <ShieldCheck className="w-5 h-5 transition-colors duration-300" />}
                  </div>
                  {/* Step Badge */}
                  <span className="font-mono text-[10px] font-extrabold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                    {step.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 transition-all ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                } group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d]`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors ${
                  theme === 'dark' ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-slate-600 group-hover:text-slate-700'
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Bottom decorative padding to maintain card structure */}
              <div className="mt-4" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section 
        id="popular-categories-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-16 md:py-24 mb-16 relative w-full"
      >
        {/* Subtle decorative background blur orbs to give premium glassmorphic depth */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(225,0,50,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(225,0,50,0.06)_0%,transparent_70%)]"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(225,0,50,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(225,0,50,0.04)_0%,transparent_70%)]"></div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 relative px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-4 font-mono">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Explore Domains</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Popular <span className="text-[#e10032]">Categories</span>
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto transition-colors ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Find highly skilled experts across a diverse range of creative, marketing, and technical fields.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 relative z-10 max-w-7xl mx-auto">
          {[
            { 
              name: "Design", 
              desc: "UI/UX & Branding",
              icon: <Palette className="w-5 h-5 transition-transform group-hover:scale-110" />, 
              colorClass: "text-[#e10032] dark:text-[#ff4d6d]",
              bgClass: "bg-[#e10032]/5 border-[#e10032]/10 dark:bg-[#e10032]/10 dark:border-[#e10032]/20 group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white"
            },
            { 
              name: "Writing", 
              desc: "Copy & Translation",
              icon: <Feather className="w-5 h-5 transition-transform group-hover:scale-110" />, 
              colorClass: "text-[#e10032] dark:text-[#ff4d6d]",
              bgClass: "bg-[#e10032]/5 border-[#e10032]/10 dark:bg-[#e10032]/10 dark:border-[#e10032]/20 group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white"
            },
            { 
              name: "Development", 
              desc: "Web & Software",
              icon: <Terminal className="w-5 h-5 transition-transform group-hover:scale-110" />, 
              colorClass: "text-[#e10032] dark:text-[#ff4d6d]",
              bgClass: "bg-[#e10032]/5 border-[#e10032]/10 dark:bg-[#e10032]/10 dark:border-[#e10032]/20 group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white"
            },
            { 
              name: "Marketing", 
              desc: "Growth & SEO",
              icon: <Megaphone className="w-5 h-5 transition-transform group-hover:scale-110" />, 
              colorClass: "text-[#e10032] dark:text-[#ff4d6d]",
              bgClass: "bg-[#e10032]/5 border-[#e10032]/10 dark:bg-[#e10032]/10 dark:border-[#e10032]/20 group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white"
            },
            { 
              name: "Video", 
              desc: "Motion & Editing",
              icon: <Film className="w-5 h-5 transition-transform group-hover:scale-110" />, 
              colorClass: "text-[#e10032] dark:text-[#ff4d6d]",
              bgClass: "bg-[#e10032]/5 border-[#e10032]/10 dark:bg-[#e10032]/10 dark:border-[#e10032]/20 group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white"
            },
            { 
              name: "Other", 
              desc: "Consulting & Help",
              icon: <Compass className="w-5 h-5 transition-transform group-hover:scale-110" />, 
              colorClass: "text-[#e10032] dark:text-[#ff4d6d]",
              bgClass: "bg-[#e10032]/5 border-[#e10032]/10 dark:bg-[#e10032]/10 dark:border-[#e10032]/20 group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white"
            }
          ].map((cat, idx) => (
            <motion.div variants={itemVariants} key={idx} className="h-full">
              <Link 
                to={`/tasks?category=${cat.name}`} 
                className={`relative block h-full p-6 md:p-8 rounded-3xl border transition-all duration-500 text-center overflow-hidden group ${
                  theme === 'dark'
                    ? 'bg-[#0b101d]/60 border-slate-800/60 hover:bg-[#0c1222]/80 hover:border-[#ff4d6d]/40'
                    : 'bg-white border-slate-200/50 hover:border-[#e10032]/30 hover:shadow-[0_15px_40px_rgba(225,0,50,0.04)]'
                }`}
              >
                {/* Background brand hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e10032]/2 to-[#e10032]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Unified Premium Minimal Icon */}
                <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-5 border transition-all duration-500 ${cat.bgClass} ${cat.colorClass}`}>
                  {cat.icon}
                </div>

                <div className={`font-bold tracking-tight mb-1.5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white group-hover:text-[#ff4d6d]' : 'text-slate-900 group-hover:text-[#e10032]'
                }`}>
                  {cat.name}
                </div>

                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 group-hover:text-[#e10032]/80 dark:group-hover:text-[#ff4d6d]/80 transition-colors duration-300">
                  {cat.desc}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Platform Stats */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-20 md:py-32 text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-[#e10032]/10 to-pink-500/10 dark:from-[#e10032]/20 dark:to-pink-500/20 blur-[130px] rounded-[100%] pointer-events-none -z-10"></div>
        
        <div className="text-center max-w-2xl mx-auto mb-20 relative px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-4 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Growth Metrics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">Platform at a Glance</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">Join thousands of freelancers and clients getting work done every day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          {[
            { label: "Tasks Posted", value: data.stats ? data.stats.totalTasks : "-", suffix: "+" },
            { label: "Platform Users", value: data.stats ? data.stats.totalUsers : "-", suffix: "+" },
            { label: "Total Payouts", value: data.stats ? `$${data.stats.totalPayout.toLocaleString()}` : "-", suffix: "" }
          ].map((stat, idx) => (
            <motion.div variants={itemVariants} key={idx} className="relative group p-10 rounded-[2.5rem] bg-white/50 dark:bg-[#0b101d]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 hover:bg-white dark:hover:bg-[#0c1222]/80 hover:shadow-2xl hover:shadow-[#e10032]/5 transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#e10032]/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 pointer-events-none"></div>
               <div className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:from-[#e10032] group-hover:to-pink-500 transition-all duration-500 flex items-baseline justify-center gap-1">
                  {stat.value}
                  {stat.suffix && <span className="text-3xl text-gray-400 group-hover:text-pink-400">{stat.suffix}</span>}
               </div>
               <div className="text-gray-500 dark:text-gray-400 font-bold tracking-wider uppercase text-xs font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-20 md:py-28 relative overflow-hidden mt-16 mb-8 group transition-all duration-500 rounded-[3rem] border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-[#0b101d]/40 shadow-[0_15px_40px_rgba(0,0,0,0.01)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
      >
        {/* Extreme Premium Gradient Orbs & Grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(225,0,50,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(225,0,50,0.12)_0%,transparent_70%)]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e10032]/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Sparkle top indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e10032]/25 bg-[#e10032]/5 text-[#e10032] dark:text-[#ff4d6d] text-[10px] font-bold uppercase tracking-widest mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5 fill-[#e10032]/10" />
            <span>Join Skillwrap Today</span>
          </div>

          <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Ready to <span className="text-[#e10032]">elevate</span> your work?
          </h2>
          
          <p className={`text-base md:text-xl mb-10 leading-relaxed max-w-xl mx-auto transition-colors ${
            theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Connect with vetted experts for precise, safe, escrow-protected tasks. Free sign up. Zero platform lock-in.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto relative z-20">
            <Link 
              to="/register" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e10032] to-[#ff2a5f] text-white px-8 py-4.5 rounded-2xl font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_35px_rgba(225,0,50,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              Create Your Account 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/tasks"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#0b101d] border border-slate-800 text-neutral-300 hover:text-white hover:bg-neutral-850'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore Open Tasks
            </Link>
          </div>
        </div>
      </motion.section>
      </div> {/* Close max-w-7xl wrapper */}
    </div>
  );
}
