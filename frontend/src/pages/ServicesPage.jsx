import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Battery, Zap, Cpu, ShieldCheck, Activity, ArrowRight, CheckCircle } from 'lucide-react';

const iconMap = {
  Sun: Sun,
  Battery: Battery,
  Zap: Zap,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
  Activity: Activity
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
          Core Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Energy Infrastructure Services</h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Comprehensive turnkey engineering, solar EPC, battery storage integration, and smart grid maintenance services for commercial and industrial clients.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-72 rounded-3xl glass-card animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComp = iconMap[service.icon] || Zap;
              return (
                <div key={service._id} className="p-8 rounded-3xl glass-card flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug">{service.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      Inquire For This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Service Assurance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Need a Custom Infrastructure Scope?</h3>
            <p className="text-sm text-slate-300">
              Our engineering team prepares detailed DPRs (Detailed Project Reports) tailored to your factory or utility layout.
            </p>
          </div>
          <Link to="/contact" className="btn-primary shrink-0">
            Consult Our Engineering Team
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;
