import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { AvatarProvider } from './context/AvatarContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import MainDashboard from './pages/Dashboard/MainDashboard';
import Onboarding from './pages/Auth/Onboarding';
import SkillMarketplace from './pages/Learn/SkillMarketplace';
import CoursePlayer from './pages/Learn/CoursePlayer';
import TeachDashboard from './pages/Teach/TeachDashboard';
import CommunityHub from './pages/Community/CommunityHub';
import MyProfile from './pages/Profile/MyProfile';
import Settings from './pages/Profile/Settings';
import Analytics from './pages/Profile/Analytics';
import CapabilityTest from './pages/Learn/CapabilityTest';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
      <Route path="/learn" element={<ProtectedRoute><SkillMarketplace /></ProtectedRoute>} />
      <Route path="/learn/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
      <Route path="/teach" element={<ProtectedRoute><TeachDashboard /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><CommunityHub /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/profile/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/learn/capability-test" element={<ProtectedRoute><CapabilityTest /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/videos" element={<ProtectedRoute><div /></ProtectedRoute>} /> {/* Deprecated */}
    </Routes>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AvatarProvider>
            <AppRoutes />
          </AvatarProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
