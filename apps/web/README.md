[← Back to root README](../../README.md)

<div align="center">

# @health/web

### Patient portal SPA for the **Health** platform — discover doctors, book appointments, and manage your care.

[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8.svg)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/State-Redux%20Toolkit-764ABC.svg)](https://redux-toolkit.js.org/)
[![Port](https://img.shields.io/badge/port-5173-2ea44f.svg)](http://localhost:5173)

</div>

---

## 📖 Overview

`@health/web` is the **patient-facing single-page application** of the Health monorepo. It lets patients register, browse doctors by speciality, book and pay for appointments, and manage their profile — all talking to the shared Express API.

Part of the [`health`](../../README.md) monorepo:

| App / Package | Description |
| :--- | :--- |
| `apps/web` (this) | Patient portal |
| [`apps/admin`](../admin) | Doctor / admin dashboard |
| [`apps/api`](../api) | Express REST API |
| [`packages/core`](../../packages/core) | Shared framework-agnostic code |
| [`packages/ui`](../../packages/ui) | Shared shadcn/ui components |

## ✨ Features

- 🔐 Patient registration & login (JWT)
- 🩺 Doctor directory with speciality menu & search
- 📅 Appointment booking + Razorpay online payment
- 👤 Profile management with avatar upload
- 📋 "My Appointments" with cancel
- 🌗 Dark mode (`next-themes`)
- 📱 Fully responsive, mobile-first UI

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| UI | React 19, React Router v7 |
| Build | Vite 6 |
| Styling | Tailwind CSS v4, `@health/ui` (shadcn/ui), lucide-react |
| State | Redux Toolkit + Redux |
| Data | Axios → `apps/api` REST (`/api/v1/users`) |
| Feedback | Sonner toasts |

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 22 and [Bun](https://bun.sh/)
- The [`apps/api`](../api) service running (default `http://localhost:4000`)

### Install & Run

```bash
# from repo root
bun install
bun run dev:web      # http://localhost:5173
```

Or within this package:

```bash
bun install
bun run dev          # vite
```

## 🔑 Environment Variables

Create `apps/web/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

| Variable | Description |
| :--- | :--- |
| `VITE_BACKEND_URL` | Base URL of the API (must match API CORS origins). |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key id for browser checkout. |

## 🧪 Scripts

| Script | Description |
| :--- | :--- |
| `bun run dev` | Start Vite dev server (port 5173). |
| `bun run build` | Production build to `dist/`. |
| `bun run preview` | Preview the production build. |

## 📁 Structure

```text
apps/web/
├── src/
│   ├── assets/        # Images, icons, SVGs
│   ├── components/    # Navbar, Header, Footer, DoctorCard, ...
│   ├── features/      # Redux slices (user, doctor)
│   ├── pages/         # Home, Doctors, Appointment, Login, ...
│   ├── store/         # Redux store + rootReducer
│   ├── theme/         # ThemeProvider
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css      # imports @health/ui globals
└── package.json
```

## 📄 License

[MIT](../../LICENSE) © 2024 Arijit Mondal.
