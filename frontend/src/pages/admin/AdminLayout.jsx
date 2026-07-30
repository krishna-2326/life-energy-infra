import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Zap, LayoutDashboard, Wrench, FolderKanban, Briefcase, Users, Mail, FileCheck, LogOut, Globe } from 'lucide-react';

const AdminLayout = () => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Services', path: '/admin/services', icon: Wrench },
    { name: 'Manage Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Manage Job Listings', path: '/admin/careers', icon: Briefcase },
    { name: 'Manage Team & Board', path: '/admin/team', icon: Users },
    { name: 'Contact Inquiries', path: '/admin/inquiries', icon: Mail },
    { name: 'Job Applications', path: '/admin/applications', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col md:flex-row text-slate-200">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5 fill-current text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm text-white">LEI Admin CMS</span>
              <span className="text-[10px] text-slate-400">Life Energy Infra</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-400 transition-colors"
          >
            <Globe className="w-4 h-4" /> View Live Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Log Out Admin Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-navy-900/60 border-b border-slate-800 px-6 flex items-center justify-between glass-panel">
          <div>
            <span className="text-xs text-slate-400">CMS Control Center • CIN: U70109PN2021PTC202308</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-300">
              Logged in as: <strong className="text-white">{admin?.email}</strong>
            </span>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;
