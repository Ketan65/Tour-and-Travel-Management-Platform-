# 🧭 Team Git & GitHub Collaboration Playbook
### Project: Tour and Travel Management Platform
*Derived from the 4-Member Team Collaboration Guide (`git_github_4_member_project_collaboration_guide.docx`)*

---

## 📌 1. Team Git Strategy (3-Level Hierarchy)

| Branch | Purpose | Golden Rule |
| :--- | :--- | :--- |
| **`main`** | Final stable/submission version | 🚫 **Never push directly to `main`** |
| **`dev`** | Shared integration, testing & peer review | 🔄 All feature PRs merge here first |
| **`feature/*`** | Individual member work | 👤 One branch per member/feature |

```text
main  (Stable Submission)
  │
  └── dev  (Integration & Testing)
        ├── feature/auth        (Member 1 - Auth UI & State)
        ├── feature/user        (Member 2 - User & Bookings)
        ├── feature/product     (Member 3 - Tours & Catalog)
        └── feature/frontend    (Member 4 - Core UI & Landing)
```

---

## 👥 2. 4-Member Responsibilities & File Isolation

To avoid **merge conflicts**, each team member works strictly in their own dedicated files and branches:

| Member | Role | Branch | Dedicated Files |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Authentication & Security UI** | `feature/auth` | `pages/auth.html`<br>`assets/css/modules/auth.css`<br>`assets/js/modules/auth.js` |
| **Member 2** | **User Profile & Bookings Dashboard** | `feature/user` | `pages/dashboard.html`<br>`assets/css/modules/dashboard.css`<br>`assets/js/modules/dashboard.js` |
| **Member 3** | **Tours Catalog & Itineraries** | `feature/product` | `pages/tours.html`<br>`pages/tour-details.html`<br>`assets/css/modules/tours.css`<br>`assets/js/modules/tours.js`<br>`assets/js/data/tours-data.js` |
| **Member 4** | **Core UI & Landing Page (Lead)** | `feature/frontend` | `index.html`<br>`assets/css/style.css`<br>`assets/css/components.css`<br>`assets/js/main.js` |

> 💡 **Golden Rule**: Apne module se bahar ki files tab tak edit na karein jab tak team me discussion na ho jaye!

---

## 🚀 Step-by-Step Workflow for Team Members

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd tour-travel-management
git branch
# Default active branch: main
```

### Step 2: Switch to `dev` Branch
Before starting any new work, always move to `dev`:
```bash
git switch dev
git pull origin dev
```

### Step 3: Create Your Feature Branch
Always branch off from the latest `dev`:

- **Member 1 (Auth)**:
  ```bash
  git switch dev
  git pull origin dev
  git switch -c feature/auth
  ```
- **Member 2 (User/Bookings)**:
  ```bash
  git switch dev
  git pull origin dev
  git switch -c feature/user
  ```
- **Member 3 (Tours Catalog)**:
  ```bash
  git switch dev
  git pull origin dev
  git switch -c feature/product
  ```
- **Member 4 (Frontend Lead)**:
  ```bash
  git switch dev
  git pull origin dev
  git switch -c feature/frontend
  ```

### Step 4: Do Your Work & Make Meaningful Commits
```bash
git status
git add .
git commit -m "feat(auth): add user registration form with validation"
```

#### ✅ Good Commit Message Format:
- `feat(tours): add search and price filter controls`
- `fix(dashboard): correct booking status badge styling`
- `style(landing): enhance hero section responsive grid`
- `refactor(auth): store user session in localStorage`

### Step 5: Push Feature Branch to GitHub
```bash
git push -u origin feature/<your-branch-name>
# Example: git push -u origin feature/auth
```

### Step 6: Create Pull Request (`feature/*` ➔ `dev`)
1. Open your repository on GitHub.
2. Click **Compare & pull request**.
3. ⚠️ **Set base branch to `dev`** (Do NOT select `main`).
4. Set compare branch to your `feature/<name>` branch.
5. Fill out the PR template checklist.
6. Assign at least **1 teammate** as reviewer.

### Step 7: Code Review & Merging
The reviewer verifies:
- [x] Feature works as expected.
- [x] No `.env`, API keys, or unwanted files committed.
- [x] Responsive on mobile and desktop.
- [x] Merge PR into `dev`.

### Step 8: Update Local `dev`
After your PR is merged, switch back to `dev` and pull updates:
```bash
git switch dev
git pull origin dev
```

---

## ⚔️ What to Do When `dev` Has Changed (Resolving Conflicts)

If a teammate merges their code into `dev` while you are working on your feature branch, bring those changes into your branch before making your PR:

```bash
# 1. Update your local dev
git switch dev
git pull origin dev

# 2. Switch back to your feature branch and merge dev
git switch feature/<your-feature>
git merge dev

# 3. If there are conflicts:
# - Open VS Code, check highlighted conflicts
# - Keep the required changes, save file
git add .
git commit -m "chore: resolve merge conflicts with dev"
git push
```

---

## 🏆 Final Release Flow: `dev` ➔ `main`

Jab charo members ka kaam complete ho jaye aur `dev` branch me thoroughly test ho jaye:
1. GitHub par ek final Pull Request banaye:
   - **Base**: `main`
   - **Compare**: `dev`
2. Title: `Release v1.0.0: Tour and Travel Management Platform`
3. Team review ke baad merge karein.
4. Sabhi members local repo update karein:
   ```bash
   git switch main
   git pull origin main
   git switch dev
   git pull origin dev
   ```

---

## 📋 Daily Git Checklist for Students

### Before Starting Coding:
- [ ] Switch to `dev` (`git switch dev`)
- [ ] Pull latest changes (`git pull origin dev`)
- [ ] Switch to your feature branch (`git switch feature/<name>`)
- [ ] Merge latest `dev` into your branch (`git merge dev`)

### After Finishing Coding:
- [ ] Check changed files (`git status`)
- [ ] Commit with clean message (`git commit -m "..."`)
- [ ] Push to GitHub (`git push origin feature/<name>`)
- [ ] Create Pull Request targeting `dev` on GitHub

---

## ⚠️ 10 Team Rules (Strictly Follow)

1. **Kabhi bhi directly `main` par push na karein.**
2. Hamesha `feature/*` branch me kaam karein.
3. Feature PRs hamesha **`dev`** ko target karengi.
4. Final PR hamesha **`dev` ➔ `main`** hoga.
5. Har naya kaam shuru karne se pehle `git pull origin dev` karein.
6. Chhote aur descriptive commits banayein.
7. Har PR ko kam se kam ek teammate se review karwayein.
8. `.env`, passwords ya private files commit na karein (`.gitignore` use karein).
9. Shared branches (`main`, `dev`) par `git push -f` (force push) strictly prohibited hai.
10. Project structure ya shared styling badalne se pehle team me inform karein.
