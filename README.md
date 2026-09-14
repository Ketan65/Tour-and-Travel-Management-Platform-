# 🌍 WanderWave — Tour & Travel Management Platform

[![Git Flow](https://img.shields.io/badge/Git%20Branching-3--Tier%20Model-0284c7.svg)](#-git-branching-strategy)
[![Team](https://img.shields.io/badge/Team-4%20Members-10b981.svg)](#-4-member-team-allocation)
[![Frontend](https://img.shields.io/badge/Architecture-Modular%20Frontend-f59e0b.svg)](#-project-architecture)
[![License](https://img.shields.io/badge/License-MIT-6366f1.svg)](LICENSE)

> A modern, responsive, client-side **Tour and Travel Management Platform** built with modular HTML5, modern CSS3, and JavaScript. Designed with a robust **4-member collaborative Git workflow** to eliminate merge conflicts and streamline parallel development.

---

## 📸 Core Features & Highlights

- **✨ Dynamic Tour Catalog**: Filter tours by destination, price, category (Adventure, Beach, Cultural, Honeymoon), and rating.
- **🗺️ Day-wise Itinerary & Details**: Comprehensive tour overview, included amenities, interactive itinerary timeline, and user reviews.
- **⚡ Instant Quick Booking Modal**: Seamless modal booking flow with real-time price calculation, traveler counter, and date picker.
- **🔐 Client-Side Authentication**: Registration, Login, Form Validation, and Mock Session storage (`localStorage`).
- **📊 Traveler Dashboard**: Manage personal profile, view upcoming & completed bookings, cancel reservations, and preview digital tickets/vouchers.
- **📱 Fully Responsive**: Pixel-perfect layout across Ultra-wide, Desktop, Tablet, and Mobile screens.

---

## 👥 4-Member Team Allocation & Branch Architecture

This project strictly adheres to the **4-Member Collaboration Guide** (`git_github_4_member_project_collaboration_guide.docx`). To avoid merge conflicts, each member owns dedicated modules and branches:

| Member | Specialization & Responsibility | Feature Branch | Dedicated Codebase Files |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Authentication & Security UI**<br>• Login & Sign-up forms<br>• Form validation & errors<br>• Session handling (`localStorage`) | `feature/auth` | • [`pages/auth.html`](pages/auth.html)<br>• [`assets/css/modules/auth.css`](assets/css/modules/auth.css)<br>• [`assets/js/modules/auth.js`](assets/js/modules/auth.js) |
| **Member 2** | **User Profile & Bookings Dashboard**<br>• Profile details editor<br>• "My Bookings" management<br>• Digital voucher preview<br>• Reservation status tracking | `feature/user` | • [`pages/dashboard.html`](pages/dashboard.html)<br>• [`assets/css/modules/dashboard.css`](assets/css/modules/dashboard.css)<br>• [`assets/js/modules/dashboard.js`](assets/js/modules/dashboard.js) |
| **Member 3** | **Main Business: Tours Catalog & Itineraries**<br>• Tour package listing & cards<br>• Destination & price filter engine<br>• Tour detail page & day-wise timeline<br>• Customer ratings & review section | `feature/product` | • [`pages/tours.html`](pages/tours.html)<br>• [`pages/tour-details.html`](pages/tour-details.html)<br>• [`assets/css/modules/tours.css`](assets/css/modules/tours.css)<br>• [`assets/js/modules/tours.js`](assets/js/modules/tours.js)<br>• [`assets/js/data/tours-data.js`](assets/js/data/tours-data.js) |
| **Member 4** | **Core UI & Landing Page (Team Lead)**<br>• Navigation header & mobile drawer<br>• Hero banner with quick search<br>• Trending destinations & testimonials<br>• Global design system & checkout modal | `feature/frontend` | • [`index.html`](index.html)<br>• [`assets/css/style.css`](assets/css/style.css)<br>• [`assets/css/components.css`](assets/css/components.css)<br>• [`assets/js/main.js`](assets/js/main.js) |

---

## 🌳 Git Branching Strategy

Our team utilizes a **3-tier Git Flow**:

```text
       main (Production Stable Submission)
        ▲
        │  (Final Release PR: dev ➔ main)
        │
       dev  (Team Integration & Peer Review)
        ▲
        ├── feature/auth        (Member 1 ➔ PR ➔ dev)
        ├── feature/user        (Member 2 ➔ PR ➔ dev)
        ├── feature/product     (Member 3 ➔ PR ➔ dev)
        └── feature/frontend    (Member 4 ➔ PR ➔ dev)
```

> 📖 For full step-by-step instructions on cloning, branch creation, daily checklists, conflict resolution, and PR guidelines, read the **[`GIT_COLLABORATION_GUIDE.md`](GIT_COLLABORATION_GUIDE.md)**.

---

## 📂 Project Directory Structure

```text
tour-travel-management/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── 01_feature_request.md
│   │   ├── 02_bug_report.md
│   │   └── 03_member_task.md
│   ├── workflows/
│   │   └── ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── assets/
│   ├── css/
│   │   ├── base.css              # Global styles, CSS reset, typography
│   │   ├── components.css        # Buttons, cards, badges, modals, toast
│   │   ├── style.css             # Main landing & layout styling (Member 4)
│   │   └── modules/
│   │       ├── auth.css          # Auth styling (Member 1)
│   │       ├── dashboard.css     # Dashboard styling (Member 2)
│   │       └── tours.css         # Tours catalog styling (Member 3)
│   └── js/
│       ├── main.js               # Global UI, navbar, modal controller (Member 4)
│       ├── data/
│       │   └── tours-data.js     # Rich mock datasets (tours, bookings, users)
│       └── modules/
│           ├── auth.js           # Auth logic & localStorage (Member 1)
│           ├── dashboard.js      # Booking history & profile (Member 2)
│           └── tours.js          # Catalog filtering & booking modal (Member 3)
├── pages/
│   ├── auth.html                 # Login & Registration page (Member 1)
│   ├── dashboard.html            # Profile & Bookings Dashboard (Member 2)
│   ├── tours.html                # Tours Catalog & Filters (Member 3)
│   └── tour-details.html         # Day-wise Itinerary & Details (Member 3)
├── index.html                    # Main Home Page (Member 4)
├── .gitignore                    # Git ignore file
├── package.json                  # Scripts & metadata
├── README.md                     # Project documentation
└── GIT_COLLABORATION_GUIDE.md    # Complete 24-step team manual
```

---

## ⚡ Quick Start & Execution

Since this is a client-side frontend project, you can run it without any heavy dependencies:

### Option 1: Double-Click / Direct Browser
Simply double-click `index.html` to launch the platform in your browser.

### Option 2: Live Server (VS Code)
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

### Option 3: Node / NPX Serve
```bash
# Clone the repository
git clone <repository-url>
cd tour-travel-management

# Run local development server
npm start
# or: npx serve -l 3000 .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Team Collaboration Rules

1. ❌ **No direct push to `main` or `dev`**.
2. 🔀 All feature branches must branch off from the latest `dev`.
3. 🎯 Pull Requests must always target `dev`.
4. 🔍 Every PR requires review and approval by at least one teammate.
5. 🔐 Never commit API secrets, `.env`, or passwords.
