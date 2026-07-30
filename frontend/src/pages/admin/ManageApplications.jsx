import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FileCheck, Mail, Phone, ExternalLink, Calendar, Trash2 } from 'lucide-react';

const ManageApplications = () => {
  const { token } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setApplications(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      console.error('Error updating application status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application record?')) return;
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApps = filterStatus === 'All'
    ? applications
    : applications.filter(item => item.status === filterStatus);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Job & Internship Applications</h1>
          <p className="text-xs text-slate-400 mt-1">Manage incoming resumes and applicant statuses.</p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2">
          {['All', 'New', 'Read', 'Responded'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(n => <div key={n} className="h-28 glass-card rounded-2xl animate-pulse"></div>)}
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-3xl">
          <p className="text-slate-400 text-sm">No applications found matching filter "{filterStatus}".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div key={app._id} className="p-6 rounded-3xl glass-card space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white">{app.name}</h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-400" />
                      {app.email}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-brand-400" />
                      {app.phone}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-brand-400">Position Applied: {app.positionAppliedFor}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Resume Link */}
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs py-1.5 px-3 gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View Resume
                  </a>

                  {/* Status Dropdown */}
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                      app.status === 'New'
                        ? 'bg-blue-950 text-blue-300 border-blue-700'
                        : app.status === 'Read'
                        ? 'bg-amber-950 text-amber-300 border-amber-700'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Read">Read</option>
                    <option value="Responded">Responded</option>
                  </select>

                  <button
                    onClick={() => handleDelete(app._id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 transition-colors"
                    title="Delete Application"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cover Note */}
              {app.message && (
                <div className="bg-slate-900/80 p-4 rounded-xl text-xs text-slate-300 leading-relaxed border border-slate-800">
                  <strong className="text-slate-200">Cover Note:</strong> {app.message}
                </div>
              )}

              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Applied on {new Date(app.submittedAt).toLocaleString()}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ManageApplications;
