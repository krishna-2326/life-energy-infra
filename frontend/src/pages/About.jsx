import React, { useEffect, useState } from 'react';
import { ShieldCheck, Target, Eye, Building2, MapPin, Mail, Award, Linkedin, Users } from 'lucide-react';
import { safeFetchJson } from '../utils/api';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await safeFetchJson('/api/team');
        if (data.success) {
          setTeam(data.data);
        }
      } catch (err) {
        console.error('Error loading team data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
          Corporate Identity
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">About Life Energy Infra</h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Registered in Maharashtra, India (CIN: U70109PN2021PTC202308), Life Energy Infra Private Limited delivers sustainable electrical infrastructure, commercial solar EPC, and energy storage engineering.
        </p>
      </div>

      {/* Corporate Identity & Registered Office Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-brand-400" />
              Registered Company Profile
            </h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong className="text-white">Legal Entity Name:</strong> Life Energy Infra Private Limited</p>
              <p><strong className="text-white">Corporate Identification Number (CIN):</strong> <span className="font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">U70109PN2021PTC202308</span></p>
              <p><strong className="text-white">Registration Year:</strong> 2021</p>
              <p><strong className="text-white">State of Registration:</strong> Maharashtra, India (ROC Pune)</p>
              <p><strong className="text-white">Industry Sector:</strong> Renewable Energy, Power Distribution & Infrastructure EPC</p>
              <p><strong className="text-white">Official Contact Email:</strong> <a href="mailto:lifeenergyinfra@gmail.com" className="text-brand-400 hover:underline">lifeenergyinfra@gmail.com</a></p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-400" />
              Registered Office Address
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Life Energy Infra Private Limited<br />
              Registered Office: Pune, Maharashtra - 411001, India.<br />
              Authorized MCA Jurisdiction: Registrar of Companies (ROC), Pune.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-brand-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              Fully Verified Corporate Registration
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-8 rounded-3xl glass-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Mission</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            To design, construct, and maintain state-of-the-art energy infrastructure that empowers commercial industries across India with affordable, zero-carbon, and highly reliable electrical energy solutions.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Vision</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            To become Maharashtra's premier infrastructure provider for utility-scale battery energy storage systems, microgrids, and high-voltage grid integrations by 2030.
          </p>
        </div>

      </div>

      {/* Leadership & Directors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Leadership Team</span>
          <h2 className="text-3xl font-extrabold text-white">Board of Directors & Executives</h2>
          <p className="text-sm text-slate-400">Governance and technical steering committee for Life Energy Infra.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="h-64 rounded-2xl glass-card animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member._id} className="p-6 rounded-2xl glass-card space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <img
                    src={member.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-brand-500/40"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">{member.designation}</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {member.bio || 'Director leading technical execution and statutory compliance.'}
                  </p>
                </div>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-400 transition-colors pt-2 border-t border-slate-800"
                  >
                    <Linkedin className="w-4 h-4" /> Professional Profile
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default About;
