import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Phone, Calendar, Trash2, CheckCircle2 } from 'lucide-react';

const ManageInquiries = () => {
  const { token } = useContext(AuthContext);
  const [inquiries, setInquiries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = filterStatus === 'All'
    ? inquiries
    : inquiries.filter(item => item.status === filterStatus);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Submissions Inbox</h1>
          <p className="text-xs text-slate-400 mt-1">Review inquiries submitted via the Contact Us form.</p>
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
      ) : filteredInquiries.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-3xl">
          <p className="text-slate-400 text-sm">No contact inquiries found matching filter "{filterStatus}".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div key={inq._id} className="p-6 rounded-3xl glass-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white">{inq.name}</h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-400" />
                      {inq.email}
                    </span>
                    {inq.phone && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brand-400" />
                        {inq.phone}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-emerald-400">{inq.subject}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Dropdown Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Status:</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        inq.status === 'New'
                          ? 'bg-blue-950 text-blue-300 border-blue-700'
                          : inq.status === 'Read'
                          ? 'bg-amber-950 text-amber-300 border-amber-700'
                          : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Responded">Responded</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDelete(inq._id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="bg-slate-900/80 p-4 rounded-xl text-xs text-slate-300 leading-relaxed border border-slate-800">
                {inq.message}
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Received on {new Date(inq.submittedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ManageInquiries;
