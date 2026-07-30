import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, X, Wrench, Sun, Battery, Zap, Cpu, ShieldCheck, Activity } from 'lucide-react';

const ManageServices = () => {
  const { token } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Sun',
    order: 0,
    isActive: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setServices(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', icon: 'Sun', order: services.length + 1, isActive: true });
    setModalOpen(true);
    setMsg(null);
  };

  const openEditModal = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || 'Sun',
      order: service.order || 0,
      isActive: service.isActive !== undefined ? service.isActive : true
    });
    setModalOpen(true);
    setMsg(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    const url = editingId ? `/api/services/${editingId}` : '/api/services';
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
        fetchServices();
      } else {
        setMsg({ type: 'error', text: data.message });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error saving service.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Energy Infrastructure Services</h1>
          <p className="text-xs text-slate-400 mt-1">Non-technical staff can add, edit, or disable services shown on the live website.</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-xs gap-2">
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(n => <div key={n} className="h-20 glass-card rounded-2xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Service Title</th>
                  <th className="px-6 py-4">Icon</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {services.map((svc) => (
                  <tr key={svc._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold">{svc.order}</td>
                    <td className="px-6 py-4 font-semibold text-white">{svc.title}</td>
                    <td className="px-6 py-4 font-mono text-emerald-400">{svc.icon}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{svc.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        svc.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {svc.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openEditModal(svc)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(svc._id)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 space-y-6 border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {msg && <p className="text-xs text-rose-400">{msg.text}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Service Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field text-xs" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description *</label>
                <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field text-xs"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Icon Indicator</label>
                  <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="input-field text-xs">
                    <option value="Sun">Sun (Solar)</option>
                    <option value="Battery">Battery (BESS)</option>
                    <option value="Zap">Zap (Substation/Grid)</option>
                    <option value="Cpu">Cpu (EV Fast Charger)</option>
                    <option value="ShieldCheck">ShieldCheck (Audits)</option>
                    <option value="Activity">Activity (Microgrids)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Display Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="input-field text-xs" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-brand-500" />
                <label htmlFor="isActive" className="font-semibold text-slate-300">Active / Visible on public website</label>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full text-xs">
                {submitting ? 'Saving Service...' : 'Save Service'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageServices;
