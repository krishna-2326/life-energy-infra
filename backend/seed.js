require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin = require('./models/Admin');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Career = require('./models/Career');
const TeamMember = require('./models/TeamMember');
const ContactSubmission = require('./models/ContactSubmission');
const Application = require('./models/Application');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/life_energy_db';
    console.log(`[Seed] Connecting to database: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing collections...');
    await Admin.deleteMany({});
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Career.deleteMany({});
    await TeamMember.deleteMany({});
    await ContactSubmission.deleteMany({});
    await Application.deleteMany({});

    // 1. Seed Admin User
    const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'lifeenergyinfra@gmail.com').toLowerCase().trim();
    const rawPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123456';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await Admin.create({
      email: adminEmail,
      password: hashedPassword,
      name: 'Life Energy Admin',
      role: 'admin'
    });
    console.log(`[Seed] Default Admin Created -> Email: ${adminEmail}`);

    // 2. Seed Energy Infrastructure Services
    const services = [
      {
        title: 'Commercial Solar PV Turnkey Solutions',
        description: 'Design, engineering, procurement, and construction (EPC) of rooftop and ground-mounted utility-scale solar PV installations across industrial hubs.',
        icon: 'Sun',
        order: 1,
        isActive: true
      },
      {
        title: 'Industrial Energy Storage Systems (BESS)',
        description: 'Advanced Battery Energy Storage Systems providing peak shaving, grid stability, and reliable backup power for continuous manufacturing facilities.',
        icon: 'Battery',
        order: 2,
        isActive: true
      },
      {
        title: 'Smart Substation & Grid Development',
        description: 'End-to-end electrical high-voltage substation engineering, transmission line setup, and distribution network modernizations.',
        icon: 'Zap',
        order: 3,
        isActive: true
      },
      {
        title: 'EV Charging Infrastructure Networks',
        description: 'Deployment of fast DC charging hubs and smart fleet charging stations for commercial enterprise fleets and highway corridors.',
        icon: 'Cpu',
        order: 4,
        isActive: true
      },
      {
        title: 'Corporate Energy Audit & Advisory',
        description: 'Comprehensive ISO-compliant energy audits, power quality analysis, decarbonization roadmaps, and statutory energy compliance consulting.',
        icon: 'ShieldCheck',
        order: 5,
        isActive: true
      },
      {
        title: 'Microgrid & Hybrid Micro-generation',
        description: 'Custom hybrid renewable microgrid integration combining solar PV, wind, biomass, and automated generator sync systems.',
        icon: 'Activity',
        order: 6,
        isActive: true
      }
    ];

    await Service.insertMany(services);
    console.log(`[Seed] Seeded ${services.length} energy services.`);

    // 3. Seed Projects Showcase
    const projects = [
      {
        title: '5 MW Rooftop SolarEPC - Chakan Industrial Area',
        description: 'Engineered and commissioned a 5 MW captive rooftop solar PV array for a major automotive component manufacturing unit in Pune.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        date: 'Q3 2023',
        location: 'Chakan, Pune, Maharashtra',
        capacity: '5.2 MWp',
        tags: ['Solar EPC', 'Rooftop', 'Automotive Sector'],
        featured: true
      },
      {
        title: 'High Voltage 33kV Substation Infrastructure',
        description: 'Turnkey development of 33kV switching station and underground power cable network for a 50-acre logistics park.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
        date: 'Q1 2024',
        location: 'Taloja, Navi Mumbai, Maharashtra',
        capacity: '33 kV Transmission',
        tags: ['Grid Infrastructure', 'Substation', 'High Voltage'],
        featured: true
      },
      {
        title: 'Smart EV Supercharging Hub',
        description: 'Constructed a multi-bay 240kW DC Ultra-Fast EV Charging Station along the Mumbai-Pune Expressway.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        date: 'Q2 2024',
        location: 'Expressway Corridor, Maharashtra',
        capacity: '800 kW Total Hub Power',
        tags: ['EV Charging', 'Clean Mobility', 'Fast DC Chargers'],
        featured: true
      },
      {
        title: 'Industrial Battery Energy Storage Integration',
        description: '2 MWh LiFePO4 battery storage installation integrated with existing thermal power system to reduce peak demand charges.',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
        date: 'Q4 2023',
        location: 'Waluj MIDC, Aurangabad, Maharashtra',
        capacity: '2.4 MWh BESS',
        tags: ['Energy Storage', 'BESS', 'Peak Shaving'],
        featured: false
      }
    ];

    await Project.insertMany(projects);
    console.log(`[Seed] Seeded ${projects.length} portfolio projects.`);

    // 4. Seed Careers / Internship Listings
    const careers = [
      {
        title: 'Graduate Engineer Trainee - Solar & Electrical Infrastructure',
        type: 'Full-time',
        location: 'Pune, Maharashtra',
        department: 'Electrical Engineering',
        description: 'We are seeking passionate Electrical Engineering graduates to assist in solar PV system design, AutoCAD drafting, single-line diagrams (SLD), and site installation supervision.',
        requirements: [
          'B.E. / B.Tech in Electrical or Energy Engineering (2023/2024 batch)',
          'Familiarity with AutoCAD, PVSyst, or Helioscope design tools',
          'Strong understanding of electrical standards (IS/IEC codes)',
          'Willingness to travel for site quality inspections across Maharashtra'
        ],
        isActive: true
      },
      {
        title: 'Renewable Energy Project Management Intern',
        type: 'Internship',
        location: 'Pune (Hybrid)',
        department: 'Project Management & Procurement',
        description: '6-month internship focused on project scheduling, vendor co-ordination, bill of materials (BOM) verification, and statutory approvals.',
        requirements: [
          'Currently pursuing B.E./B.Tech/MBA in Energy Management',
          'Good command over MS Excel and project scheduling tools',
          'Strong communication skills in English, Hindi, and Marathi',
          'Immediate availability for a 6-month full-time internship'
        ],
        isActive: true
      },
      {
        title: 'Site Safety & Quality Control Specialist',
        type: 'Full-time',
        location: 'Ranjangaon / Chakan, Maharashtra',
        department: 'HSE & Operations',
        description: 'Responsible for health, safety, and environment (HSE) standards compliance across live electrical infrastructure site executions.',
        requirements: [
          'Diploma/Degree in Industrial Safety / HSE',
          '2+ years experience in electrical/construction project sites',
          'Knowledge of OSHA & Indian Factory Act compliance'
        ],
        isActive: true
      }
    ];

    await Career.insertMany(careers);
    console.log(`[Seed] Seeded ${careers.length} job/internship postings.`);

    // 5. Seed Leadership & Directors
    const team = [
      {
        name: 'Managing Director / Director',
        designation: 'Director & Executive Chairman',
        bio: 'Leading strategic vision and infrastructure investments for Life Energy Infra Private Limited across Maharashtra renewable projects.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        linkedin: 'https://linkedin.com',
        order: 1
      },
      {
        name: 'Director - Technical & Operations',
        designation: 'Director of Engineering',
        bio: 'Over 15 years of expertise in high-voltage power distribution, solar EPC management, and grid compliance.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        linkedin: 'https://linkedin.com',
        order: 2
      }
    ];

    await TeamMember.insertMany(team);
    console.log(`[Seed] Seeded ${team.length} leadership entries.`);

    // 6. Seed Sample Contact & Application Submissions
    await ContactSubmission.create({
      name: 'Vikram Joshi',
      email: 'vikram.joshi@industrialcorp.in',
      phone: '+91 98220 12345',
      subject: 'Inquiry for 2 MW Rooftop Solar EPC',
      message: 'Hello Life Energy Infra team, we are looking to install a 2 MW captive solar array on our manufacturing facility in Bhosari MIDC. Kindly send an estimation.',
      status: 'New'
    });

    await Application.create({
      name: 'Aarav Sharma',
      email: 'aarav.sharma@gmail.com',
      phone: '+91 97654 32109',
      positionAppliedFor: 'Renewable Energy Project Management Intern',
      resumeLink: 'https://drive.google.com/file/d/sample-resume-aarav/view',
      message: 'Respected Hiring Manager, I am a final-year B.Tech Electrical student at COEP Pune with deep interest in solar EPC project scheduling.',
      status: 'New'
    });

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedDB();
