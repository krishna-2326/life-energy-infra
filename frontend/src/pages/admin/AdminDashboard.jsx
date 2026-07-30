import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Mail, FileCheck, Wrench, FolderKanban, Briefcase, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className="space-y-8">
      
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Metrics Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time status of inquiries, applications, and public content.</p>
        </div>
        <div className="flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 px-3 py-1.5 rounded-lg text-xs font-mono text-brand-400">
          <ShieldCheck className="w-4 h-4" /> System Operational
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 glass-card rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Contact Inquiries */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Contact Inquiries</span>
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{stats?.totalInquiries || 0}</span>
              {stats?.newInquiries > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  {stats.newInquiries} New
                </span>
              )}
            </div>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-brand-400 hover:underline inline-flex items-center gap-1">
              Manage Inquiries <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Applications */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Job Applications</span>
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{stats?.totalApplications || 0}</span>
              {stats?.newApplications > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  {stats.newApplications} New
                </span>
              )}
            </div>
            <Link to="/admin/applications" className="text-xs font-semibold text-brand-400 hover:underline inline-flex items-center gap-1">
              Manage Applications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Active Services */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Active Services</span>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{stats?.activeServices || 0}</span>
            <Link to="/admin/services" className="text-xs font-semibold text-brand-400 hover:underline inline-flex items-center gap-1 block">
              Manage Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Portfolio Projects */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Portfolio Projects</span>
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <FolderKanban className="w-5 h-5" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{stats?.totalProjects || 0}</span>
            <Link to="/admin/projects" className="text-xs font-semibold text-brand-400 hover:underline inline-flex items-center gap-1 block">
              Manage Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Content Management Actions</h3>
          <p className="text-xs text-slate-300">Update services offered, add newly commissioned solar projects, post open internship positions, or edit director bios.</p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link to="/admin/services" className="btn-secondary text-xs justify-start gap-2">
              <Wrench className="w-4 h-4 text-brand-400" /> Services CMS
            </Link>
            <Link to="/admin/projects" className="btn-secondary text-xs justify-start gap-2">
              <FolderKanban className="w-4 h-4 text-brand-400" /> Projects CMS
            </Link>
            <Link to="/admin/careers" className="btn-secondary text-xs justify-start gap-2">
              <Briefcase className="w-4 h-4 text-brand-400" /> Careers CMS
            </Link>
            <Link to="/admin/team" className="btn-secondary text-xs justify-start gap-2">
              <Activity className="w-4 h-4 text-brand-400" /> Leadership CMS
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">System & Legal Details</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <p><strong className="text-white">Registered Entity:</strong> Life Energy Infra Private Limited</p>
            <p><strong className="text-white">CIN:</strong> U70109PN2021PTC202308</p>
            <p><strong className="text-white">Registered State:</strong> Maharashtra, India</p>
            <p><strong className="text-white">Notification Email:</strong> lifeenergyinfra@gmail.com</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
