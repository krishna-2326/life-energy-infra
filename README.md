# Life Energy Infra Private Limited - Corporate Website & CMS

Official full-stack corporate web application and lightweight Content Management System (CMS) built for **Life Energy Infra Private Limited** (CIN: `U70109PN2021PTC202308`), an energy infrastructure company registered in Maharashtra, India.

---

## ⚡ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router DOM v6
- **Backend**: Node.js, Express.js, JWT (JSON Web Tokens), Bcryptjs, Nodemailer
- **Database**: MongoDB & Mongoose ODM
- **Deployment Targets**: Standard Node.js Hosting (Render / Railway / Heroku) + MongoDB Atlas

---

## 📁 Repository Structure

```
life-energy-infra/
├── .gitignore
├── backend/
│   ├── config/db.js                 # MongoDB connection logic
│   ├── middleware/authMiddleware.js # JWT authentication guard
│   ├── models/                      # Admin, Service, Project, Career, Application, Contact, Team
│   ├── routes/                      # REST API endpoints
│   ├── utils/email.js               # Nodemailer email alert helper
│   ├── seed.js                      # Database seeder script
│   ├── server.js                    # Express entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/              # Navbar, Footer, ProtectedAdmin
│   │   ├── context/AuthContext.jsx  # Admin authentication state & token persistence
│   │   ├── pages/                   # Home, About, Services, Projects, Careers, Contact
│   │   └── pages/admin/             # Login, Dashboard, Services CMS, Projects CMS, Careers CMS, Team CMS, Inquiries, Applications
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start & Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) OR a valid MongoDB Atlas connection URI string.

---

### Step 1: Install Dependencies

#### 1. Backend Dependencies
```bash
cd backend
npm install
```

#### 2. Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

### Step 2: Configure Environment Variables

Create `.env` inside `/backend`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/life_energy_db
JWT_SECRET=super_secret_jwt_key_life_energy_infra_2026_change_in_production
JWT_EXPIRES_IN=7d
ADMIN_DEFAULT_EMAIL=admin@lifeenergyinfra.com
ADMIN_DEFAULT_PASSWORD=Admin@123456
COMPANY_EMAIL=lifeenergyinfra@gmail.com
CLIENT_URL=http://localhost:5173
```

---

### Step 3: Seed Initial Data & Create Admin Account

Run the seeder script from `/backend` to populate initial services, projects, careers, leadership profiles, and default admin account:

```bash
cd backend
npm run seed
```

**Default Admin Logins:**
- **Email:** `admin@lifeenergyinfra.com`
- **Password:** `Admin@123456` *(configurable via `ADMIN_DEFAULT_PASSWORD` in `.env`)*

---

### Step 4: Launch Development Servers

#### Option A: Terminal 1 (Backend API)
```bash
cd backend
npm run dev
# Express server listening on http://localhost:5000
```

#### Option B: Terminal 2 (Frontend React App)
```bash
cd frontend
npm run dev
# Vite server listening on http://localhost:5173
```

---

## 🔐 Admin Panel & CMS Routes

Access the CMS Admin Panel at:
👉 **`http://localhost:5173/admin`**

- **Secure Login**: JWT token stored in `localStorage`
- **Dashboard**: High-level counter for contact inquiries, job applications, active services, and open positions.
- **Services CMS**: Create, update, re-order, or disable energy infrastructure services.
- **Projects CMS**: Showcase turnkey solar EPC, battery storage, and high-voltage substation projects.
- **Careers CMS**: Post graduate engineer trainee and internship openings.
- **Leadership CMS**: Manage director profiles and board members on the About page.
- **Inquiries Inbox**: View customer inquiries with interactive status selectors (`New`, `Read`, `Responded`).
- **Applications Inbox**: Manage applicant resumes, inspect cover notes, and update candidate hiring status.

---

## 🌐 Production Deployment Guide

### Backend Deployment (Render / Railway)
1. Push project to GitHub (verifying `.env` is ignored).
2. Create a **Web Service** on Render or Railway, pointing to `/backend`.
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Configure Environment Variables in host panel: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
6. Run `npm run seed` once via task runner/terminal to initialize database.

### Frontend Deployment (Render / Vercel / Netlify)
1. Create a **Static Site** pointing to `/frontend`.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Ensure rewrite rule routes all requests (`/*`) to `/index.html` for single-page React router navigation.

---

## 🏢 Corporate Details

- **Company Name**: Life Energy Infra Private Limited
- **CIN**: `U70109PN2021PTC202308`
- **State**: Maharashtra, India (ROC Pune)
- **Official Email**: `lifeenergyinfra@gmail.com`
