import { useState } from "react";
import { 
  LayoutDashboard, HelpCircle, FileText, Users, 
  Search, Bell, LogOut, ArrowUpRight, TrendingUp, CheckCircle, Clock, 
  AlertTriangle, MessageSquare, ArrowLeft, Plus, Trash2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import NoiaLogo from "../components/NoiaLogo";

export default function AdminDashboard({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  
  // FAQs State
  const [faqs, setFaqs] = useState([
    { id: 1, question: "What is the annual hostel fee?", answer: "The hostel fee is approximately ₹60,000 per year.", category: "Hostel" },
    { id: 2, question: "When do semester examinations begin?", answer: "Semester examinations begin in December.", category: "Academic" },
    { id: 3, question: "When do placement drives begin?", answer: "Placement drives usually begin in January.", category: "Placements" }
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("Academic");

  // Users State
  const [usersList] = useState([
    { id: 1, name: "Aarav Sharma", email: "aarav.sharma@college.edu", queries: 8, registered: "June 12, 2026", status: "Active" },
    { id: 2, name: "Isha Patel", email: "isha.patel@college.edu", queries: 12, registered: "June 08, 2026", status: "Active" },
    { id: 3, name: "Rohan Das", email: "rohan.das@college.edu", queries: 4, registered: "June 14, 2026", status: "Inactive" },
    { id: 4, name: "Ananya Sen", email: "ananya.sen@college.edu", queries: 19, registered: "May 29, 2026", status: "Active" }
  ]);

  // Queries Data
  const [queries, setQueries] = useState([
    { id: 1, student: "Isha Patel", question: "Can I get a room with AC in the hostel block?", date: "June 15, 2026 11:24 AM", status: "Pending", category: "Hostel" },
    { id: 2, student: "Aarav Sharma", question: "When do placement drives start for CSE students?", date: "June 15, 2026 10:15 AM", status: "Resolved", category: "Placements" },
    { id: 3, student: "Ananya Sen", question: "Is there a supplementary exam schedule for Semester 2?", date: "June 14, 2026 04:45 PM", status: "Resolved", category: "Academic" },
    { id: 4, student: "Rohan Das", question: "Refund procedure for admission withdrawal?", date: "June 14, 2026 09:12 AM", status: "Escalated", category: "Admissions" },
    { id: 5, student: "Sneha Reddy", question: "What are the rules regarding night out permissions?", date: "June 13, 2026 03:30 PM", status: "Resolved", category: "Hostel" }
  ]);

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    
    setFaqs([
      ...faqs,
      {
        id: Date.now(),
        question: newQuestion,
        answer: newAnswer,
        category: newCategory
      }
    ]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const handleToggleStatus = (id) => {
    setQueries(queries.map(q => {
      if (q.id === id) {
        const nextStatus = q.status === "Pending" ? "Resolved" : q.status === "Resolved" ? "Escalated" : "Pending";
        return { ...q, status: nextStatus };
      }
      return q;
    }));
  };

  const filteredQueries = queries.filter(q => 
    q.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-dark-bg text-white">
      {/* Sidebar Panel */}
      <aside className="hidden w-72 flex-col border-r border-glass-border bg-[#080808] md:flex">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-6 py-5.5 border-b border-glass-border">
          <NoiaLogo className="h-8 w-8" />
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-tight leading-none text-white">
              Noia Admin
            </span>
            <span className="font-sans text-[10px] text-neutral-500 mt-1.5 leading-none font-medium uppercase tracking-wider">
              Helpdesk Console
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
              activeTab === "dashboard" ? "bg-white text-black" : "text-neutral-450 hover:bg-white/[0.03] hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("faqs")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
              activeTab === "faqs" ? "bg-white text-black" : "text-neutral-450 hover:bg-white/[0.03] hover:text-white"
            }`}
          >
            <HelpCircle className="h-4.5 w-4.5" />
            Manage FAQs
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
              activeTab === "logs" ? "bg-white text-black" : "text-neutral-450 hover:bg-white/[0.03] hover:text-white"
            }`}
          >
            <FileText className="h-4.5 w-4.5" />
            Chat Logs
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
              activeTab === "users" ? "bg-white text-black" : "text-neutral-450 hover:bg-white/[0.03] hover:text-white"
            }`}
          >
            <Users className="h-4.5 w-4.5" />
            Students List
          </button>
        </nav>

        {/* Footer Admin Info */}
        <div className="p-4 border-t border-glass-border bg-black/40 flex flex-col gap-2.5">
          <button
            onClick={() => onNavigate("chat")}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-glass-border py-3 text-center font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Chat
          </button>
          
          <button
            onClick={() => onNavigate("landing")}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-900/60 py-3 text-center font-sans text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-550/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-dark-bg">
        {/* Dashboard Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-glass-border bg-[#030303]/80 px-6 md:px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {activeTab === "dashboard" ? "Overview" : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search query input */}
            <div className="relative hidden sm:block">
              <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search queries..."
                className="glass-input rounded-full py-1.5 pr-4 pl-10 font-sans text-xs text-white placeholder-neutral-500 w-56"
              />
            </div>
            
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-glass-border text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-white font-semibold text-xs border border-glass-border">
                {user ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="hidden font-sans text-xs font-semibold text-neutral-300 md:block">
                {user ? user.name : "Admin"}
              </span>
            </div>

            <button 
              onClick={() => onNavigate("chat")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass-border text-neutral-400 hover:text-white md:hidden cursor-pointer"
              title="Return to Chat"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Panels Scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 space-y-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <AnimatePresence mode="wait">
              {/* DASHBOARD TAB OVERVIEW */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Analytics Cards Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1: Users */}
                    <GlassCard hoverEffect={false} className="border border-glass-border bg-glass-bg/60 p-6">
                      <div className="flex justify-between items-start text-neutral-450">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Total Users</span>
                        <Users className="h-4 w-4 text-neutral-500" />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-3xl font-extrabold text-white">124</span>
                        <span className="flex items-center gap-0.5 font-sans text-[10px] font-bold text-emerald-400">
                          <TrendingUp className="h-3 w-3" /> +12%
                        </span>
                      </div>
                      <div className="mt-4 font-sans text-[10px] text-neutral-500">
                        Active student records.
                      </div>
                    </GlassCard>

                    {/* Card 2: Chats */}
                    <GlassCard hoverEffect={false} className="border border-glass-border bg-glass-bg/60 p-6">
                      <div className="flex justify-between items-start text-neutral-450">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Total Chats</span>
                        <MessageSquare className="h-4 w-4 text-neutral-500" />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-3xl font-extrabold text-white">562</span>
                        <span className="flex items-center gap-0.5 font-sans text-[10px] font-bold text-emerald-400">
                          <TrendingUp className="h-3 w-3" /> +28%
                        </span>
                      </div>
                      <div className="mt-4 font-sans text-[10px] text-neutral-500">
                        Conversations complete.
                      </div>
                    </GlassCard>

                    {/* Card 3: FAQs */}
                    <GlassCard hoverEffect={false} className="border border-glass-border bg-glass-bg/60 p-6">
                      <div className="flex justify-between items-start text-neutral-450">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider">FAQs Entries</span>
                        <HelpCircle className="h-4 w-4 text-neutral-500" />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-3xl font-extrabold text-white">{faqs.length + 32}</span>
                        <span className="font-sans text-[10px] text-neutral-500">
                          Static programmed
                        </span>
                      </div>
                      <div className="mt-4 font-sans text-[10px] text-neutral-500">
                        Helpdesk automation replies.
                      </div>
                    </GlassCard>

                    {/* Card 4: Satisfaction */}
                    <GlassCard hoverEffect={false} className="border border-glass-border bg-glass-bg/60 p-6">
                      <div className="flex justify-between items-start text-neutral-450">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Satisfaction Rate</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-3xl font-extrabold text-white">94%</span>
                        <span className="flex items-center gap-0.5 font-sans text-[10px] font-bold text-emerald-400">
                          Stable
                        </span>
                      </div>
                      <div className="mt-4 font-sans text-[10px] text-neutral-500">
                        Average user rating scores.
                      </div>
                    </GlassCard>
                  </div>

                  {/* Table of Queries */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Recent Student Queries</h3>
                      <span className="font-sans text-xs text-neutral-500">
                        Click badges to cycle statuses (Pending → Resolved → Escalated).
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-glass-border bg-glass-bg/60">
                      <table className="w-full text-left font-sans text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-glass-border bg-white/[0.01] text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4">Question</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-glass-border">
                          {filteredQueries.length > 0 ? (
                            filteredQueries.map((query) => (
                              <tr key={query.id} className="hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4 font-semibold text-white truncate max-w-[150px]">
                                  {query.student}
                                </td>
                                <td className="px-6 py-4 text-neutral-350 max-w-xs truncate" title={query.question}>
                                  {query.question}
                                </td>
                                <td className="px-6 py-4 text-neutral-500 whitespace-nowrap">
                                  {query.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-neutral-400 border border-white/5">
                                    {query.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => handleToggleStatus(query.id)}
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold border uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                                      query.status === "Resolved" 
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                        : query.status === "Pending"
                                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                        : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                    }`}
                                  >
                                    {query.status === "Resolved" && <CheckCircle className="h-3 w-3" />}
                                    {query.status === "Pending" && <Clock className="h-3 w-3" />}
                                    {query.status === "Escalated" && <AlertTriangle className="h-3 w-3" />}
                                    {query.status}
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="px-6 py-8 text-center text-xs text-neutral-500 font-medium">
                                No matching queries found in logs.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FAQS MANAGEMENT TAB */}
              {activeTab === "faqs" && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 max-w-4xl"
                >
                  {/* Form to Add FAQ */}
                  <GlassCard hoverEffect={false} className="border border-glass-border bg-glass-bg/60 p-6">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Add FAQ Template</h3>
                    <form onSubmit={handleAddFaq} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex flex-col gap-1.5 sm:col-span-3">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-450">Question Title</label>
                        <input
                          type="text"
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          placeholder="e.g., When does registration close?"
                          className="glass-input rounded-xl px-4 py-3 font-sans text-xs text-white placeholder-neutral-500"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-455">Response Answer</label>
                        <input
                          type="text"
                          value={newAnswer}
                          onChange={(e) => setNewAnswer(e.target.value)}
                          placeholder="e.g., Registration is scheduled to close on September 15th."
                          className="glass-input rounded-xl px-4 py-3 font-sans text-xs text-white placeholder-neutral-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-455">Category Tag</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="glass-input rounded-xl px-4 py-3 font-sans text-xs text-white bg-dark-bg"
                        >
                          <option value="Academic">Academic</option>
                          <option value="Hostel">Hostel</option>
                          <option value="Placements">Placements</option>
                          <option value="Admissions">Admissions</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3 flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          Create Entry
                        </button>
                      </div>
                    </form>
                  </GlassCard>

                  {/* FAQ List */}
                  <div className="space-y-4">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Programmed FAQ Database</h3>
                    <div className="space-y-3">
                      {faqs.map((faq) => (
                        <GlassCard hoverEffect={false} key={faq.id} className="border border-glass-border bg-glass-bg/60 p-5 flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase text-neutral-400 border border-white/5">
                                {faq.category}
                              </span>
                              <span className="font-sans text-xs font-semibold text-white">
                                {faq.question}
                              </span>
                            </div>
                            <p className="mt-2.5 font-sans text-xs text-neutral-450 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-neutral-500 hover:text-red-400 transition-colors hover:bg-red-500/5 shrink-0 cursor-pointer"
                            title="Delete FAQ"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CHAT LOGS ARCHIVE */}
              {activeTab === "logs" && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Student Transcripts</h3>
                    <span className="font-sans text-xs text-neutral-500">Archives catalog.</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-1 border border-glass-border rounded-2xl bg-glass-bg/60 p-4 flex flex-col gap-2">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-2 pb-1">Catalog Index</span>
                      
                      <button className="flex w-full flex-col gap-1 rounded-xl bg-white/[0.04] p-3 text-left border border-glass-border/30 cursor-pointer">
                        <span className="font-sans text-xs font-semibold text-white">Session #9254</span>
                        <span className="font-sans text-[10px] text-neutral-450">Student: Aarav Sharma</span>
                        <span className="font-sans text-[9px] text-neutral-550 mt-1">Today 10:15 AM</span>
                      </button>

                      <button className="flex w-full flex-col gap-1 rounded-xl p-3 text-left hover:bg-white/[0.02] cursor-pointer">
                        <span className="font-sans text-xs font-semibold text-neutral-400">Session #9251</span>
                        <span className="font-sans text-[10px] text-neutral-500">Student: Isha Patel</span>
                        <span className="font-sans text-[9px] text-neutral-550 mt-1">Today 11:24 AM</span>
                      </button>

                      <button className="flex w-full flex-col gap-1 rounded-xl p-3 text-left hover:bg-white/[0.02] cursor-pointer">
                        <span className="font-sans text-xs font-semibold text-neutral-400">Session #9239</span>
                        <span className="font-sans text-[10px] text-neutral-500">Student: Ananya Sen</span>
                        <span className="font-sans text-[9px] text-neutral-550 mt-1">Yesterday 4:45 PM</span>
                      </button>
                    </div>

                    <div className="md:col-span-2 border border-glass-border rounded-2xl bg-glass-bg/60 p-6 flex flex-col h-[400px]">
                      <div className="flex justify-between items-center border-b border-glass-border pb-3">
                        <div>
                          <span className="font-sans text-xs font-bold text-white">Transcript ID: #9254</span>
                          <p className="font-sans text-[10px] text-neutral-500">Aarav Sharma • CSE Department</p>
                        </div>
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">RESOLVED</span>
                      </div>

                      <div className="flex-1 overflow-y-auto py-4 space-y-4 font-sans text-xs">
                        <div className="flex gap-2">
                          <span className="font-bold text-neutral-300">Student:</span>
                          <p className="text-neutral-450">When do placement drives start for CSE students?</p>
                        </div>
                        <div className="flex gap-2 bg-white/[0.015] p-3 rounded-lg border border-glass-border">
                          <span className="font-bold text-white flex items-center gap-1 shrink-0"><Bot className="h-3.5 w-3.5 text-neutral-450" /> AI Bot:</span>
                          <p className="text-neutral-350 leading-relaxed">Placement drives usually begin in January. Major visiting recruiters include top tech companies and consulting firms. Pre-placement training sessions start in November.</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-glass-border pt-3 flex justify-end gap-2">
                        <button className="rounded-lg border border-glass-border px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-350 hover:text-white transition-colors cursor-pointer">
                          Download
                        </button>
                        <button className="rounded-lg bg-white px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition-colors cursor-pointer">
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* USERS / STUDENTS LIST */}
              {activeTab === "users" && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Student Directory</h3>
                    <span className="font-sans text-xs text-neutral-500">Access registry.</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-glass-border bg-glass-bg/60">
                    <table className="w-full text-left font-sans text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-glass-border bg-white/[0.01] text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          <th className="px-6 py-4">Student Name</th>
                          <th className="px-6 py-4">Email Address</th>
                          <th className="px-6 py-4">Total Queries</th>
                          <th className="px-6 py-4">Registered Date</th>
                          <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-glass-border">
                        {usersList.map((st) => (
                          <tr key={st.id} className="hover:bg-white/[0.01] transition-colors">
                            <td className="px-6 py-4 font-semibold text-white truncate max-w-[150px]">
                              {st.name}
                            </td>
                            <td className="px-6 py-4 text-neutral-450 font-medium">
                              {st.email}
                            </td>
                            <td className="px-6 py-4 text-neutral-350">
                              {st.queries} queries submitted
                            </td>
                            <td className="px-6 py-4 text-neutral-500">
                              {st.registered}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase border ${
                                st.status === "Active" 
                                  ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-450" 
                                  : "bg-neutral-800 border-neutral-700 text-neutral-500"
                              }`}>
                                {st.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
