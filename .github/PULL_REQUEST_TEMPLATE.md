## Pull Request Description

### 1. Target Branch Confirmation
- [ ] **Base branch is set to `dev`** (⚠️ Do NOT open Pull Requests directly to `main`!)
- [ ] Branch name follows standard naming convention: `feature/<name>`

---

### 2. Team Member & Module
**Assigned Member**: 
- [ ] Member 1 (Auth & Security - `feature/auth`)
- [ ] Member 2 (User Profile & Bookings - `feature/user`)
- [ ] Member 3 (Tours Catalog & Itineraries - `feature/product`)
- [ ] Member 4 (Frontend UI & Layout - `feature/frontend`)

**Module Affected**:
- [ ] `pages/auth.html` & `assets/css/modules/auth.css` / `auth.js`
- [ ] `pages/dashboard.html` & `assets/css/modules/dashboard.css` / `dashboard.js`
- [ ] `pages/tours.html`, `tour-details.html` & `assets/css/modules/tours.css` / `tours.js`
- [ ] `index.html` & `assets/css/style.css` / `assets/js/main.js`

---

### 3. Summary of Changes
Provide a clear, high-level summary of what was added, modified, or fixed:
- *Example: Added dynamic category filtering for Adventure and Beach tours in the catalog.*

---

### 4. Code Quality & Security Checklist
Before requesting a review, verify:
- [ ] **No Secrets**: No `.env`, API keys, tokens, or credentials are committed.
- [ ] **No Merge Conflicts**: Branch is updated with the latest `dev` (`git switch dev && git pull && git switch feature/<name> && git merge dev`).
- [ ] **Clean Code**: Meaningful commit messages and clean folder modularity followed.
- [ ] **Responsiveness**: UI looks great across desktop, tablet, and mobile screens.
- [ ] **Self-Tested**: Manually verified that all links and features operate smoothly.

---

### 5. Teammate Reviewer Assignment
- **Requested Reviewer(s)**: @teammate-username
- **Reviewer Checklist** (To be checked by peer reviewer before merging into `dev`):
  - [ ] Feature tested and behaves as expected
  - [ ] No regression on existing pages
  - [ ] Ready to merge into `dev`
