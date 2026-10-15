# ApplyTrack 🎯

> **A clean, responsive job and internship application tracker built for your GitHub portfolio.**

![ApplyTrack Status](https://img.shields.io/badge/Release-v1.0-7c3aed?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_•_TypeScript_•_Vite-0f1d40?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

- **Repository**: [https://github.com/OxOx13/applytrack](https://github.com/OxOx13/applytrack)
- **Live Demo**: *(Configured via Firebase Hosting below)*

---

## 📌 Project Overview

**ApplyTrack** is a client-side web application designed to help students, new grads, and developers track and manage job and internship applications throughout their recruitment cycle. It provides a clean navy and white dashboard, vivid purple accents, status metrics, and local persistence—requiring zero external accounts, backend servers, or paid subscriptions.

---

## ⚡ Features

- **Dashboard Pipeline Cards**: Real-time metric counters for **Total Applications**, **Saved**, **Applied**, **Interviewing**, **Offers**, and **Rejected**. Each card is interactive—clicking a status card filters the list immediately.
- **Full CRUD Management**:
  - **Add Application**: Modal form with accessible inputs, required field validation, and date picker.
  - **Edit Application**: Quick editing for company, position, application date, interview stage, job link, and notes.
  - **Delete Application**: Accessible confirmation dialog to prevent accidental deletion.
- **Fields Tracked**:
  - `Company`: Employer or organization name.
  - `Role`: Job or internship title.
  - `Job URL`: Direct link to original job posting (opens securely in a new tab).
  - `Application Date`: Submission date (formatted cleanly using `Intl.DateTimeFormat`).
  - `Status`: `Saved`, `Applied`, `Interview`, `Offer`, or `Rejected`.
  - `Notes`: Recruiter contacts, interview rounds, salary ranges, questions, and follow-ups.
- **Search, Filter & Sort**:
  - Instant search across company name, role, and notes.
  - Status filter pills (`All`, `Saved`, `Applied`, `Interview`, `Offer`, `Rejected`).
  - Sort dropdown: Newest first, Oldest first, Company A-Z, Company Z-A.
- **One-Click Sample Data**:
  - Clearly labeled **"Load Sample Data"** button in the header and empty states.
  - Instantly populates realistic portfolio entries (Stripe, Google, Figma, Linear, Datadog, Netflix).
- **Accessible & Responsive UX**:
  - Accessible form labels (`<label htmlFor="...">`), dialog ARIA roles (`role="dialog"`, `aria-modal="true"`), and `Escape` key listeners.
  - High-contrast purple focus rings for keyboard navigation.
  - Responsive design adapting cleanly from mobile viewports to wide desktop monitors.
  - Informative empty states with actionable shortcuts.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript (strict mode with `verbatimModuleSyntax`)
- **Build Tool & Dev Server**: Vite
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with modern CSS Custom Properties, flexbox, and responsive grid layouts
- **Deployment**: Firebase Hosting (Spark no-cost plan, static single-page app)

---

## 💾 LocalStorage & Data Persistence

ApplyTrack stores application records in your browser using the HTML5 `localStorage` API (`applytrack_applications_v1`).

### Limitations to Keep in Mind:
1. **Browser & Domain Isolated**: Data saved in one browser (e.g., Chrome) will not appear in another browser (e.g., Firefox or Safari), nor in Private / Incognito sessions.
2. **Cache & History Deletion**: Clearing browser site data or clearing cache for the host will reset the stored applications.
3. **Storage Quota**: Browser `localStorage` is restricted to roughly 5MB per origin. While this easily stores thousands of text-based job applications, it is intended for lightweight client-side storage.
4. **No Cloud Sync in v1**: In Version 1.0, data is not synchronized across multiple physical devices.

---

## 🧪 Verification & Testing

### User Manual Testing (Verified by Developer)
- **Application Creation**: Form inputs validated (company & role required, valid URL format if provided). New application successfully prepended to list.
- **Application Editing**: Successfully modified interview status and notes; changes reflected immediately across the dashboard cards and list.
- **Application Deletion**: Confirmation modal prevented accidental deletion; confirming removal updated all status counters.
- **Search & Filtering**: Tested dynamic filtering with search terms and status pills; empty search states presented the "Reset Search & Filters" shortcut.
- **Persistence Across Refresh**: Added custom applications and refreshed the browser tab; state persisted without data loss.
- **Sample Data Loading**: Tested "Load Sample Data" button; correctly loaded 6 sample applications and updated all metric cards.
- **Responsive Layout**: Inspected layout across mobile screen sizes and desktop viewports; cards, header buttons, and form grids adapted cleanly.

### Automated Checks
- **Type Safety**: Verified via `npx tsc --noEmit` and `tsc -b` with zero compilation errors.
- **Production Build**: Verified via `npm run build`; Vite successfully compiled minified HTML, CSS, and JS bundles into `dist/`.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/OxOx13/applytrack.git

# 2. Change into project directory
cd applytrack

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Open in browser
# http://127.0.0.1:5173/
```

### Production Build

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
