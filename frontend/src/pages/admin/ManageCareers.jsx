import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';

const ManageCareers = () => {
  const { token } = useContext(AuthContext);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    location: 'Pune, Maharashtra',
    department: 'Engineering',
    description: '',
    requirements: '',
    isActive: true
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchCareers = async () => {
    try {
      const res = await fetch('/api/careers/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setCareers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, [token]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      type: 'Internship',
      location: 'Pune, Maharashtra',
      department: 'Engineering',
      description: '',
      requirements: '',
      isActive: true
    });
    setModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingId(c._id);
    setFormData({
      title: c.title,
      type: c.type || 'Internship',
      location: c.location || '',
      department: c.department || '',
      description: c.description || '',
      requirements: c.requirements ? c.requirements.join('\n') : '',
      isActive: c.isActive !== undefined ? c.isActive : true
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete job posting?')) return;
    try {
      await fetch(`/api/careers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCareers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      requirements: formData.requirements.split('\n').map(r => r.trim()).filter(Boolean)
    };

    const url = editingId ? `/api/careers/${editingId}` : '/api/careers';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchCareers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Careers & Job Listings</h1>
          <p className="text-xs text-slate-400 mt-1">Post openings for engineering graduates, project managers, and interns.</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-xs gap-2">
          <Plus className="w-4 h-4" /> Post New Role
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(n => <div key={n} className="h-20 glass-card rounded-2xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="space-y-4">
          {careers.map((c) => (
            <div key={c._id} className="p-6 rounded-3xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.type === 'Internship' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>{c.type}</span>
                  <span className="text-xs text-slate-400">{c.location}</span>
                  {!c.isActive && <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded">Closed/Inactive</span>}
                </div>
                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{c.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEditModal(c)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(c._id)} className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 space-y-4 border border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Opening' : 'Post Job Opening'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Job Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Role Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="input-field text-xs">
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="input-field text-xs" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description *</label>
                <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field text-xs"></textarea>
              </div>
              <div>
                <label className="block font-semibold mb-1">Requirements (One per line)</label>
                <textarea rows="3" value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="input-field text-xs"></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="cIsActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-brand-500" />
                <label htmlFor="cIsActive" className="font-semibold text-slate-300">Active / Accepting Applications</label>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full text-xs">
                {submitting ? 'Saving Opening...' : 'Save Job Opening'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCareers;
