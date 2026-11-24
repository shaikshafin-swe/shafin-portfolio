# Shaik Shafin – Engineering & AI Portfolio

> **"Learn continuously. Build meaningful projects. Turn ideas into solutions."**

A high-performance, dark neo-brutalist / cyber-minimalist portfolio website engineered for **Shaik Shafin** (Computer Science & Engineering undergraduate at VIT-AP University, AI enthusiast, and 1st place hackathon winner out of 250+ teams).

---

## 🌟 Key Features

1. **Aesthetic & Intentional Design System**
   - **Dark Neo-Brutalist Cyber-Minimalist Theme** with glassmorphism panels, cyan/emerald glowing borders, and subtle ambient particle constellation background on HTML5 Canvas.
   - **Typography**: Paired display typography (*Syne*), readable modern sans (*Plus Jakarta Sans*), and technical monospaced code tokens (*JetBrains Mono*).
   - **Theme Switcher**: Instant Dark Mode / Light Mode toggle with automatic `localStorage` persistence.

2. **Interactive AIM-OPS Telemetry Simulator (Hackathon Spotlight)**
   - Interactive before-and-after widget showcasing the **1st Place** winning project (*AIM-OPS*) built with Team Phoenix Knights at the 24-Hour Energy Conservation Hackathon.
   - Live canvas telemetry wave visualizer reacting dynamically to toggle states (Legacy Unmonitored Spikes vs. AIM-OPS AI Load Balancing).

3. **Interactive Recruiter Command Terminal (`Ctrl + K`)**
   - Built-in retro command console accessible via `Ctrl+K` or the floating terminal button.
   - Supports commands: `help`, `bio`, `skills`, `projects`, `aimops`, `hackathons`, `education`, `contact`, `resume`, `github`, `sudo hire`, `clear`.

4. **Curated Project Showcase & Deep-Dive Modals**
   - Category filtering: **All**, **AI & GenAI**, **Full-Stack & Web**, **Hackathons**.
   - Interactive project detail modals displaying:
     - Problem Statement
     - Engineered Solution
     - Shaik's Personal Contribution & Role
     - Key Innovations
     - Verified Technologies & Direct Links

5. **Integrated Live GitHub Synchronization**
   - Real-time API integration fetching public repository and follower counts from `github.com/shaikshafin-swe`.
   - Built-in resilient offline fallbacks in case of GitHub rate limiting.

6. **ATS-Compliant & Print-Optimized Resume (`resume.html`)**
   - Clean, executive one-page resume accessible via in-app modal or direct standalone page.
   - Built-in `window.print()` trigger and print-specific CSS media queries (`@media print`) to create a PDF.

7. **Instant Contact Form & Clipboard Integration**
   - One-click copy email button with animated toast notification.
   - Interactive contact composer that pre-fills and dispatches email via user's default client.

---

## 📂 Project Structure

```
shafin portfolio/
├── index.html        # Main semantic single-page application
├── styles.css        # Custom CSS variables, glassmorphism, animations, theme rules
├── script.js         # Interactive controllers (Canvas, Terminal, Modals, Filters, API)
├── resume.html       # Standalone ATS-friendly, printable one-page resume
└── README.md         # Documentation, deployment guide, and customization instructions
```

---

## 🚀 How to Run Locally

You can run this portfolio using any local web server or by opening `index.html` directly:

### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the portfolio folder
cd "c:\Users\bhuva\Desktop\ANTIGRAVITY\shafin portfolio"

# Launch local server
python -m http.server 3000
```
Then open your browser and navigate to: **`http://localhost:3000`**

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` in Windows Explorer to open it directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 🌐 Free Instant Deployment

### Deploy to GitHub Pages:
1. Create a repository on GitHub named `shafin-portfolio` or `shaikshafin-swe.github.io`.
2. Push all files in this directory to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Shafin portfolio"
   git branch -M main
   git remote add origin https://github.com/shaikshafin-swe/shafin-portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages > Branch: main > Save**.
4. Your site will be live at `https://shaikshafin-swe.github.io/shafin-portfolio`!

### Deploy to Vercel:
Run `npx vercel` in this folder and press Enter to deploy to global edge CDN in 30 seconds.

---

## 🛠️ Customization Guide

- **Update Contact Email**: Search for `shafin.24bcw7074@vitapstudent.ac.in` in `index.html`, `script.js`, and `resume.html`.
- **Add New Projects**: Add project card markup in `index.html` and append the corresponding deep-dive details into `PROJECTS_DATA` inside `script.js`.
- **Update CGPA**: Modify the CGPA ring card in `index.html` and education section in `resume.html`.

---

© 2026 Shaik Shafin. All rights reserved.
