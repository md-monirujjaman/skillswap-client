import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseTasks from "./pages/BrowseTasks";
import BrowseFreelancers from "./pages/BrowseFreelancers";
import FreelancerProfile from "./pages/FreelancerProfile";
import TaskDetails from "./pages/TaskDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import DummyCheckout from "./pages/DummyCheckout";
import AuthCallback from "./pages/AuthCallback";
import ClientDashboard from "./pages/dashboards/ClientDashboard";
import FreelancerDashboard from "./pages/dashboards/FreelancerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DashboardRedirect from "./pages/dashboards/DashboardRedirect";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/auth/callback";

  if (isAuthPage) {
    return (
      <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#060a13] transition-colors relative overflow-hidden">
        {/* Subtle decorative grid/radial lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200/20 via-transparent to-transparent dark:from-[#e10032]/5 dark:via-transparent dark:to-transparent pointer-events-none -z-10" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#060a13] transition-colors relative">
      {/* Decorative premium radial mesh backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e10032]/5 via-transparent to-transparent dark:from-[#e10032]/8 dark:via-transparent dark:to-transparent pointer-events-none -z-10" />
      
      <Navbar />

      <main className={`flex-grow w-full relative z-10 ${location.pathname === "/" ? "" : "max-w-7xl mx-auto p-6 md:p-8 flex flex-col"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/tasks" element={<BrowseTasks />} />
          <Route path="/freelancers" element={<BrowseFreelancers />} />
          <Route path="/freelancers/:id" element={<FreelancerProfile />} />
          
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/payment/checkout" element={<DummyCheckout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          
          <Route path="/dashboard/client/*" element={
            <ProtectedRoute allowedRoles={['Client']}><ClientDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/freelancer/*" element={
            <ProtectedRoute allowedRoles={['Freelancer']}><FreelancerDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/admin/*" element={
            <ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
