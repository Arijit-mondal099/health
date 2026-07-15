[← Back to root README](../../README.md)

<div align="center">

# @health/api

### The Express 5 REST backend powering the **Health** platform — auth, doctors, appointments, payments.

[![Express](https://img.shields.io/badge/Express-5-000000.svg)](https://expressjs.com/)
[![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000.svg)](https://jwt.io/)
[![Port](https://img.shields.io/badge/port-4000-2ea44f.svg)](http://localhost:4000)

</div>

---

## 📖 Overview

`@health/api` is the **Express 5 REST API** of the Health monorepo. It handles authentication for three roles (patient, doctor, admin), doctor & appointment management, Cloudinary media uploads, and Razorpay payments. Requests are validated with shared Zod schemas from `@health/core` and return a consistent `ApiResponse` shape.

Part of the [`health`](../../README.md) monorepo:

| App / Package | Description |
| :--- | :--- |
| [`apps/web`](../web) | Patient portal |
| [`apps/admin`](../admin) | Doctor / admin dashboard |
| `apps/api` (this) | Express REST API |
| [`packages/core`](../../packages/core) | Shared framework-agnostic code |
| [`packages/ui`](../../packages/ui) | Shared shadcn/ui components |

## ✨ Features

- 🔐 JWT auth for patients, doctors, and admins
- 🛡 Role-based middleware (`authUser` / `authDoctor` / `authAdmin` + `authorisation`)
- 🩺 CRUD-style doctor & appointment flows
- 🖼 Multer + Cloudinary image uploads
- 💳 Razorpay online payment init & verification
- 🧪 Zod request validation (`validateBody`)
- 🧰 Centralized error handling (`ApiResponse` + `errorHandler`)

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| Runtime | Node.js ≥ 22 |
| Server | Express 5 |
| Database | MongoDB + Mongoose 8 |
| Auth | jsonwebtoken, bcrypt |
| Validation | Zod (via `@health/core/schemas`) |
| Media | Multer, Cloudinary |
| Payments | Razorpay |
| Utils | validator, dotenv, cors |

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 22 and [Bun](https://bun.sh/)
- A MongoDB instance (local or Atlas)
- Cloudinary & Razorpay credentials

### Install & Run

```bash
# from repo root
bun install
bun run dev:api     # nodemon, http://localhost:4000
```

Or within this package:

```bash
bun install
bun run dev         # nodemon src/index.js
bun run start       # node src/index.js (production)
```

## 🔑 Environment Variables

Create `apps/api/.env`:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/health
JWT_SECRET=your_super_secret_key
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

| Variable | Description |
| :--- | :--- |
| `PORT` | Listen port (default `4000`). |
| `MONGODB_URI` | MongoDB connection string. |
| `JWT_SECRET` / `JWT_EXPIRY` | JWT signing secret & lifetime. |
| `CLOUDINARY_*` | Cloudinary credentials for media. |
| `RAZORPAY_*` / `CURRENCY` | Razorpay credentials & currency. |

## 🔌 API Reference

Base URL: `http://localhost:4000/api/v1`

### `/api/v1/users`
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| POST | `/register` | — | Register patient (Zod-validated). |
| POST | `/login` | — | Patient login. |
| GET | `/` | User | Current user. |
| PATCH | `/update-profile` | User | Update profile + avatar. |
| POST | `/book-appointment` | User | Book appointment. |
| GET | `/appointments` | User | User's appointments. |
| GET | `/cancel-appointment/:appointmentId` | User | Cancel appointment. |
| POST | `/online-payment` | User | Initiate Razorpay payment. |
| POST | `/valid-payment` | User | Verify payment. |

### `/api/v1/doctors`
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| GET | `/` | — | List doctors. |
| POST | `/login` | — | Doctor login. |
| GET | `/appointments` | Doctor | Doctor appointments. |
| PATCH | `/complete-appointment` | Doctor | Complete appointment. |
| PATCH | `/cancel-appointment` | Doctor | Cancel appointment. |
| GET | `/dashboard` | Doctor | Doctor metrics. |
| GET | `/profile` | Doctor | Doctor profile. |
| PATCH | `/update-profile` | Doctor | Update profile + photo. |

### `/api/v1/admin`
| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| POST | `/login` | — | Admin login. |
| POST | `/add-doctor` | Admin | Add doctor (photo). |
| GET | `/all-doctors` | Admin | List doctors. |
| PATCH | `/toggle-availblity` | Admin | Toggle availability. |
| GET | `/all-appointments` | Admin | List appointments. |
| GET | `/cancel-appointment/:appointmentId` | Admin | Cancel appointment. |
| GET | `/dashboard` | Admin | Clinic analytics. |

## 📁 Structure

```text
apps/api/
├── src/
│   ├── controllers/   # user, doctor, admin
│   ├── db/            # dbConnection.js
│   ├── middlewares/   # auth*, authorisation, validate, multer, error
│   ├── modles/        # user, doctor, appointment models (Mongoose)
│   ├── routes/        # user, doctor, admin routers
│   ├── utils/         # cloudinary, razorpay, ApiResponse
│   └── index.js       # app bootstrap, mounts /api/v1
└── package.json
```

## 📄 License

[MIT](../../LICENSE) © 2024 Arijit Mondal.
