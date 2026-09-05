import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LayoutGrid, PenTool, Code, TrendingUp, Users, Star, BadgeCheck, User as UserIcon, Sparkles, Zap, ShieldCheck, Palette, Feather, Terminal, Megaphone, Film, Compass, DollarSign, Clock3 } from "lucide-react";
import { motion } from "motion/react";
import api from "@/lib/api";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function SkillLogo({ skill }: { skill: string }) {
  const normalized = skill.toLowerCase().replace(/[.\s-]/g, "");
  const logos: Record<string, { color: string; path: string }> = {
    react: { color: "#61dafb", path: "M12 10.5c3.7 0 6.7.7 6.7 1.5s-3 1.5-6.7 1.5-6.7-.7-6.7-1.5 3-1.5 6.7-1.5Zm0-2.2c1.8-3.2 3.9-5.2 4.6-4.8.7.4.2 3.4-1.6 6.6-1.8 3.2-3.9 5.2-4.6 4.8-.7-.4-.2-3.4 1.6-6.6Zm0 7.4c-1.8 3.2-3.9 5.2-4.6 4.8-.7-.4-.2-3.4 1.6-6.6 1.8-3.2 3.9-5.2 4.6-4.8.7.4.2 3.4-1.6 6.6Z" },
    nodejs: { color: "#68a063", path: "M12 2.5 20.2 7v10L12 21.5 3.8 17V7L12 2.5Zm0 3.1L6.5 8.6v6.8l5.5 3 5.5-3V8.6L12 5.6Z" },
    python: { color: "#3776ab", path: "M12 2.5c-3.2 0-3.3 1.4-3.3 1.4v2h3.4v.7H7.3C3.7 6.6 3 9.2 3 12s.7 5.4 4.3 5.4h1.3v-2.5s-.1-3 3-3h5.1s2.9 0 2.9-2.8V6.5s0-4-4.1-4H12Zm-1.9 1.7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm3.9 17.3c3.2 0 3.3-1.4 3.3-1.4v-2h-3.4v-.7h4.8c3.6 0 4.3-2.6 4.3-5.4s-.7-5.4-4.3-5.4h-1.3v2.5s.1 3-3 3h-5.1s-2.9 0-2.9 2.8v2.6s0 4 4.1 4H14Zm1.9-1.7a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" },
    typescript: { color: "#3178c6", path: "M3 3h18v18H3V3Zm3.2 10.2v2.1h2.2v5.2h2.2v-5.2h2.2v-2.1H6.2Zm9.2 0c-2 0-3.1 1-3.1 2.4 0 1.6 1.2 2.2 2.8 2.6 1 .3 1.4.5 1.4.9 0 .4-.3.7-1 .7-1 0-1.6-.4-2.3-1l-1.2 1.5c.9.8 2.1 1.2 3.5 1.2 2.1 0 3.3-1 3.3-2.6 0-1.5-1-2.2-2.8-2.7-.9-.3-1.4-.5-1.4-.9 0-.3.3-.5.9-.5.7 0 1.3.2 1.9.7l1.1-1.6c-.8-.5-1.7-.7-3.1-.7Z" },
  };
  const logo = logos[normalized];
  return logo ? <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill={logo.color}><path d={logo.path} /></svg> : <Code className="h-4 w-4 shrink-0 text-[#e10032]" />;
}

export default function Home() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const taskAccent = (category = "") => {
    const accents: Record<string, string> = {
      Design: "from-fuchsia-500 to-rose-500",
      Development: "from-cyan-500 to-blue-600",
      Writing: "from-amber-400 to-orange-500",
      Marketing: "from-emerald-400 to-teal-600",
      Video: "from-violet-500 to-indigo-600",
    };
    return accents[category] || "from-[#e10032] to-[#ff7a94]";
  };

  const taskDifficulty = (task: any) => {
    const budget = Number(task.budget) || 0;
    if (budget >= 500) return { label: "High value", color: "text-rose-500" };
    if (budget >= 150) return { label: "Intermediate", color: "text-amber-500" };
    return { label: "Quick win", color: "text-emerald-500" };
  };

  const freelancerRating = (user: any) => {
    const rating = Number(user.average_rating);
    return Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 0;
  };

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-[#060a13] transition-colors min-h-screen">
      {/* Premium Elite Hero Section with smooth theme transitions */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative w-full overflow-hidden py-20 sm:py-24 md:py-28 px-6 md:px-12 mb-8 md:mb-10 text-center flex flex-col items-center justify-center transition-all duration-500 ${
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
            {user?.role === "Client" && (
              <button
                type="button"
                onClick={() => navigate(user?.role === "Client" ? "/dashboard/client/post" : "/login")}
                className="w-full sm:w-auto bg-[#e10032] text-white hover:bg-[#e10032]/95 px-8 py-4.5 rounded-2xl font-bold text-xs tracking-widest uppercase shadow-lg shadow-[#e10032]/20 hover:shadow-[#e10032]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Post a Task
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            )}
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
                  <div className="relative bg-white dark:bg-[#0b101d]/70 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 pt-7 h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#e10032]/30 group-hover:shadow-[0_18px_40px_rgba(225,0,50,0.12)] dark:group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${taskAccent(task.category)}`} />
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#e10032]/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex justify-between items-start mb-5 gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-full text-slate-600 dark:text-slate-300 truncate border border-slate-200/70 dark:border-slate-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {task.status || "Open"}
                      </span>
                      <span className="flex items-center gap-1 font-black text-lg text-gray-900 dark:text-white"><DollarSign className="w-4 h-4 text-[#e10032]" />{task.budget}</span>
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-[#e10032] dark:text-[#ff4d6d]">{task.category}</span>
                      <span className="text-slate-300 dark:text-slate-700">/</span>
                      <span className={taskDifficulty(task).color}>{taskDifficulty(task).label}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors line-clamp-2 leading-snug">
                      {task.title}
                    </h3>
                    <div className="pt-5 mt-auto flex flex-col gap-1.5 text-[13px] font-medium text-[#71717a] dark:text-neutral-400">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-500"><UserIcon className="w-3.5 h-3.5" /> <span className="truncate text-slate-700 dark:text-neutral-300">{task.client_name || task.client_email}</span></span>
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-500"><Clock3 className="w-3.5 h-3.5" /> <span className="text-slate-700 dark:text-neutral-300">Due: {new Date(task.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span></span>
                      <span className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-bold text-[#e10032] dark:text-[#ff4d6d]">View Task <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
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
                <Link to={`/freelancers/${user._id}`} className="bg-white dark:bg-[#0b101d]/60 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 text-center hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_16px_45px_rgba(225,0,50,0.13)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-[#e10032] to-amber-400 opacity-80" />
                  
                  <div className="relative mx-auto mb-6">
                    <img 
                      src={user.image}
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-[#0f172a] shadow-md relative z-10"
                    />
                    {!user.image && <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full border-4 border-slate-100 bg-slate-100 text-2xl font-black text-slate-500 dark:border-[#0f172a] dark:bg-slate-800 dark:text-slate-300">{user.name?.slice(0, 1).toUpperCase()}</div>}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e10032] to-pink-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 scale-110 -z-10"></div>
                  </div>

                  <h3 className="font-extrabold text-lg mb-2 flex items-center justify-center gap-1.5 text-gray-900 dark:text-white group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors">
                    {user.name}
                    {user.isVerified && (
                      <BadgeCheck className="w-5 h-5 text-[#e10032]" />
                    )}
                  </h3>

                  <div className="flex gap-2 justify-center items-center text-[#e10032] dark:text-[#ff4d6d] mb-5 text-xs font-bold bg-red-50 dark:bg-red-950/20 w-max mx-auto px-3 py-1 rounded-full border border-red-100/20 dark:border-red-900/10">
                    <Star className="w-3.5 h-3.5 fill-[#e10032] dark:fill-[#ff4d6d] text-transparent" /> {freelancerRating(user) ? freelancerRating(user).toFixed(1) : "Not rated"}
                    <span className="h-1.5 w-16 overflow-hidden rounded-full bg-red-100 dark:bg-red-950"><span className="block h-full rounded-full bg-[#e10032] dark:bg-[#ff4d6d]" style={{ width: `${freelancerRating(user) * 20}%` }} /></span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-6 h-12 overflow-hidden">
                    {(user.skills || []).slice(0, 3).map((s: string) => (
                      <span key={s} title={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-neutral-300 rounded-lg text-[11px] font-semibold border border-slate-100 dark:border-slate-800/40"><SkillLogo skill={s} />{s}</span>
                    ))}
                  </div>

                  <div className="text-xs mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-4 text-slate-500 dark:text-neutral-500">
                    <div className="mb-3 flex items-center justify-between"><span><span className="font-extrabold text-black dark:text-white">{user.finished_jobs ?? 0}</span> finished jobs</span><span className="rounded-full bg-slate-100 px-2 py-1 font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-200">{user.hourlyRate || user.hourly_rate ? `$${user.hourlyRate || user.hourly_rate}/hr` : "Rate unavailable"}</span></div>
                    <span className="flex items-center justify-center gap-1 font-bold text-[#e10032] dark:text-[#ff4d6d]">View Profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
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
          <div className="hidden md:block absolute left-[16.66%] right-[16.66%] top-14 h-px bg-gradient-to-r from-[#e10032]/20 via-[#e10032]/60 to-[#e10032]/20" />
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
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  {/* Icon wrapper */}
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-sm ${
                    theme === 'dark'
                      ? 'bg-[#e10032]/10 border-[#e10032]/20 text-[#ff426f] group-hover:bg-[#e10032] group-hover:border-[#e10032] group-hover:text-white'
                      : 'bg-[#e10032]/5 border-[#e10032]/10 text-[#e10032] group-hover:bg-[#e10032] group-hover:border-transparent group-hover:text-white'
                  }`}>
                    <span className="absolute -top-3 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#e10032] text-[10px] font-black text-white shadow-md shadow-[#e10032]/30">{idx + 1}</span>
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
            <motion.div variants={itemVariants} key={idx} className="relative group p-10 rounded-[2.5rem] bg-white/50 dark:bg-[#0b101d]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 hover:bg-white dark:hover:bg-[#0c1222]/80 hover:shadow-[0_20px_55px_rgba(225,0,50,0.12)] transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#e10032]/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 pointer-events-none"></div>
               <div className="text-6xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-[#e10032] to-gray-600 dark:from-white dark:via-[#ff4d6d] dark:to-gray-400 group-hover:from-[#e10032] group-hover:to-pink-500 transition-all duration-500 flex items-baseline justify-center gap-1">
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
