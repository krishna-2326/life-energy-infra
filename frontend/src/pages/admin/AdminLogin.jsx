import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Zap, Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
      setSubmitting(false);
    }
  };

  const setDemoCredentials = () => {
    setEmail('admin@lifeenergyinfra.com');
    setPassword('Admin@123456');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-400 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Main Site
        </Link>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/20">
          <Zap className="w-7 h-7 fill-current" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">CMS Admin Portal Login</h2>
        <p className="text-xs text-slate-400">Life Energy Infra Private Limited (CIN: U70109PN2021PTC202308)</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-700/80 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@lifeenergyinfra.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-sm font-semibold"
            >
              {submitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={setDemoCredentials}
              className="text-xs text-brand-400 hover:underline inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Fill Demo Admin Credentials
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminLogin;
