import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoiaLogo from "../components/NoiaLogo";

export default function SignupPage({ onNavigate, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isConfiguredAdmin = email.toLowerCase().trim() === "admin@noia.edu";
      onLogin({ email, name, role: isConfiguredAdmin ? "admin" : "student" });
      onNavigate(isConfiguredAdmin ? "admin" : "chat");
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-dark-bg text-white">
      {/* Background blurs */}
      <div className="absolute top-[20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neutral-800/5 blur-[130px] pointer-events-none" />

      <Navbar currentPage="signup" onNavigate={onNavigate} />

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <GlassCard hoverEffect={false} className="w-full max-w-md border border-glass-border bg-glass-bg/65 p-8 md:p-10">
          
          {/* Card Header */}
          <div className="text-center flex flex-col items-center">
            <NoiaLogo className="h-12 w-12" />
            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
              Create an account
            </h2>
            <p className="mt-2 font-sans text-xs text-neutral-450">
              Get immediate answers to all your college queries.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-center font-sans text-xs font-semibold text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-450">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="glass-input w-full rounded-xl py-3.5 pr-4 pl-11 font-sans text-sm text-white placeholder-neutral-550"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-450">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@college.edu"
                  className="glass-input w-full rounded-xl py-3.5 pr-4 pl-11 font-sans text-sm text-white placeholder-neutral-550"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-450">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full rounded-xl py-3.5 pr-4 pl-11 font-sans text-sm text-white placeholder-neutral-550"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Redirection link */}
          <p className="mt-6 text-center font-sans text-xs text-neutral-450">
            Already have an account?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="font-bold text-white underline underline-offset-4 hover:text-neutral-200 cursor-pointer"
            >
              Sign in
            </button>
          </p>

        </GlassCard>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
