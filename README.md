# 🌍 Wanderly — Tour & Travel Management Platform

[![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-E34F26.svg)](#-technology-stack)
[![Team Collaboration](https://img.shields.io/badge/Team-4%20Members-10b981.svg)](#-team-collaboration--contributors)
[![Git Flow](https://img.shields.io/badge/Branching-3--Tier%20Model%20(main%20%E2%86%90%20dev%20%E2%86%90%20feature)-0284c7.svg)](#-git-branching-strategy)
[![Responsive](https://img.shields.io/badge/Design-Fully%20Responsive-8b5cf6.svg)](#-core-features)
[![License](https://img.shields.io/badge/License-MIT-f59e0b.svg)](LICENSE)

> **Travel plans that feel easy from the first click.**  
> **Wanderly** is a modern, responsive, client-side Tour and Travel Management Platform designed to streamline holiday discovery, day-wise itinerary planning, stay and transportation selection, and instant interactive booking estimation.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Core Features](#-core-features)
- [Live Interactive Booking Calculator](#-live-interactive-booking-calculator)
- [User Journey & Workflow](#-user-journey--workflow)
- [Repository & File Structure](#-repository--file-structure)
- [Technology Stack](#-technology-stack)
- [Team Collaboration & Contributors](#-team-collaboration--contributors)
- [Git Branching Strategy](#-git-branching-strategy)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Future Enhancements](#-future-enhancements)

---

## 🧭 Overview

Planning a memorable trip usually requires juggling multiple disconnected websites for destinations, packages, hotels, cabs, and trains. **Wanderly** unifies this entire experience into a seamless, interconnected web platform:

1. **Discover Destinations**: Comprehensive travel guides with best times to visit, ideal duration, and must-see landmarks.
2. **Explore Tour Packages**: Transparent, day-by-day itineraries with clear inclusions, routes, and pricing.
3. **Compare Stays & Transport**: Hand-picked accommodation options and multi-modal transit options (Flights, Trains, Private Cabs, AC Buses).
4. **Custom Interactive Booking**: A 5-step dynamic booking engine featuring a **live price calculation table** that recalculates costs in real-time as travellers customize packages, room categories, transit modes, and add-ons.
5. **Instant Confirmations**: Generates professional booking and inquiry summary receipts with unique reference numbers.

---

## ✨ Core Features

### 1. 🗺️ Destination Guides (`destinations.html`, `destination-details.html`)
- Dedicated guides for top Indian travel destinations: **Jaipur, Goa, Manali, Kerala, Kashmir, Rajasthan, Agra, and Udaipur**.
- Highlights include: *Best For*, *Suggested Stay Duration*, *Must-See Places*, and *Best Time to Visit*.
- Smooth anchor routing allowing direct navigation from cards into specific destination guides.

### 2. 🎒 Curated Tour Packages & Detailed Itineraries (`packages.html`, `package-details.html`)
- Multi-day, balanced vacation packages:
  - **Royal Rajasthan Escape** (5 Days / 4 Nights • Heritage • Jaipur → Jodhpur → Udaipur)
  - **Himalayan Retreat** (6 Days / 5 Nights • Mountain • Manali + Solang & Rohtang)
  - **Kerala Backwater Journey** (6 Days / 5 Nights • Backwaters • Kochi → Munnar → Alappuzha)
  - **Goa Coastal Escape** (5 Days / 4 Nights • Beach • North Goa → Panjim → South Goa)
  - **Kashmir Valley Explorer** (6 Days / 5 Nights • Scenic • Srinagar → Gulmarg → Pahalgam)
  - **Rishikesh Adventure Break** (4 Days / 3 Nights • Adventure • River Rafting & Riverside Camping)
- Comprehensive **Day-by-Day itinerary breakdowns**, inclusions (accommodation, transfers, breakfasts, guides), exclusions, and important travel notes.

### 3. 🏨 Stay & Accommodation Finder (`hotels.html`)
- Curated properties categorized by travel style:
  - *The Heritage Courtyard* (Jaipur - Heritage stay)
  - *Sea Breeze Retreat* (Goa - Beach stay)
  - *Valley View Lodge* (Manali - Mountain stay)
  - *Backwater Haven* (Kerala - Backwater stay)
  - *Lakefront House* (Kashmir - Lake-side stay)
- Transparent nightly tariffs and direct links to hotel inquiry forms.

### 4. 🚆 Multi-Modal Transit Comparison (`transport.html`)
- Direct comparison between:
  - **Flights**: Airport-to-airport express travel for long distances.
  - **Trains**: Scenic, comfortable, and budget-friendly rail journeys.
  - **Private Cabs**: Door-to-door flexibility for families and multi-city sightseeing.
  - **AC Buses**: Practical options for short-haul and overnight routes.
- Includes a handy *Transport Planning Checklist*.

### 5. ⚡ Dynamic Interactive Booking Builder (`booking.html`)
- **Step 1: Choose Package** (Radio card selection with duration and per-person cost).
- **Step 2: Choose Room Category** (Standard Room, Deluxe Room, Family Room).
- **Step 3: Choose Transport** (Flight, Train, AC Bus, Private Cab).
- **Step 4: Optional Add-ons** (Travel Insurance, Airport Pickup, Guided City Tour).
- **Step 5: Trip & Traveller Details** (Travel date, traveller count, full name, phone, departure city).

### 6. 🧾 Confirmation & Inquiry Receipts
- **`booking-confirmation.html`**: Displays generated booking reference ID, summary breakdown, and next steps for traveller verification.
- **`enquiry.html` & `enquiry-confirmation.html`**: Allows travellers to request bespoke, customized itineraries with specific dates, special requirements, and budgets.
- **`contact.html` & `contact-confirmation.html`**: Customer care helpdesk and travel assistance form.
- **`login.html`**: User authentication portal.

---

## 🧮 Live Interactive Booking Calculator

`booking.html` features an integrated client-side calculation script that listens to every form input and dynamically re-computes the estimate:

$$\text{Estimated Total} = (\text{Package Price} \times \text{Travellers}) + (\text{Room Price} \times \text{Nights}) + (\text{Transport Price} \times \text{Travellers}) + \sum \text{Selected Add-ons}$$

```javascript
// Instant live estimate calculation
function calculateEstimate() {
  var travellers = parseInt(document.getElementById("travellers").value, 10) || 1;
  var packageInput = document.querySelector('input[name="package"]:checked');
  var roomInput = document.querySelector('input[name="room"]:checked');
  var transportInput = document.querySelector('input[name="transport"]:checked');
  var addonInputs = document.querySelectorAll('input[type="checkbox"]:checked');

  var packagePrice = packageInput ? parseInt(packageInput.getAttribute("data-price"), 10) : 0;
  var nights = packageInput ? parseInt(packageInput.getAttribute("data-nights"), 10) : 0;
  var roomPrice = roomInput ? parseInt(roomInput.getAttribute("data-price"), 10) : 0;
  var transportPrice = transportInput ? parseInt(transportInput.getAttribute("data-price"), 10) : 0;

  var addonsTotal = 0;
  addonInputs.forEach(function(box) {
    addonsTotal += parseInt(box.getAttribute("data-price"), 10);
  });

  var grandTotal = (packagePrice * travellers) + (roomPrice * nights) + (transportPrice * travellers) + addonsTotal;
  // Updates live receipt table in real-time
}
```

---

## 🔄 User Journey & Workflow

```text
               ┌────────────────────────┐
               │    Wanderly Homepage   │
               │      (index.html)      │
               └───────────┬────────────┘
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐
│  Destinations Guide  │       │ Tour Packages List   │
│ (destinations.html)  │       │   (packages.html)    │
└──────────┬───────────┘       └──────────┬───────────┘
           │                              │
           ▼                              ▼
┌──────────────────────┐       ┌──────────────────────┐
│ Destination Details  │       │ Package Day-wise     │
│(destination-details) │       │ Itinerary & Details  │
└──────────┬───────────┘       └──────────┬───────────┘
           │                              │
           └───────────────┬──────────────┘
                           ▼
               ┌────────────────────────┐
               │  Interactive Booking   │
               │   & Live Estimation    │
               │     (booking.html)     │
               └───────────┬────────────┘
                           │
                           ▼
               ┌────────────────────────┐
               │  Instant Confirmation  │
               │   & Reference Code     │
               │ (booking-confirmation) │
               └────────────────────────┘
```

---

## 📂 Repository & File Structure

```text
Tour-and-Travel-Management-Platform-/
├── css/
│   └── style.css                   # Core responsive stylesheet & design system
├── index.html                      # Homepage: Hero, 3-step guide, featured packages & popular destinations
├── destinations.html               # Destination catalog overview
├── destination-details.html        # Comprehensive destination guides (Jaipur, Goa, Manali, etc.)
├── packages.html                   # Tour packages listing
├── package-details.html            # Day-wise itineraries, inclusions, exclusions & route details
├── hotels.html                     # Accommodation catalog & nightly tariffs
├── transport.html                  # Multi-modal transportation overview & planning checklist
├── booking.html                    # 5-Step interactive booking builder with live price calculation
├── booking-confirmation.html       # Dynamic booking receipt & confirmation page
├── enquiry.html                    # Bespoke trip customization & service inquiry form
├── enquiry-confirmation.html       # Inquiry submission confirmation with reference code
├── contact.html                    # Customer support & reach-out portal
├── contact-confirmation.html       # Support request confirmation
├── login.html                      # User account sign-in interface
└── README.md                       # Comprehensive project documentation
```

---

## 💻 Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | **HTML5 (Semantic)** | Modern, accessible markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`). |
| **Styling** | **Custom Responsive CSS3** | Fluid layouts using CSS Flexbox & CSS Grid. Warm travel palette featuring **Forest Green** (`#0e4c46`), **Sunset Amber** (`#ffb547`), and **Sand Beige** (`#fff8ef`). |
| **Logic & Interactivity**| **Vanilla JavaScript (ES6)** | Form event listeners, real-time receipt calculations, dynamic currency formatting (`en-IN`), smooth anchor scrolling. |
| **Photography** | **Unsplash & Curated CDNs** | High-resolution, optimized travel photography for immersive visual storytelling. |
| **Zero Dependencies** | **Pure Client-Side** | No npm build tools, Node servers, or heavy frameworks required. Runs directly in any web browser. |

---

## 👥 Team Collaboration & Contributors

This project was built collaboratively by a dedicated 4-member team following clean modular separation of features to ensure zero merge conflicts:

| Contributor | Role & Specialization | Key Contributions & Feature Modules |
| :--- | :--- | :--- |
| **[Ketan Verma](https://github.com/Ketan65)** | **Project Lead & Frontend Architect** | Core UI system, global header/footer, homepage (`index.html`), shared styling (`css/style.css`), login integration (`login.html`), Git repository coordination, and PR merges. |
| **[Kanhiya Lavaniya](https://github.com/kanhaiyalavaniya75-bit)** | **Destinations & Stays Specialist** | Destinations catalog (`destinations.html`), comprehensive destination guides (`destination-details.html`), and hotel accommodations portal (`hotels.html`). |
| **[Jay Sharma](https://github.com/JAY0001-gla)** | **Packages & Booking Specialist** | Tour packages (`packages.html`), day-by-day itineraries (`package-details.html`), interactive booking engine (`booking.html`), and multi-modal transit (`transport.html`). |
| **[Kashish](https://github.com/kashishs2310)** | **Quality Assurance & Services Specialist** | Multi-service custom inquiry flow (`enquiry.html`), confirmation receipts (`*-confirmation.html`), customer contact portal (`contact.html`), and UI testing. |

---

## 🌿 Git Branching Strategy

Our team adhered to a strict **3-Tier Git Branching Model**:

```text
                        main  (Stable Production Release)
                         ▲
                         │  (Integration PR: dev ➔ main)
                         │
                        dev   (Shared Development & Peer Review)
                         ▲
     ┌───────────────────┼───────────────────┬───────────────────┐
     │                   │                   │                   │
feature/frontend  feature/destinations  feature/packages-booking  feature/services
 (Ketan Verma)   (Kanhiya Lavaniya)       (Jay Sharma)          (Kashish)
```

- **`main`**: The official, production-ready submission branch.
- **`dev`**: The shared development and integration staging branch.
- **`feature/*`**: Isolated feature branches created by individual team members for each respective module.
- All code changes were reviewed and integrated via **GitHub Pull Requests** before entering `dev` and eventually `main`.

---

## 🚀 Getting Started & Local Setup

Since **Wanderly** is built with clean vanilla web technologies, you can run it immediately without installing heavy dependencies or package managers:

### Option 1: Direct Browser Launch (Simplest)
1. Clone the repository:
   ```bash
   git clone https://github.com/Ketan65/Tour-and-Travel-Management-Platform-.git
   cd Tour-and-Travel-Management-Platform-
   ```
2. Double-click **`index.html`** to open the project directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (if not already installed).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500`.

### Option 3: Python Built-in HTTP Server
```bash
# Python 3
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔮 Future Enhancements

- [ ] **Interactive Payment Gateway**: Integration with Razorpay / Stripe for live advance payment simulation.
- [ ] **User Dashboard & Booking History**: Persistent user profiles and active booking tracking via LocalStorage or Cloud Firestore.
- [ ] **Interactive Map Integration**: Mapbox / Leaflet interactive maps for routes and attraction waypoints.
- [ ] **Multi-Currency & International Packages**: Global travel destinations and real-time currency converters.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to explore, customize, and build upon it!

---

<div align="center">
  <sub>Crafted with passion by Ketan Verma, Kanhiya Lavaniya, Jay Sharma, and Kashish • 2026</sub>
</div>
