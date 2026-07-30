import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, FileText, Send, X } from 'lucide-react';

const CareersPage = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    positionAppliedFor: '',
    resumeLink: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('/api/careers');
        const data = await res.json();
        if (data.success) {
          setCareers(data.data);
        }
      } catch (err) {
        console.error('Error loading careers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setFormData({
      name: '',
      email: '',
      phone: '',
      positionAppliedFor: job ? job.title : 'General Application',
      resumeLink: '',
      message: ''
    });
    setFeedback(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: 'success', message: 'Application submitted successfully! Our HR team will review your application.' });
          setTimeout(() => {
            setSelectedJob(null);
            setFeedback(null);
          }, 3000);
        } else {
          setFeedback({ type: 'error', message: data.message || 'Failed to submit application. Please check input fields.' });
        }
      } else {
        setFeedback({ 
          type: 'error', 
          message: `Server returned status ${res.status}. If backend on Render is spinning up, please wait 30 seconds and try submitting again.` 
        });
      }
    } catch (err) {
      setFeedback({ 
        type: 'error', 
        message: 'Backend server is taking time to respond (Render free tier wakes up in ~30s). Please try submitting again in a moment.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
          Join Our Talent Network
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Careers & Internships</h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Build your career with Life Energy Infra Private Limited. We invite engineering graduates and experienced power professionals to work on ground-breaking solar EPC and energy storage projects.
        </p>
      </div>

      {/* Open Positions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-brand-400" />
            Open Opportunities
          </h2>
          <button
            onClick={() => openApplyModal(null)}
            className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1"
          >
            General Application / Open Spontaneous Inquiry <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-44 rounded-2xl glass-card animate-pulse"></div>
            ))}
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl space-y-3">
            <p className="text-slate-300">No active openings listed right now.</p>
            <button onClick={() => openApplyModal(null)} className="btn-primary text-xs">
              Submit Spontaneous Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {careers.map((job) => (
              <div key={job._id} className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      job.type === 'Internship' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      {job.location}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{job.description}</p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-semibold text-slate-300 mb-1">Key Requirements:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-400">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => openApplyModal(job)}
                    className="btn-primary w-full lg:w-auto text-sm gap-2"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob !== undefined && selectedJob !== false && selectedJob !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-700 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Apply for Position</h3>
                <p className="text-xs text-brand-400">{formData.positionAppliedFor}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                feedback.type === 'success' ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700' : 'bg-rose-950/90 text-rose-300 border border-rose-700'
              }`}>
                {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Position Applied For *</label>
                <input
                  type="text"
                  required
                  value={formData.positionAppliedFor}
                  onChange={(e) => setFormData({ ...formData, positionAppliedFor: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Resume Link (Google Drive / Dropbox / Cloud) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/.../view"
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                  className="input-field"
                />
                <p className="text-[11px] text-slate-400 mt-1">Provide a shareable URL to your resume (ensure view access is enabled).</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Note / Message</label>
                <textarea
                  rows="3"
                  placeholder="Briefly state your background and interest in Life Energy Infra..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full gap-2 text-sm"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default CareersPage;
