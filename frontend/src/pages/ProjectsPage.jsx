import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Zap, Tag, ExternalLink } from 'lucide-react';
import { safeFetchJson } from '../utils/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await safeFetchJson('/api/projects');
        if (data.success) {
          setProjects(data.data);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'Solar EPC', 'Grid Infrastructure', 'EV Charging', 'Energy Storage'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags && p.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
          Track Record
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Featured Energy Projects</h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Showcase of completed and active solar PV installations, sub-station commissioning, and energy storage implementations across Maharashtra.
        </p>
      </div>

      {/* Tag Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-80 rounded-3xl glass-card animate-pulse"></div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl">
            <p className="text-slate-400">No projects found for category "{activeFilter}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project._id} className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {project.capacity && (
                    <div className="absolute top-4 right-4 bg-navy-950/90 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      {project.capacity}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" />
                      {project.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags && project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProjectsPage;
