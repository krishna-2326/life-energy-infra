import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, MapPin, ShieldCheck, Lock, ExternalLink, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Zap className="w-5 h-5 fill-current text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                LIFE ENERGY INFRA
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-300">
              Transforming India's power landscape with cutting-edge solar EPC, utility-scale battery energy storage, and resilient smart grid infrastructure.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-md w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>CIN: U70109PN2021PTC202308</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-base">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Home Overview</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Company & Leadership</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Infrastructure Services</Link></li>
              <li><Link to="/projects" className="hover:text-brand-400 transition-colors">Project Showcase</Link></li>
              <li><Link to="/careers" className="hover:text-brand-400 transition-colors">Careers & Internships</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact & Site Locations</Link></li>
            </ul>
          </div>

          {/* Column 3: Registered Office */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-base">Registered Office</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Registered Office: Pune, Maharashtra, India - 411001. Registered under ROC Pune (CIN: U70109PN2021PTC202308).
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <a href="mailto:lifeenergyinfra@gmail.com" className="text-slate-300 hover:text-brand-400 transition-colors">
                  lifeenergyinfra@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Connect & Admin Portal */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-white text-base">Connect With Us</h4>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <div className="pt-4 border-t border-slate-800/80">
              <Link to="/admin/login" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-brand-400 transition-colors bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" />
                Admin CMS Portal Login
              </Link>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Life Energy Infra Private Limited. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Registered in Maharashtra, India • CIN: U70109PN2021PTC202308
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
