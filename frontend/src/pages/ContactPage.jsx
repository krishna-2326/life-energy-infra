import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck, Send, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: prefilledService ? `Inquiry for ${prefilledService}` : 'General Infrastructure Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry for ${prefilledService}`
      }));
    }
  }, [prefilledService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: 'success', message: 'Inquiry submitted successfully! We will contact you shortly.' });
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'General Infrastructure Inquiry',
            message: ''
          });
        } else {
          setFeedback({ type: 'error', message: data.message || 'Failed to send inquiry.' });
        }
      } else {
        setFeedback({ 
          type: 'error', 
          message: `Server returned status ${res.status}. If your backend service on Render is spinning up, please wait 30 seconds and try submitting again.` 
        });
      }
    } catch (err) {
      setFeedback({ 
        type: 'error', 
        message: 'Backend server is taking time to respond (Render free tier wakes up in ~30s). Please wait a moment and click Submit again, or email us directly at lifeenergyinfra@gmail.com' 
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
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Contact Life Energy Infra</h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Have an upcoming solar EPC project or energy audit requirement? Connect directly with our engineering & statutory compliance team.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white">Corporate Communication</h2>
              
              <div className="space-y-6 text-sm">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Official Email</h4>
                    <a href="mailto:lifeenergyinfra@gmail.com" className="text-brand-400 hover:underline">
                      lifeenergyinfra@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Registered Office</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Life Energy Infra Private Limited<br />
                      Pune, Maharashtra - 411001, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">MCA Registration Details</h4>
                    <p className="text-slate-300 font-mono text-xs">
                      CIN: U70109PN2021PTC202308
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Registrar of Companies (ROC) Pune, Maharashtra</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-3xl glass-card overflow-hidden border border-slate-800 h-64">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.0471115664!2d73.79292676767664!3d18.52456485994464!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white">Send Us an Inquiry</h2>
              <p className="text-xs text-slate-300">Submit your project details or questions. Submissions are stored directly in our system for prompt team response.</p>

              {feedback && (
                <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                  feedback.type === 'success' ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700' : 'bg-rose-950/90 text-rose-300 border border-rose-700'
                }`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Joshi"
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
                      placeholder="vikram@company.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98220 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Project Interest</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Requirements *</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Describe your capacity requirements, location, target completion date, etc..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full gap-2 text-sm"
                >
                  {submitting ? 'Transmitting Inquiry...' : 'Submit Inquiry'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ContactPage;
