import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, Calendar, Briefcase, Home } from "lucide-react";
import GlassCard from "../components/GlassCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      title: "Admission Assistance",
      description: "Get instant answers on eligibility criteria, fee structures, program options, and application deadlines.",
      icon: GraduationCap,
      color: "from-blue-500/20 to-cyan-500/20",
      delay: 0.1
    },
    {
      title: "Exam Information",
      description: "Quickly view details about upcoming semester assessments, results, hall tickets, and academic calendars.",
      icon: Calendar,
      color: "from-purple-500/20 to-indigo-500/20",
      delay: 0.2
    },
    {
      title: "Placement Support",
      description: "Track current recruiting schedules, participating companies, average packages, and mock interview preparations.",
      icon: Briefcase,
      color: "from-emerald-500/20 to-teal-500/20",
      delay: 0.3
    },
    {
      title: "Hostel Guidance",
      description: "Review fee breakups, room allocations, mess food menus, hostel rules, and check-in procedures.",
      icon: Home,
      color: "from-amber-500/20 to-orange-500/20",
      delay: 0.4
    }
  ];

  return (
    <div className="relative min-h-screen bg-dark-bg text-white selection:bg-white selection:text-black">
      {/* Background radial spotlight blurs */}
      <div className="absolute top-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-neutral-800/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] h-[500px] w-[500px] rounded-full bg-neutral-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] h-[450px] w-[450px] rounded-full bg-neutral-800/10 blur-[110px] pointer-events-none" />

      <Navbar currentPage="landing" onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center md:px-8 md:pt-36 md:pb-28">
        
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-neutral-300 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-neutral-200" />
          Modern Student Helpdesk System
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-extrabold tracking-tight text-white md:text-7xl"
        >
          Ask Anything About <br />
          <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
            Your College
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          AI-powered student support for admissions, exams, placements, hostel information, and academic guidance.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button 
            onClick={() => onNavigate("chat")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-sm font-semibold text-black transition-all hover:bg-neutral-200 sm:w-auto"
          >
            Start Chat
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById("features-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-glass-border bg-white/[0.02] px-8 py-4 font-sans text-sm font-semibold text-white transition-all hover:bg-white/5 sm:w-auto"
          >
            Explore Demo
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-32">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Key Helpdesk Modules
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl font-sans text-sm text-neutral-400"
          >
            Select any module to query about. The AI provides tailored context-aware responses instantly.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <GlassCard 
                key={feature.title} 
                delay={feature.delay}
                className="group relative flex flex-col justify-between overflow-hidden border border-glass-border bg-glass-bg p-8"
              >
                {/* Spotlight background glow behind card icon */}
                <div className={`absolute -top-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`} />
                
                <div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-neutral-300 transition-colors group-hover:bg-white group-hover:text-black">
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 font-sans text-xs leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between text-neutral-400 group-hover:text-white">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-wider">Explore Query</span>
                  <button 
                    onClick={() => {
                      // Pass selected feature parameter to chat page
                      onNavigate("chat", { prompt: feature.title.split(" ")[0].toLowerCase() });
                    }} 
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-glass-border transition-colors group-hover:bg-white group-hover:text-black"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <GlassCard hoverEffect={false} className="relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent border border-glass-border p-12 text-center">
          <div className="absolute top-0 left-1/2 h-1 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Experience the future of student guidance.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-neutral-400">
            No more waiting in lines or search-drilling complex portals. Try the AI-powered conversation helper now.
          </p>
          <button 
            onClick={() => onNavigate("chat")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-sans text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </GlassCard>
      </section>

      <div className="h-16" />

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
