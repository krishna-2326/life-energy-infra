import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedAdmin from './components/ProtectedAdmin';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageProjects from './pages/admin/ManageProjects';
import ManageCareers from './pages/admin/ManageCareers';
import ManageTeam from './pages/admin/ManageTeam';
import ManageInquiries from './pages/admin/ManageInquiries';
import ManageApplications from './pages/admin/ManageApplications';

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
        <Route path="/careers" element={<PublicLayout><CareersPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Panel Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="careers" element={<ManageCareers />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="applications" element={<ManageApplications />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AuthProvider>
  );
};

export default App;
