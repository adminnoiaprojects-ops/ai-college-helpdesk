import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoiaLogo from "./NoiaLogo";

export default function Navbar({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "landing" },
    { label: "Features", id: "features-section" },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (id === "features-section") {
      onNavigate("landing");
      setTimeout(() => {
        const el = document.getElementById("features-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-dark-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-16">
        
        {/* Logo and Name */}
        <button 
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90 cursor-pointer"
        >
          <NoiaLogo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Noia AI <span className="font-light text-neutral-400">Helpdesk</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-400 transition-colors hover:text-white cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-6 md:flex">
          {currentPage !== "chat" && currentPage !== "admin" ? (
            <>
              <button 
                onClick={() => onNavigate("login")}
                className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-350 transition-colors hover:text-white cursor-pointer"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate("chat")}
                className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-xs font-bold text-black transition-all hover:bg-neutral-200 cursor-pointer"
              >
                Start Chat
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => onNavigate("landing")}
              className="rounded-full border border-glass-border px-5 py-2.5 font-sans text-xs font-bold text-white transition-all hover:bg-white/5 cursor-pointer"
            >
              Back Home
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border text-neutral-300 transition-colors hover:text-white md:hidden"
        >
          {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-glass-border bg-dark-bg/95 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left font-sans text-sm font-semibold uppercase tracking-wider text-neutral-450 py-1"
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-glass-border" />
              {currentPage !== "chat" && currentPage !== "admin" ? (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => { setIsOpen(false); onNavigate("login"); }}
                    className="w-full rounded-xl border border-glass-border py-3 text-center font-sans text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); onNavigate("chat"); }}
                    className="w-full rounded-xl bg-white py-3 text-center font-sans text-xs font-bold text-black"
                  >
                    Start Chat
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setIsOpen(false); onNavigate("landing"); }}
                  className="w-full rounded-xl border border-glass-border py-3 text-center font-sans text-xs font-bold text-white"
                >
                  Back Home
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
