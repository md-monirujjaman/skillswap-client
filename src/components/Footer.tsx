import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight, Linkedin, Instagram, Facebook, Github } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-slate-900 py-16 md:py-24 mt-auto transition-all relative overflow-hidden">
      {/* Background radial gradient glow for branding depth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#e10032]/5 via-transparent to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12 md:gap-8 pb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start gap-5">
            <Link to="/" className="inline-block transform hover:scale-[1.02] transition-transform duration-200">
              <Logo iconSize="w-10 h-10" textColorClass="text-gray-900 dark:text-white text-2xl font-black" />
            </Link>
            <p className="text-slate-500 dark:text-neutral-400 text-[13px] md:text-sm leading-relaxed max-w-sm font-medium tracking-wide">
              The elite micro-task ecosystem. Hire pre-vetted specialists, manage secure milestones, and execute complex workflows with zero platform lock-in.
            </p>
          </div>

          {/* Navigation Link Groups */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="font-extrabold text-gray-900 dark:text-gray-100 text-[11px] uppercase tracking-[0.2em] mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "Browse Tasks", to: "/tasks" },
                { name: "Freelancers", to: "/freelancers" },
                { name: "Sign In", to: "/login" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-[#71717a] dark:text-[#a1a1aa] hover:text-[#e10032] dark:hover:text-[#ff2a5f] transition-all duration-250 font-medium flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guidelines/Policy */}
          <div className="col-span-1 md:col-span-2 md:col-start-8">
            <h4 className="font-extrabold text-gray-900 dark:text-gray-100 text-[11px] uppercase tracking-[0.2em] mb-6">
              Platform
            </h4>
            <ul className="space-y-4 text-sm">
              {[
                { name: "About Us", to: "#" },
                { name: "Privacy Policy", to: "#" },
                { name: "Terms of Service", to: "#" },
                { name: "Trust & Safety", to: "#" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.to} 
                    className="text-[#71717a] dark:text-[#a1a1aa] hover:text-[#e10032] dark:hover:text-[#ff2a5f] transition-all duration-250 font-medium flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-2 md:col-span-3 md:col-start-10">
            <h4 className="font-extrabold text-gray-900 dark:text-gray-100 text-[11px] uppercase tracking-[0.2em] mb-6">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-[#71717a] dark:text-[#a1a1aa]">
              <a 
                href="mailto:support@skillwrap.com" 
                className="flex items-center gap-2.5 font-medium hover:text-[#e10032] dark:hover:text-[#ff2a5f] transition-colors group w-max"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-900/50 flex items-center justify-center border border-gray-100 dark:border-slate-800/60 group-hover:border-[#e10032]/30 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>support@skillwrap.com</span>
              </a>
              <div className="flex items-center gap-2.5 font-medium">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-900/50 flex items-center justify-center border border-gray-100 dark:border-slate-800/60">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>

              {/* Clean, borderless social handles placed directly under Contact details */}
              <div className="flex gap-4 pt-4 items-center">
                {[
                  { 
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ), 
                    href: "#", 
                    label: "X" 
                  },
                  { icon: <Linkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
                  { icon: <Instagram className="w-4 h-4" />, href: "#", label: "Instagram" },
                  { icon: <Facebook className="w-4 h-4" />, href: "#", label: "Facebook" },
                  { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => e.preventDefault()}
                    aria-label={item.label}
                    className="text-gray-400 hover:text-[#e10032] dark:text-[#71717a] dark:hover:text-[#ff4d6d] transition-all duration-300 hover:scale-[1.15] active:scale-[0.9]"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row with ONLY centered copyright text */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800/50 flex justify-center text-center">
          <p className="text-xs text-[#a1a1aa] dark:text-[#71717a] font-medium">
            &copy; {new Date().getFullYear()} Skillwrap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
