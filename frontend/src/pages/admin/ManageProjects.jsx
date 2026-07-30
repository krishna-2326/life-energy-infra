import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, FolderKanban } from 'lucide-react';

const ManageProjects = () => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    date: '',
    location: '',
    capacity: '',
    tags: '',
    featured: false
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      date: '2024',
      location: 'Maharashtra, India',
      capacity: '1.5 MWp',
      tags: 'Solar EPC, Industrial',
      featured: false
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      description: p.description,
      image: p.image || '',
      date: p.date || '',
      location: p.location || '',
      capacity: p.capacity || '',
      tags: p.tags ? p.tags.join(', ') : '',
      featured: !!p.featured
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project listing?')) return;
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
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
        fetchProjects();
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
          <h1 className="text-2xl font-bold text-white">Manage Portfolio Projects</h1>
          <p className="text-xs text-slate-400 mt-1">Showcase ongoing and completed energy infrastructure installations.</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-xs gap-2">
          <Plus className="w-4 h-4" /> Add Project Showcase
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(n => <div key={n} className="h-24 glass-card rounded-2xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="p-6 rounded-3xl glass-card flex justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">{p.capacity || 'Project'}</span>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400">{p.location} • {p.date}</p>
                <p className="text-xs text-slate-300 line-clamp-2">{p.description}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => openEditModal(p)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400">
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
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Project' : 'Add Project Showcase'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Project Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field text-xs" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description *</label>
                <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field text-xs"></textarea>
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="input-field text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="input-field text-xs" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Capacity / Metric</label>
                  <input type="text" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="input-field text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Date / Quarter</label>
                  <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="input-field text-xs" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tags (Comma Separated)</label>
                  <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="input-field text-xs" />
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full text-xs">
                {submitting ? 'Saving Project...' : 'Save Project'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageProjects;
