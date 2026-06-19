import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("landing");
  const [user, setUser] = useState({ name: "Alex Johnson", email: "alex@college.edu", role: "student" });
  const [navigationParams, setNavigationParams] = useState(null);

  const handleNavigate = (page, params = null) => {
    setNavigationParams(params);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "chat":
        return (
          <ChatPage 
            onNavigate={handleNavigate} 
            user={user} 
            navigationParams={navigationParams} 
          />
        );
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} user={user} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white antialiased">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen w-full flex flex-col"
          >
            {renderPage()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
