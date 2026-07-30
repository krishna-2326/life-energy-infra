import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Users } from 'lucide-react';

const ManageTeam = () => {
  const { token } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    image: '',
    linkedin: '',
    order: 0
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.success) setTeam(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      designation: 'Director',
      bio: '',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com',
      order: team.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingId(t._id);
    setFormData({
      name: t.name,
      designation: t.designation || '',
      bio: t.bio || '',
      image: t.image || '',
      linkedin: t.linkedin || '',
      order: t.order || 0
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete director profile?')) return;
    try {
      await fetch(`/api/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTeam();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editingId ? `/api/team/${editingId}` : '/api/team';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchTeam();
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
          <h1 className="text-2xl font-bold text-white">Manage Board of Directors & Leadership</h1>
          <p className="text-xs text-slate-400 mt-1">Manage director profiles shown on the About Us page.</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-xs gap-2">
          <Plus className="w-4 h-4" /> Add Director / Executive
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(n => <div key={n} className="h-20 glass-card rounded-2xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((m) => (
            <div key={m._id} className="p-6 rounded-3xl glass-card flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={m.image} alt={m.name} className="w-14 h-14 rounded-full object-cover border border-brand-500/40 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-white">{m.name}</h3>
                  <p className="text-xs text-brand-400 font-medium">{m.designation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(m)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(m._id)} className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400">
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
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 space-y-4 border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Profile' : 'Add Director'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field text-xs" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Designation / Role *</label>
                <input type="text" required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="input-field text-xs" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Short Bio</label>
                <textarea rows="2" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="input-field text-xs"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Image URL</label>
                  <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="input-field text-xs" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">LinkedIn Profile URL</label>
                  <input type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="input-field text-xs" />
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full text-xs">
                {submitting ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageTeam;
