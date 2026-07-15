[← Back to root README](../../README.md)

<div align="center">

# @health/admin

### Doctor & clinic-admin dashboard for the **Health** platform — manage doctors, appointments, and analytics.

[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8.svg)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-FF6384.svg)](https://recharts.org/)
[![Port](https://img.shields.io/badge/port-5174-2ea44f.svg)](http://localhost:5174)

</div>

---

## 📖 Overview

`@health/admin` is the **doctor/admin single-page application** of the Health monorepo. Clinic administrators add and manage doctors, review all appointments, and view clinic-wide analytics; doctors log in to manage their schedule and view their own dashboard.

Part of the [`health`](../../README.md) monorepo:

| App / Package | Description |
| :--- | :--- |
| [`apps/web`](../web) | Patient portal |
| `apps/admin` (this) | Doctor / admin dashboard |
| [`apps/api`](../api) | Express REST API |
| [`packages/core`](../../packages/core) | Shared framework-agnostic code |
| [`packages/ui`](../../packages/ui) | Shared shadcn/ui components |

## ✨ Features

- 🔐 Separate doctor & admin login flows (JWT)
- ➕ Add doctors with photo, fees, speciality & availability
- 📋 Appointment tables with status, complete / cancel actions
- 📊 Admin dashboard with Recharts analytics
- 🩺 Doctor dashboard (schedule, earnings, stats)
- 🔁 Toggle doctor availability
- 🌗 Dark mode (`next-themes`)
- 📱 Responsive layout with sidebar + navbar

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| UI | React 19, React Router v7 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4, `@health/ui` (shadcn/ui), lucide-react |
| State | Redux Toolkit + Redux |
| Charts | Recharts |
| Data | Axios → `apps/api` REST (`/api/v1/doctors`, `/api/v1/admin`) |
| Feedback | Sonner toasts |

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 22 and [Bun](https://bun.sh/)
- The [`apps/api`](../api) service running (default `http://localhost:4000`)

### Install & Run

```bash
# from repo root
bun install
bun run dev:admin   # http://localhost:5174
```

Or within this package:

```bash
bun install
bun run dev         # vite
```

## 🔑 Environment Variables

Create `apps/admin/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

| Variable | Description |
| :--- | :--- |
| `VITE_BACKEND_URL` | Base URL of the API (must match API CORS origins). |

## 🧪 Scripts

| Script | Description |
| :--- | :--- |
| `bun run dev` | Start Vite dev server (port 5174). |
| `bun run build` | Production build to `dist/`. |
| `bun run preview` | Preview the production build. |

## 📁 Structure

```text
apps/admin/
├── src/
│   ├── assets/        # Logo, icons
│   ├── components/    # Sidebar, Navbar, AppointmentsTable, ...
│   ├── features/      # Redux slices (admin, doctor)
│   ├── pages/
│   │   ├── admin/     # Dashboard, DoctorsList, AddDoctor, Appointments
│   │   └── doctor/    # DoctorDashboard, DoctorAppointments, DoctorProfile
│   ├── store/         # Redux store + rootReducer
│   ├── theme/         # ThemeProvider
│   ├── utils/         # date/age converters, chart helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css      # imports @health/ui globals
└── package.json
```

## 📄 License

[MIT](../../LICENSE) © 2024 Arijit Mondal.
