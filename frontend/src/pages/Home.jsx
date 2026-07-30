import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sun, Battery, ShieldCheck, ArrowRight, CheckCircle2, Building2, TrendingUp, Award, Users } from 'lucide-react';

const Home = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resServices, resProjects] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/projects')
        ]);
        const dataServices = await resServices.json();
        const dataProjects = await resProjects.json();

        if (dataServices.success) setServices(dataServices.data.slice(0, 3));
        if (dataProjects.success) setProjects(dataProjects.data.slice(0, 2));
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Maharashtra Registered Energy Developer • CIN U70109PN2021PTC202308</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Powering Sustainable <br />
                <span className="text-gradient">Energy Infrastructure</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                Life Energy Infra Private Limited delivers turnkey Commercial Solar EPC, Battery Energy Storage Systems (BESS), and Smart Grid Substation solutions engineered for performance and decarbonization.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link to="/contact" className="btn-primary w-full sm:w-auto text-base gap-2">
                  Request Energy Audit <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/projects" className="btn-secondary w-full sm:w-auto text-base">
                  View Key Projects
                </Link>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">50+ MW</p>
                  <p className="text-xs text-slate-400 mt-1">Solar & Grid Capacity</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">99.8%</p>
                  <p className="text-xs text-slate-400 mt-1">System Reliability</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">100%</p>
                  <p className="text-xs text-slate-400 mt-1">Statutory Compliance</p>
                </div>
              </div>

            </div>

            {/* Hero Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 glass-panel">
                <img
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                  alt="Solar Infrastructure Project"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
                
                {/* Float Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Life Energy Infra Private Limited</h4>
                    <p className="text-xs text-slate-300">Registered Office: Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Overview Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Turnkey EPC Solutions</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  End-to-end solar engineering, module procurement, mounting structure design, and grid synchronizations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Battery className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Battery Storage (BESS)</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Next-generation battery energy storage for industrial peak shaving, demand management, and zero outage guarantees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Corporate Compliance</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Full statutory alignment under Ministry of Corporate Affairs, Maharashtra DISCOM approvals, and ISO safety standards.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Our Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Specialized Energy Services</h2>
          </div>
          <Link to="/services" className="mt-4 md:mt-0 text-sm font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl glass-card animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="p-6 rounded-2xl glass-card flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
                <Link to="/services" className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1 pt-2">
                  Learn Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-brand-900 via-navy-900 to-slate-900 border border-brand-500/30">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Upgrade Your Energy Infrastructure?
            </h2>
            <p className="text-slate-300 text-base">
              Consult with our senior energy infrastructure engineering team today for customized EPC proposals, ROI assessments, and site feasibility studies.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact" className="btn-primary">
                Schedule Consultation
              </Link>
              <a href="mailto:lifeenergyinfra@gmail.com" className="btn-secondary">
                Email: lifeenergyinfra@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
