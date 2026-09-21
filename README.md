# 🌍 Wanderly — Travel and Tour Management Platform

A multi-page front-end travel booking website that brings destinations, tour
packages, hotels, transportation, and trip booking together into one
connected browsing and booking experience.

> **Academic Project** — B.Tech CSE, 3rd Year
> Department of Computer Engineering Application, GLA University, Mathura
> Under the supervision of **Mr. Akash Gupta**

---

## 📖 Overview

Wanderly is designed around a simple problem: travel planning usually means
jumping between separate pages for destinations, packages, hotels, and
transport, with no single place that ties them together. This project
brings all of that into one consistent interface — a visitor can discover a
destination, compare tour packages, check stay and transport options, and
submit one complete booking request, all in a connected flow with a clear
visual identity throughout.

As a front-end project, there is no live database or payment system behind
it. Every form (booking, enquiry, contact, login) submits to a matching
confirmation page that demonstrates what a completed request would look
like — so the full user journey, start to finish, is fully browsable.

---

## ✨ Key Features

- **Destination guides** — browsable destination cards linking to detailed
  guides with suggested stay length, highlights, and local tips.
- **Tour packages** — package listings linking to full day-wise itineraries.
- **Hotels & Transportation** — dedicated browsing pages for stays and
  travel modes.
- **A complete booking page** — package, room type, and transport are chosen
  as selectable cards, with a live estimated total that updates as choices
  and traveller count change.
- **Service enquiry & contact forms** — separate flows for hotel/transport
  enquiries, custom trip requests, and general support.
- **Confirmation pages** — each form ends in a realistic booking/enquiry
  summary rather than a plain "thank you" message.
- **Consistent, responsive layout** — a shared header, navigation, and
  footer across every page, adapting to desktop, tablet, and mobile widths.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic elements — header, nav, section, footer) |
| Styling & Layout | CSS3 (Flexbox, media queries, hover states) |
| Interactivity | A small amount of vanilla JavaScript, used only on the booking page, to calculate a live price estimate as selections change |
| Forms | Native HTML forms — no backend; each form submits to a static confirmation page |

---

## 📁 Project Structure

```
Tour-and-Travel-Management-Platform/
├── index.html
├── destinations.html
├── destination-details.html
├── packages.html
├── package-details.html
├── hotels.html
├── transport.html
├── booking.html
├── booking-confirmation.html
├── enquiry.html
├── enquiry-confirmation.html
├── contact.html
├── contact-confirmation.html
├── login.html
├── css/
│   └── style.css
└── README.md
```

---

## 👥 Team & Module Ownership

| Member | Role | Modules owned |
|---|---|---|
| **Ketan** | Lead + Frontend | `index.html`, `contact.html`, `contact-confirmation.html`, `login.html`, `css/style.css` |
| **Jay** | Services | `hotels.html`, `transport.html`, `enquiry.html`, `enquiry-confirmation.html` |
| **Kashish** | Packages + Booking | `packages.html`, `package-details.html`, `booking.html`, `booking-confirmation.html` |
| **Kanhaiya** | Destinations | `destinations.html`, `destination-details.html` |

Each member worked on their module in its own feature branch
(`feature/frontend`, `feature/services`, `feature/packages-booking`,
`feature/destinations`), merged into `dev` after review, and finally
released into `main`.

---

## 🔀 Branching Workflow

```
feature/frontend            ─┐
feature/services            ─┼──► dev ──► main
feature/packages-booking     │
feature/destinations        ─┘
```

- `main` — stable, submission-ready branch.
- `dev` — shared integration branch where all modules come together and get
  tested as one site.
- `feature/*` — one branch per member's module, merged into `dev` via
  Pull Request.

---

## 🚀 Running the Project

No build tools or dependencies are required.

1. Clone or download the repository.
2. Open `index.html` in any browser (or use a "Live Server" extension for
   auto-reload during development).
3. Navigate the site through the top navigation bar — every page links
   through to the relevant next step in the flow.

---

## 🔭 Future Scope

The current build covers destination discovery, packages, hotels,
transport, and the full booking/enquiry/contact flow. Planned next steps
include a user dashboard, a travel blog and destination guide section, a
packing checklist, an FAQ page, and account registration — extending the
platform closer to a complete travel portal, and eventually connecting it
to a real backend for live bookings and payments.

---

## 🙏 Acknowledgements

Built as a college-level front-end project to apply HTML5 and CSS3 concepts
— semantic structure, responsive layout, and consistent UI design — in a
real, multi-page travel and tourism domain.
