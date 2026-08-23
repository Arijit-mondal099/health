<div align="center">

<img src="apps/web/public/favicon.svg" alt="Health Logo" width="80" />

# Health

### Book a doctor online in minutes — and give your clinic one place to run the entire operation.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/Arijit-mondal099/health)](https://github.com/Arijit-mondal099/health/commits/main)

| [About](#-about) | [Who It's For](#-who-its-for) | [Features](#-features) |
| :---: | :---: | :---: |
| [How an Appointment Works](#-how-an-appointment-works) | [Under the Hood](#-under-the-hood) | [Contributing](#-contributing) |

</div>

---

## About

Booking a doctor's visit still starts with a phone call at most clinics. Appointment slots live in diaries and in someone's head, payments happen at the counter, doctors track their schedules by hand, and nobody has a clear picture of the day until it's over.

**Health replaces that with one platform:**

- **Patients** discover doctors, pick a free slot, and book and pay online — no phone call required.
- **Doctors** get a personal dashboard for their schedule, earnings and availability.
- **Clinic owners** run everything from one screen — onboarding doctors, overseeing appointments, reading the numbers.

The project is open source and self-hostable: a complete, working example of what a modern healthcare booking platform looks like end to end.

---

## Who It's For

| | What they get |
| :--- | :--- |
| **Patients** | Find the right doctor by speciality, see fees up front, book a slot in a few clicks, pay online, and keep every visit in one place. |
| **Doctors** | Today's schedule, earnings and patient stats at a glance — plus full control over their public profile and whether they're accepting bookings. |
| **Clinic admins** | Onboard doctors, oversee every appointment, cancel on behalf of patients, and follow clinic-wide trends from one dashboard. |

---

## Features

**For patients**
- Browse doctors by speciality — photos, qualifications, experience and consultation fees up front
- Pick any of the next 7 days and grab a free 30-minute slot; booked slots are hidden automatically
- Book instantly, then pay securely online via Razorpay whenever it suits
- Track every appointment with clear Paid · Completed · Cancelled statuses — cancelling frees the slot for someone else
- Manage your profile, including avatar upload

**For doctors**
- A personal dashboard: earnings, appointment and patient counts, with charts over time
- Mark appointments complete or cancel them as the day unfolds
- Keep your public profile current — photo, speciality, degree, experience, fees, address
- Step away anytime: flipping your availability off stops new bookings immediately

**For admins**
- Clinic-wide dashboard: doctor, appointment and patient counts, monthly booking trends, outcome breakdown, latest bookings
- Add new doctors with photo, fees and speciality in one form
- See and manage every appointment in the clinic
- Toggle any doctor's availability

**Everywhere**
- Separate, secure sign-in for each role
- Dark mode
- Mobile-first responsive UI

---

## How an Appointment Works

1. A patient creates an account and browses doctors by speciality.
2. They open a doctor's profile, pick a day and a free slot, and book — done in under a minute.
3. Payment happens afterwards from **My Appointments** through Razorpay's secure checkout.
4. The doctor sees the booking on their dashboard and marks it complete (or cancels it).
5. The admin dashboard reflects it all — volumes, outcomes and the latest bookings.

---

## Under the Hood

Health is a web platform built with React, Express and MongoDB, with online payments by [Razorpay](https://razorpay.com/) and image storage by [Cloudinary](https://cloudinary.com/).

<details>
<summary><strong>Run it locally</strong></summary>

You'll need Node.js ≥ 22, [Bun](https://bun.sh/), a MongoDB instance, and Cloudinary/Razorpay accounts.

```bash
git clone https://github.com/Arijit-mondal099/health.git
cd health
bun install

# one terminal each
bun run dev:api     # API                  → http://localhost:4000
bun run dev:web     # patient portal       → http://localhost:5173
bun run dev:admin   # admin/doctor console → http://localhost:5174
```

Create `.env` files with the following keys:

```env
# apps/api/.env
MONGODB_URI=mongodb://localhost:27017/health
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=…
CLOUDINARY_API_KEY=…
CLOUDINARY_API_SECRET=…
RAZORPAY_KEY_ID=…
RAZORPAY_KEY_SECRET=…

# apps/web/.env and apps/admin/.env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=…   # web only
```

The admin login page comes with demo credentials pre-filled, so you can look around both consoles immediately.

</details>

---

## Contributing

Contributions are welcome! The repo enforces [Conventional Commits](https://www.conventionalcommits.org/) via git hooks — create a branch, commit with a conventional message (e.g. `feat: add appointment reminders`), and open a pull request.

---

## License

Distributed under the [MIT License](./LICENSE). © 2024 Arijit Mondal.
