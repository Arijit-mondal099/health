<div align="center">

<img src="apps/web/src/assets/logo.png" alt="Health Logo" width="160" />

# Health

### A modern, full-stack SaaS platform that connects patients with doctors — book appointments, manage schedules, and power healthcare operations end to end.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Arijit-mondal099/health)
[![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg)](https://www.mongodb.com/)
[![Package Manager: Bun](https://img.shields.io/badge/package%20manager-Bun-000000.svg)](https://bun.sh/)
[![Last Commit](https://img.shields.io/github/last-commit/Arijit-mondal099/health)](https://github.com/Arijit-mondal099/health/commits/main)

| 🚀 [About](#-about) | ✨ [Features](#-features) | 🛠 [Tech Stack](#-tech-stack) | 📦 [Structure](#-project-structure) |
| :---: | :---: | :---: | :---: |
| ⚙️ [Getting Started](#-getting-started) | 🔑 [Env](#-environment-variables) | 📚 [Usage](#-usage) | 🧩 [Architecture](#-architecture) |
| 🔌 [API](#-api) | 🧪 [Scripts](#-scripts) | 🚀 [Deployment](#-deployment) | 🤝 [Contributing](#-contributing) |

</div>

---

## 🚀 About

**Health** is an open-source, full-stack healthcare SaaS that streamlines how patients discover doctors and book appointments, how doctors manage their schedules, and how administrators run the entire clinic operation.

- **Purpose** — Make doctor discovery and appointment booking effortless for patients while giving clinics a single dashboard to operate.
- **Target users** — Patients seeking care, doctors managing their practice, and clinic administrators/owners.
- **Main problem it solves** — Fragmented, phone-based scheduling and disconnected doctor/clinic tooling. Health unifies patient booking, doctor availability, payments, and admin analytics in one place.
- **Why it exists** — To provide a clean, modern, self-hostable reference architecture for healthcare appointment platforms built on a monorepo with shared, type-safe (Zod-validated) contracts.

---

## ✨ Features

- 🔐 **Tri-role authentication** — Patients, Doctors, and Admins, each with isolated auth flows.
- 👤 **Patient accounts** — Register, log in, manage profile with avatar upload.
- 🩺 **Doctor directory** — Browse doctors by speciality with search and filtering.
- 📅 **Appointment booking** — Book, view, and cancel appointments in a few clicks.
- 💳 **Online payments** — Secure Razorpay integration for paid appointments.
- 🖼 **Image uploads** — Cloudinary-backed avatar and doctor photo uploads via Multer.
- 📊 **Doctor dashboard** — Personal schedule, earnings, and appointment stats.
- 🛠 **Admin dashboard** — Clinic-wide analytics with charts (Recharts), doctor management.
- ➕ **Doctor onboarding** — Admins add doctors with photos and availability.
- 🔁 **Availability toggling** — Doctors/admins toggle bookable status instantly.
- 🧾 **Role-based access control** — Middleware-enforced authorization per role.
- 🌗 **Dark mode** — Themeable UI via `next-themes`.
- 📱 **Responsive UI** — Mobile-first design with Tailwind CSS v4.
- 🧪 **Schema validation** — Shared Zod schemas validate requests across the stack.
- 🔔 **Toasts & feedback** — Sonner-powered notifications.
- ⚡ **Modern DX** — Bun + Vite, `oxlint`/`oxfmt`, Husky + Commitlint.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 19, React Router v7, Vite |
| **Backend** | Express 5 (Node.js) |
| **Database** | MongoDB + Mongoose 8 |
| **Authentication** | JSON Web Tokens (jsonwebtoken), bcrypt |
| **State Management** | Redux Toolkit + Redux |
| **Styling** | Tailwind CSS v4, shadcn/ui (Radix UI), lucide-react |
| **Validation** | Zod (shared via `@health/core`) |
| **API** | REST (`/api/v1`) over Express |
| **ORM** | Mongoose |
| **Payments** | Razorpay |
| **Media** | Cloudinary + Multer |
| **Charts** | Recharts |
| **Package Manager** | Bun (npm workspaces) |
| **Tooling** | oxlint, oxfmt, Husky, Commitlint |
| **Deployment** | Docker, Render, Railway, Vercel (frontends) |

---

## 📦 Project Structure

```text
health/
├── apps/
│   ├── web/          # Patient portal SPA  (@health/web)        — port 5173
│   ├── admin/        # Doctor/Admin dashboard SPA (@health/admin) — port 5174
│   └── api/          # Express REST API    (@health/api)        — port 4000
├── packages/
│   ├── core/         # Framework-agnostic shared code (@health/core)
│   └── ui/           # Shared shadcn/ui source package (@health/ui)
├── .agents/          # Agent skills (shadcn, frontend-design, ...)
├── package.json      # Workspace root scripts
├── bun.lock          # Bun lockfile
├── AGENTS.md         # Repo conventions
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **Bun** (package manager / runtime)
- A **MongoDB** instance (local or Atlas)
- **Cloudinary** and **Razorpay** accounts (for media & payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Arijit-mondal099/health.git
   cd health
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure environment variables**

   Copy the example env files (see [Environment Variables](#-environment-variables)) into each app and fill them in.

4. **Run the development servers**

   The API must be running for the frontends to work. Start it in one terminal, then the web/admin apps in others:

   ```bash
   bun run dev:api     # API on http://localhost:4000
   bun run dev:web     # Patient portal on http://localhost:5173
   bun run dev:admin   # Admin dashboard on http://localhost:5174
   ```

### Production build

```bash
bun run build:web     # build patient portal
bun run build:admin   # build admin dashboard
bun run start:api     # run the API in production
```

### Preview

```bash
bun --cwd apps/web preview     # preview the web build
bun --cwd apps/admin preview   # preview the admin build
```

---

## 🔑 Environment Variables

Each app reads its own `.env`. Copy the relevant keys below into `apps/api/.env`, `apps/web/.env`, and `apps/admin/.env`.

<details open>
<summary><strong>apps/api/.env</strong></summary>

```env
# Server
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/health

# Auth
JWT_SECRET=your_super_secret_key
JWT_EXPIRY=7d

# Cloudinary (media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

| Variable | Description |
| :--- | :--- |
| `PORT` | Port the Express API listens on (default `4000`). |
| `MONGODB_URI` | Connection string for your MongoDB database. |
| `JWT_SECRET` | Secret used to sign/verify JWT auth tokens. |
| `JWT_EXPIRY` | Token lifetime (e.g. `7d`). |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for media storage. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `RAZORPAY_KEY_ID` | Razorpay public key id. |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key. |
| `CURRENCY` | Default currency code for payments (e.g. `INR`). |

</details>

<details open>
<summary><strong>apps/web/.env</strong> & <strong>apps/admin/.env</strong></summary>

```env
# API endpoint consumed by the SPA
VITE_BACKEND_URL=http://localhost:4000

# (web only) Razorpay key used in the browser for payments
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

| Variable | Description |
| :--- | :--- |
| `VITE_BACKEND_URL` | Base URL of the running API (must match the API's CORS origins). |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key id exposed to the browser for checkout. |

</details>

---

## 📚 Usage

1. Start the **API** (`bun run dev:api`) — it connects to MongoDB and serves `/api/v1`.
2. Open the **patient portal** at `http://localhost:5173`:
   - Register a patient account and log in.
   - Browse doctors by speciality and open a doctor profile.
   - Book an appointment and pay online via Razorpay.
   - View and cancel your appointments from "My Appointments".
3. Open the **admin dashboard** at `http://localhost:5174`:
   - Log in as admin and add doctors (with photo + fees + speciality).
   - Toggle doctor availability, review all appointments, and view analytics.
4. Doctors log in via the admin app to manage their schedule, complete or cancel appointments, and view their own dashboard.

---

## 🧩 Architecture

- **Folder organization** — A monorepo with three runnable apps (`web`, `admin`, `api`) and two shared packages (`core`, `ui`). Shared logic lives in `@health/core`; shared UI lives in `@health/ui` and is consumed directly (no build step).
- **Data flow** — SPAs call the Express API over REST. The API validates requests with shared Zod schemas from `@health/core`, talks to MongoDB via Mongoose, and returns a consistent `ApiResponse` shape (`status`, `success`, `message`, `response`).
- **API flow** — `index.js` mounts routers under `/api/v1/{users,doctors,admin}`. Auth middleware (`authUser`/`authDoctor`/`authAdmin`) attaches the principal; `authorisation` enforces admin scope; `validateBody` runs Zod validation; `errorHandler` normalizes errors.
- **Component structure** — Each SPA uses `pages/` for routes, `components/` for reusable UI, `features/<domain>/<domain>Slice.js` for Redux slices, and a `store/`. UI primitives come from `@health/ui`.
- **State management** — Redux Toolkit slices per domain, combined in `store/rootReducer.js`. `redux` is an explicit dependency.

---

## 🔌 API

Base URL: `http://localhost:4000/api/v1`

### Users (`/api/v1/users`)
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| POST | `/register` | — | Register a patient (Zod-validated). |
| POST | `/login` | — | Log in a patient. |
| GET | `/` | User | Get the current user. |
| PATCH | `/update-profile` | User | Update profile + avatar upload. |
| POST | `/book-appointment` | User | Book an appointment. |
| GET | `/appointments` | User | List the user's appointments. |
| GET | `/cancel-appointment/:appointmentId` | User | Cancel an appointment. |
| POST | `/online-payment` | User | Initiate Razorpay payment. |
| POST | `/valid-payment` | User | Verify a completed payment. |

### Doctors (`/api/v1/doctors`)
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| GET | `/` | — | List all doctors. |
| POST | `/login` | — | Doctor login. |
| GET | `/appointments` | Doctor | Doctor's appointments. |
| PATCH | `/complete-appointment` | Doctor | Mark appointment complete. |
| PATCH | `/cancel-appointment` | Doctor | Cancel an appointment. |
| GET | `/dashboard` | Doctor | Doctor dashboard metrics. |
| GET | `/profile` | Doctor | Doctor profile. |
| PATCH | `/update-profile` | Doctor | Update profile + photo. |

### Admin (`/api/v1/admin`)
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| POST | `/login` | — | Admin login. |
| POST | `/add-doctor` | Admin | Add a doctor (photo upload). |
| GET | `/all-doctors` | Admin | List all doctors. |
| PATCH | `/toggle-availblity` | Admin | Toggle doctor availability. |
| GET | `/all-appointments` | Admin | List all appointments. |
| GET | `/cancel-appointment/:appointmentId` | Admin | Cancel an appointment. |
| GET | `/dashboard` | Admin | Clinic-wide dashboard + analytics. |

---

## 🧪 Scripts

Run from the repo root with Bun:

| Script | Description |
| :--- | :--- |
| `bun run dev:web` | Start the patient portal dev server (Vite, port 5173). |
| `bun run dev:admin` | Start the admin dashboard dev server (Vite, port 5174). |
| `bun run dev:api` | Start the API with nodemon (port 4000). |
| `bun run build:web` | Production build of the patient portal. |
| `bun run build:admin` | Production build of the admin dashboard. |
| `bun run start:api` | Run the API in production (`node`). |
| `bun run format` | Format code with `oxfmt`. |
| `bun run format:check` | Check formatting with `oxfmt`. |
| `bun run lint` | Lint with `oxlint` (warnings are errors). |
| `bun run lint:fix` | Auto-fix lint issues. |
| `bun run prepare` | Install Husky git hooks. |

---

## 🚀 Deployment

<details>
<summary><strong>Docker</strong></summary>

Build and run the API as a container. Example `Dockerfile` (API):

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build:api
EXPOSE 4000
CMD ["bun", "run", "start:api"]
```

</details>

<details>
<summary><strong>Render / Railway</strong></summary>

Deploy `apps/api` as a web service:

- **Build command:** `bun install && bun run build:api`
- **Start command:** `bun run start:api`
- **Port:** `4000`
- Add the `apps/api/.env` variables in the dashboard.

</details>

<details>
<summary><strong>Vercel (frontends)</strong></summary>

Deploy `apps/web` and `apps/admin` as Vite static apps:

- **Framework preset:** Vite
- **Build command:** `bun install && bun run build:web` (or `build:admin`)
- **Output directory:** `apps/web/dist` (or `apps/admin/dist`)
- Set `VITE_BACKEND_URL` to your deployed API URL.

</details>

---

## 🤝 Contributing

Contributions are welcome! This repo enforces **Conventional Commits** and lint-on-commit via Husky.

1. Fork the repo and create your branch: `git checkout -b feat/my-change`.
2. Install dependencies: `bun install`.
3. Make your changes; ensure `bun run lint` and `bun run format:check` pass.
4. Commit with a conventional message (e.g. `feat: add appointment reminders`).
5. Open a pull request describing your change.

---

## 📄 License

Distributed under the [MIT License](./LICENSE). © 2024 Arijit Mondal.
