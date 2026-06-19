import { useState, useEffect, useRef } from "react";
import { 
  Plus, MessageSquare, LogOut, Send, Bot, User, 
  Menu, X, ArrowLeft, KeyRound, Copy, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoiaLogo from "../components/NoiaLogo";
import { addChatMessage } from "../services/firestoreService";
import { generateResponse } from "../services/geminiService";

export default function ChatPage({ onNavigate, user, navigationParams }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [chats, setChats] = useState([
    { id: "chat-1", title: "Admissions Query", active: true },
    { id: "chat-2", title: "Hostel Fee Inquiry", active: false },
    { id: "chat-3", title: "December Exam Dates", active: false }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (navigationParams && navigationParams.prompt) {
      handleAutoSend(navigationParams.prompt);
    }
  }, [navigationParams]);

  const handleAutoSend = (keyword) => {
    let query = "";
    if (keyword === "admission") query = "Tell me about the admission procedure and fee structure.";
    else if (keyword === "exam") query = "When will the semester exams start?";
    else if (keyword === "placement") query = "Are there any updates on company placement drives?";
    else if (keyword === "hostel") query = "What is the annual hostel fee?";

    if (query) {
      setInputValue("");
      submitMessage(query);
    }
  };

  const submitMessage = async (text) => {
    if (!text.trim()) return;

    const activeChat = chats.find(c => c.active) || { id: "chat-" + Date.now() };
    const sessionId = activeChat.id;
    const userId = user?.email || "anonymous";

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (messages.length === 0) {
      setChats(prev => prev.map(c => c.active ? { ...c, title: text.length > 25 ? text.substring(0, 22) + "..." : text } : c));
    }

    try {
      // 1. Save user message to Firestore asynchronously
      await addChatMessage(userId, sessionId, { text, sender: "user" });

      // 2. Fetch real AI response from Gemini
      const botResponseText = await generateResponse(text);

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // 3. Save AI response to Firestore
      await addChatMessage(userId, sessionId, { text: botResponseText, sender: "bot" });
      
    } catch (error) {
      console.error("Chat flow error:", error);
      setIsTyping(false);
      
      // Basic fallback if Firestore/Gemini completely fails
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I encountered an error connecting to my services. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    submitMessage(text);
  };

  const startNewChat = () => {
    setMessages([]);
    const newId = `chat-${Date.now()}`;
    setChats(prev => [
      { id: newId, title: "New Conversation", active: true },
      ...prev.map(c => ({ ...c, active: false }))
    ]);
  };

  const selectChat = (id) => {
    setChats(prev => prev.map(c => ({ ...c, active: c.id === id })));
    setIsTyping(true);
    setMessages([]);
    
    setTimeout(() => {
      setIsTyping(false);
      if (id === "chat-1") {
        setMessages([
          { id: "1", sender: "user", text: "When do engineering applications open?", timestamp: "10:30 AM" },
          { id: "2", sender: "bot", text: "Applications for the engineering program typically open in mid-August. You can check requirements on the college portal.", timestamp: "10:31 AM" }
        ]);
      } else if (id === "chat-2") {
        setMessages([
          { id: "1", sender: "user", text: "Is there a hostel layout directory?", timestamp: "Yesterday" },
          { id: "2", sender: "bot", text: "The hostel fee is approximately ₹60,000 per year. For specific room layouts and floors, please contact the warden.", timestamp: "Yesterday" }
        ]);
      } else {
        setMessages([]);
      }
    }, 400);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-dark-bg text-white">
      {/* Background blurs */}
      <div className="absolute -top-[10%] left-0 h-[400px] w-[400px] rounded-full bg-neutral-900/10 blur-[100px] pointer-events-none" />

      {/* Sidebar Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-glass-border bg-[#080808] transition-transform duration-300 md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4.5 border-b border-glass-border">
          <button 
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <NoiaLogo className="h-7 w-7" />
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              Noia AI Helpdesk
            </span>
          </button>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-glass-border text-neutral-400 hover:text-white md:hidden cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-4 py-4">
          <button 
            onClick={startNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-glass-border bg-white/[0.02] py-3.5 font-sans text-xs font-semibold text-white transition-colors hover:bg-white/5 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        {/* Recent Chats list */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <span className="px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
            Recent Conversations
          </span>
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left font-sans text-xs transition-colors cursor-pointer ${
                chat.active 
                  ? "bg-white/[0.06] text-white font-medium border border-glass-border/30" 
                  : "text-neutral-400 hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              <MessageSquare className="h-4 w-4 shrink-0 text-neutral-500" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>

        {/* User profile & Settings */}
        <div className="p-4 border-t border-glass-border bg-black/40 flex flex-col gap-2.5">
          <button
            onClick={() => onNavigate("admin")}
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors border border-glass-border/20 hover:border-glass-border cursor-pointer"
          >
            <KeyRound className="h-3.5 w-3.5 text-neutral-400" />
            Admin Dashboard
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-800 text-white font-bold text-xs border border-glass-border">
                {user ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-xs font-semibold text-white truncate max-w-[120px]">
                  {user ? user.name : "Guest Student"}
                </span>
                <span className="font-sans text-[10px] text-neutral-500 truncate max-w-[120px]">
                  {user ? user.email : "guest@college.edu"}
                </span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate("landing")}
              title="Logout"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-neutral-400 hover:text-red-400 transition-colors hover:bg-red-500/5 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-1 flex-col h-full overflow-hidden bg-dark-bg">
        {/* Mobile Navbar Header */}
        <header className="flex h-14 items-center justify-between border-b border-glass-border bg-[#030303]/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass-border text-neutral-300 cursor-pointer"
              >
                <Menu className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center gap-2.5">
              <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-neutral-300">
                Noia Helpdesk Assistant
              </span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-1.5 rounded-full border border-glass-border px-4 py-1.5 font-sans text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Exit
          </button>
        </header>

        {/* Message Panel Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto max-w-3xl space-y-6 py-4">
            
            {/* Empty Chat Welcome Screen */}
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.015] border border-glass-border text-white shadow-xl mb-6">
                    <Bot className="h-8 w-8 stroke-[1.5]" />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    How can I assist you today?
                  </h2>
                  <p className="mt-3 font-sans text-xs text-neutral-450 max-w-md mx-auto leading-relaxed">
                    Select a suggested template prompt below or type your questions directly regarding college admissions, hostels, exams, and jobs.
                  </p>

                  {/* Quick Suggestions Cards */}
                  <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button 
                      onClick={() => handleAutoSend("hostel")}
                      className="rounded-xl border border-glass-border bg-white/[0.01] p-4.5 text-left transition-all hover:bg-white/[0.04] hover:border-glass-border-hover group cursor-pointer"
                    >
                      <span className="font-display text-xs font-semibold text-white group-hover:underline">Hostel & Accommodation</span>
                      <p className="mt-1.5 font-sans text-[11px] text-neutral-500 leading-normal">
                        "What is the annual hostel fee and rules?"
                      </p>
                    </button>
                    
                    <button 
                      onClick={() => handleAutoSend("placement")}
                      className="rounded-xl border border-glass-border bg-white/[0.01] p-4.5 text-left transition-all hover:bg-white/[0.04] hover:border-glass-border-hover group cursor-pointer"
                    >
                      <span className="font-display text-xs font-semibold text-white group-hover:underline">Placements & Drives</span>
                      <p className="mt-1.5 font-sans text-[11px] text-neutral-500 leading-normal">
                        "When do corporate placement drives begin?"
                      </p>
                    </button>
                    
                    <button 
                      onClick={() => handleAutoSend("exam")}
                      className="rounded-xl border border-glass-border bg-white/[0.01] p-4.5 text-left transition-all hover:bg-white/[0.04] hover:border-glass-border-hover group cursor-pointer"
                    >
                      <span className="font-display text-xs font-semibold text-white group-hover:underline">Semester Examinations</span>
                      <p className="mt-1.5 font-sans text-[11px] text-neutral-500 leading-normal">
                        "When will the December semester exams start?"
                      </p>
                    </button>

                    <button 
                      onClick={() => handleAutoSend("admission")}
                      className="rounded-xl border border-glass-border bg-white/[0.01] p-4.5 text-left transition-all hover:bg-white/[0.04] hover:border-glass-border-hover group cursor-pointer"
                    >
                      <span className="font-display text-xs font-semibold text-white group-hover:underline">Admissions & Eligibility</span>
                      <p className="mt-1.5 font-sans text-[11px] text-neutral-500 leading-normal">
                        "What is the admission procedure for engineering?"
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversation Messages */}
            <div className="space-y-6">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${isBot ? "justify-start border-b border-glass-border pb-6" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-neutral-200">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-1.5 max-w-[85%] relative group">
                      {isBot ? (
                        <div className="flex flex-col gap-2">
                          <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-500">Noia AI</span>
                          <div className="font-sans text-sm leading-relaxed text-neutral-100 whitespace-pre-line pr-8">
                            {msg.text}
                          </div>
                          
                          {/* Clipboard Copy Button */}
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-lg border border-glass-border text-neutral-500 hover:text-white transition-all hover:bg-white/5 opacity-0 group-hover:opacity-100 cursor-pointer"
                            title="Copy Response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="rounded-2xl px-5 py-3.5 bg-white border border-white text-black font-medium font-sans text-sm rounded-tr-none shadow-md">
                          {msg.text}
                        </div>
                      )}
                      
                      <span className={`font-sans text-[9px] text-neutral-550 ${isBot ? "text-left mt-1" : "text-right px-1"}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {!isBot && (
                      <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-neutral-850 text-white border border-glass-border font-semibold text-xs shadow-md">
                        {user ? user.name.charAt(0).toUpperCase() : "S"}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Bot Typing Simulator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 justify-start pb-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-neutral-200">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-500">Noia AI</span>
                    <div className="rounded-2xl px-5 py-3 bg-white/[0.015] border border-glass-border text-white flex items-center gap-1.5 h-[40px]">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/80" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

          </div>
        </div>

        {/* Input Bar Form */}
        <footer className="p-4 md:p-8 bg-gradient-to-t from-dark-bg via-dark-bg/95 to-transparent">
          <form onSubmit={handleSend} className="mx-auto max-w-3xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about placements, hostel fees, exam times..."
                className="glass-input w-full rounded-2xl py-4.5 pr-14 pl-5.5 font-sans text-sm text-white placeholder-neutral-500 shadow-2xl"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black transition-colors hover:bg-neutral-250 disabled:bg-neutral-900 disabled:text-neutral-600 cursor-pointer"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
            
            <p className="mt-3.5 text-center font-sans text-[10px] text-neutral-600">
              Noia AI Helpdesk provides verified college information instantly. Powered by Noia Projects.
            </p>
          </form>
        </footer>
      </main>
    </div>
  );
}
