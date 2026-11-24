/**
 * SHAIK SHAFIN - MODERN PORTFOLIO CONTROLLER
 * Full interactive features: Canvas particles, Terminal command palette,
 * AIM-OPS live telemetry simulation, Project detail modal,
 * Live GitHub API integration, Theme toggle, and Toast alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAmbientCanvas();
  initTypingEffect();
  initTelemetrySimulator();
  initProjectFilters();
  initModals();
  initTerminal();
  initGitHubIntegration();
  initContactForm();
  initScrollSpy();
  initCardSpotlights();
});

/* ===================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('shafin-theme') || (prefersDark ? 'dark' : 'dark');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('shafin-theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  if (theme === 'light') {
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>`;
    btn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>`;
    btn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* ===================================================================
   2. AMBIENT CONSTELLATION CANVAS
   =================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Connect to mouse if nearby
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ===================================================================
   3. HERO TYPING EFFECT
   =================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-role');
  if (!typingEl) return;

  const roles = [
    'Software Developer',
    'AI & Agentic Systems Builder',
    'Hackathon Winner (1st / 250+ Teams)',
    'Enterprise RAG Engineer',
    'CSE Undergraduate @ VIT-AP'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 45;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 100;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400; // Pause before typing next
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===================================================================
   4. AIM-OPS INTERACTIVE TELEMETRY SIMULATOR
   =================================================================== */
function initTelemetrySimulator() {
  const unoptimizedBtn = document.getElementById('sim-unoptimized-btn');
  const optimizedBtn = document.getElementById('sim-optimized-btn');
  const powerEl = document.getElementById('sim-metric-power');
  const wasteEl = document.getElementById('sim-metric-waste');
  const anomalyEl = document.getElementById('sim-metric-anomaly');
  const simCanvas = document.getElementById('sim-telemetry-canvas');

  if (!simCanvas) return;
  const ctx = simCanvas.getContext('2d');

  let mode = 'optimized'; // 'unoptimized' or 'optimized'
  let phase = 0;

  function updateSimulationState(newMode) {
    mode = newMode;
    if (mode === 'optimized') {
      optimizedBtn.classList.add('active');
      unoptimizedBtn.classList.remove('active');
      powerEl.innerHTML = `<span style="color:#10b981;">312 kW</span> <small>(-34%)</small>`;
      wasteEl.innerHTML = `<span style="color:#10b981;">4.2%</span>`;
      anomalyEl.innerHTML = `<span style="color:#10b981;">0 active</span> <small>(auto-healed)</small>`;
    } else {
      unoptimizedBtn.classList.add('active');
      optimizedBtn.classList.remove('active');
      powerEl.innerHTML = `<span style="color:#ef4444;">485 kW</span> <small>(spike alert)</small>`;
      wasteEl.innerHTML = `<span style="color:#ef4444;">38.6%</span>`;
      anomalyEl.innerHTML = `<span style="color:#f59e0b;">5 spikes</span> <small>(unresolved)</small>`;
    }
  }

  if (unoptimizedBtn && optimizedBtn) {
    unoptimizedBtn.addEventListener('click', () => updateSimulationState('unoptimized'));
    optimizedBtn.addEventListener('click', () => updateSimulationState('optimized'));
  }

  // Draw animated telemetry curve
  function drawTelemetry() {
    const w = (simCanvas.width = simCanvas.clientWidth);
    const h = (simCanvas.height = simCanvas.clientHeight);

    ctx.clearRect(0, 0, w, h);

    // Draw baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Wave config based on mode
    ctx.beginPath();
    const isOpt = mode === 'optimized';
    ctx.strokeStyle = isOpt ? '#10b981' : '#ef4444';
    ctx.lineWidth = 2.5;

    for (let x = 0; x < w; x++) {
      let y;
      if (isOpt) {
        // Smooth, harmonic curve
        y = h / 2 + Math.sin(x * 0.03 + phase) * 12 + Math.cos(x * 0.015 + phase * 0.7) * 6;
      } else {
        // Chaotic spikes
        const spike = (x % 70 > 55) ? Math.sin(x) * 28 : 0;
        y = h / 2 + Math.sin(x * 0.05 + phase * 2) * 18 + spike;
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill under wave
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = isOpt ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)';
    ctx.fill();

    phase += 0.04;
    requestAnimationFrame(drawTelemetry);
  }

  drawTelemetry();
}

/* ===================================================================
   5. PROJECT CATEGORY FILTERS
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. PROJECT DATA & MODALS
   =================================================================== */
const PROJECTS_DATA = {
  aimops: {
    title: 'AIM-OPS – AI-driven Manufacturing Intelligence & Operations',
    tag: '🏆 1st Place Winner / 250+ Teams',
    hackathon: '24-Hour Energy Conservation Hackathon | Team Phoenix Knights',
    problem: 'Industrial manufacturing facilities suffer from severe, silent energy waste and undetectable operational bottlenecks due to unmonitored equipment cycles, leading to inflated carbon outputs and astronomical utility bills.',
    solution: 'AIM-OPS delivers an end-to-end industrial intelligence pipeline that models real-time machine telemetry, flags high-variance anomalies, predicts impending power surges, and generates automated actionable corrective sequences.',
    contribution: 'Designed core Python machine learning logic for energy anomaly detection, built automated telemetry simulation ingestion pipelines, and architected the operations dashboard.',
    techStack: ['Python', 'Machine Learning', 'Data Analytics', 'React.js', 'Tailwind CSS', 'IoT Telemetry Pipelines', 'REST APIs'],
    highlights: [
      'Engineered multi-variable time-series anomaly detection algorithms for plant motors.',
      'Achieved simulated 34% energy savings and cut peak-tariff consumption spikes.',
      'Awarded First Place out of 250+ competing collegiate engineering squads.'
    ],
    github: 'https://github.com/shaikshafin-swe',
    demo: '#'
  },
  upyield: {
    title: 'UpYield – Smart FinTech Platform',
    tag: '⚡ Radiothon Hackathon',
    hackathon: 'Radiothon Hackathon',
    problem: 'Retail investors and students struggle to navigate complex financial vehicles, falling prey to deceptive transaction anomalies, disjointed portfolio views, and lack of intuitive automated wealth projection models.',
    solution: 'UpYield unifies personal finance into a single intelligent platform featuring suspicious fraud detection algorithms, algorithmic SIP calculators, live stock/mutual fund tracking, mock UPI payment gateways, and seamless digital KYC onboarding.',
    contribution: 'Engineered the full-stack architecture, developed the fraud alerts rule engine, built interactive SIP compounding projection calculators, and integrated responsive data visualizations.',
    techStack: ['React.js', 'Node.js', 'Python Analytics', 'Chart.js', 'Tailwind CSS', 'RESTful APIs', 'Security Rules'],
    highlights: [
      'Real-time fraud rule detector that flags anomalous transaction frequencies.',
      'Dynamic SIP & investment return projection graphs with configurable risk tiers.',
      'Streamlined modern digital KYC step-by-step verification flow.'
    ],
    github: 'https://github.com/shaikshafin-swe',
    demo: '#'
  },
  happytrip: {
    title: 'HappyTrip – Intelligent Travel Planning Platform',
    tag: '🌐 Google TechSprint Hackathon',
    hackathon: 'TechSprint Google Hackathon',
    problem: 'Vacation planning is traditionally fragmented across dozens of tabs for flights, weather forecasts, route pacing, and daily budgeting, causing high cognitive friction.',
    solution: 'HappyTrip consolidates itinerary planning into an immersive, glassmorphism-styled web interface that generates day-by-day smart travel schedules with integrated weather intelligence and responsive trip budgets.',
    contribution: 'Crafted the entire glassmorphism UI/UX design system, implemented fluid responsive client-side state management, and integrated asynchronous weather and destination APIs.',
    techStack: ['HTML5', 'CSS3 (Glassmorphism)', 'Modern JavaScript (ES6+)', 'External APIs', 'Responsive Web Design'],
    highlights: [
      'Custom bespoke glassmorphism UI design with zero external heavy UI libraries.',
      'Instant interactive day-planner with drag-and-drop itinerary builder.',
      'Live budget tracker displaying expenditure breakdowns per travel category.'
    ],
    github: 'https://github.com/shaikshafin-swe',
    demo: '#'
  },
  customersupport: {
    title: 'Customer Support Automation (RAG Architecture)',
    tag: '💼 IBM SkillsBuild Internship',
    hackathon: 'IBM SkillsBuild Summer Internship Project',
    problem: 'Support teams are overwhelmed by high volumes of repetitive technical questions, while generic LLMs hallucinate inaccurate information without proprietary grounding.',
    solution: 'An enterprise-grade retrieval-augmented generation (RAG) customer support pipeline that ingests enterprise documentation, indexes semantic embeddings, and provides hallucination-free, cited answers with conversational memory.',
    contribution: 'Developed document ingestion & token chunking pipelines in Python, integrated vector retrieval logic, implemented conversation memory buffers for multi-turn dialogues, and built the interactive QA interface.',
    techStack: ['Python', 'LangChain', 'Vector Search & Embeddings', 'RAG Logic', 'FastAPI / Streamlit', 'Prompt Engineering'],
    highlights: [
      'Context-aware conversational memory enabling natural multi-turn troubleshooting.',
      'Vector similarity search ensuring answers are strictly grounded in reference docs.',
      'Automated fallback escalation mechanism for queries requiring human intervention.'
    ],
    github: 'https://github.com/shaikshafin-swe',
    demo: '#'
  },
  repopilot: {
    title: 'RepoPilot – Repository Onboarding Assistant',
    tag: '🚀 Open Source Developer Tool',
    hackathon: 'Open Source Initiative',
    problem: 'New contributors spend days struggling to decipher complex directory layouts, undocumented build commands, and finding beginner-friendly issues in open-source projects.',
    solution: 'RepoPilot acts as an AI repository navigator that inspects repository structures, surfaces quick setup prerequisites, automatically extracts "good first issues", and generates customized contribution checklists.',
    contribution: 'Architected the CLI and backend logic, designed GitHub API query workflows, and crafted context-aware prompt templates for code structure summarization.',
    techStack: ['Python', 'GitHub REST API', 'LLM Prompt Engineering', 'Markdown AST Parser', 'Developer Tooling'],
    highlights: [
      'Instant generation of setup guides by analyzing configuration files (package.json, pyproject.toml, Dockerfile).',
      'Intelligent extraction and ranking of good-first-issues for new contributors.',
      'Contribution checklist validator ensuring adherence to project standards.'
    ],
    github: 'https://github.com/shaikshafin-swe',
    demo: '#'
  },
  collegeassistant: {
    title: 'Smart College Assistant',
    tag: '🎓 Campus Academic AI Copilot',
    hackathon: 'VIT-AP Campus Innovation',
    problem: 'University students frequently miss crucial syllabus notices, exam room allocations, timetable changes, and faculty consultation hours scattered across disparate portals.',
    solution: 'A conversational campus copilot providing VIT-AP students with instant natural language answers to academic questions, timetable clash detection, and course material lookups.',
    contribution: 'Built the natural language query answering system, formatted the campus academic knowledge base, and connected the student query frontend.',
    techStack: ['Python', 'NLP', 'FastAPI', 'JavaScript', 'Tailwind CSS', 'DBMS / SQLite'],
    highlights: [
      'Instant answers to syllabus queries, grading rubrics, and academic calendar dates.',
      'Timetable clash analyzer helping students build conflict-free course schedules.',
      'Role-based access separating student inquiries from faculty course updates.'
    ],
    github: 'https://github.com/shaikshafin-swe',
    demo: '#'
  }
};

function initModals() {
  const modalOverlay = document.getElementById('project-detail-modal');
  const modalBody = document.getElementById('modal-dynamic-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const deepDiveBtns = document.querySelectorAll('.open-detail-btn');

  // Resume Modal Elements
  const resumeModalOverlay = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-modal-close-btn');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');

  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="project-badge gold" style="margin-bottom: 0.5rem; display: inline-block;">${data.tag}</span>
        <h2 class="font-display" style="font-size: 1.85rem; font-weight: 800; line-height: 1.2; margin-top: 0.4rem; color: var(--text-primary);">${data.title}</h2>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan); margin-top: 0.35rem;">${data.hackathon}</p>
      </div>

      <div style="display: grid; gap: 1.25rem; margin-bottom: 1.75rem;">
        <div style="background: rgba(255, 255, 255, 0.03); padding: 1.1rem; border-radius: 10px; border: 1px solid var(--border-color);">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #ef4444; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
            ⚠️ The Problem
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${data.problem}</p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); padding: 1.1rem; border-radius: 10px; border: 1px solid var(--border-color);">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #10b981; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
            💡 Engineered Solution
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${data.solution}</p>
        </div>

        <div style="background: rgba(56, 189, 248, 0.05); padding: 1.1rem; border-radius: 10px; border-left: 3px solid var(--accent-cyan);">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 0.35rem;">
            👨‍💻 Shafin's Role & Contribution
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-primary); line-height: 1.6;">${data.contribution}</p>
        </div>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Innovations</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.highlights.map(h => `
            <li style="position: relative; padding-left: 1.4rem; font-size: 0.92rem; color: var(--text-secondary);">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              ${h}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Technologies Applied</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
          ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          Explore on GitHub
        </a>
        <button class="btn btn-secondary btn-sm" onclick="closeAllModals()">
          Close Window
        </button>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  deepDiveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project');
      openProjectModal(pid);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeAllModals);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeAllModals();
    });
  }

  // Resume Modal Triggers
  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModalOverlay) {
        resumeModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeAllModals);
  }

  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) closeAllModals();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll('.detail-modal-overlay, .terminal-modal-overlay').forEach(m => {
    m.classList.remove('active');
  });
  document.body.style.overflow = '';
}
window.closeAllModals = closeAllModals;

/* ===================================================================
   7. INTERACTIVE RECRUITER COMMAND TERMINAL (CTRL+K)
   =================================================================== */
function initTerminal() {
  const terminalOverlay = document.getElementById('terminal-modal');
  const terminalBtn = document.getElementById('terminal-toggle-btn');
  const closeTermBtn = document.getElementById('terminal-close-btn');
  const terminalInput = document.getElementById('terminal-command-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (!terminalOverlay || !terminalInput || !terminalOutput) return;

  function toggleTerminal() {
    const isActive = terminalOverlay.classList.contains('active');
    if (isActive) {
      terminalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      terminalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => terminalInput.focus(), 100);
    }
  }

  if (terminalBtn) terminalBtn.addEventListener('click', toggleTerminal);
  if (closeTermBtn) closeTermBtn.addEventListener('click', toggleTerminal);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleTerminal();
    }
  });

  const commands = {
    help: () => `
<span class="code-keyword">Available commands:</span>
  <span class="code-var">bio</span>         - Brief background & identity
  <span class="code-var">skills</span>      - Technical arsenal & frameworks
  <span class="code-var">projects</span>    - List key production & hackathon projects
  <span class="code-var">aimops</span>      - Deep dive into the 1st place winning project
  <span class="code-var">hackathons</span>  - Hackathon records & awards
  <span class="code-var">education</span>   - VIT-AP degree & CGPA
  <span class="code-var">contact</span>     - Reach Shafin directly via email
  <span class="code-var">resume</span>      - Open resume modal
  <span class="code-var">github</span>      - GitHub profile link
  <span class="code-var">sudo hire</span>   - Recommended engineer action!
  <span class="code-var">clear</span>       - Clear terminal window
`,
    bio: () => `
<span class="code-keyword">Shaik Shafin</span>
Software Developer & AI Enthusiast based in Amaravati, India.
B.Tech CSE student at VIT-AP University (CGPA 8.81 / 10.0).
Specializing in agentic AI, LLM/RAG pipelines, full-stack systems, and rapid prototype development.
`,
    skills: () => `
<span class="code-keyword">Languages:</span> Java, Python, JavaScript (ES6+), C/C++, SQL
<span class="code-keyword">Computer Science:</span> DSA, OOP, DBMS, SQL, Operating Systems, Computer Networks
<span class="code-keyword">AI & GenAI:</span> LLMs, RAG, Agentic AI, Prompt Engineering, Vector Search
<span class="code-keyword">Frameworks:</span> LangChain, LangGraph, React, Node.js, FastAPI, Tailwind CSS
<span class="code-keyword">Cloud & Tools:</span> AWS, Git, GitHub, VS Code, Linux
`,
    projects: () => `
<span class="code-fn">1. AIM-OPS</span> (Winner / 250+ teams) - AI Manufacturing Intelligence
<span class="code-fn">2. UpYield</span> (Radiothon) - Smart FinTech & Fraud Detection Platform
<span class="code-fn">3. HappyTrip</span> (Google Hackathon) - Glassmorphism Travel Planner
<span class="code-fn">4. Customer Support Automation</span> (IBM SkillsBuild) - Enterprise RAG Engine
<span class="code-fn">5. RepoPilot</span> - Open-Source Repository Onboarding Assistant
<span class="code-fn">6. Smart College Assistant</span> - Campus AI Copilot
`,
    aimops: () => `
<span class="code-string">★ AIM-OPS (First Place Winner, Energy Conservation Hackathon)</span>
Built with Team Phoenix Knights against 250+ competing teams.
Identified industrial motor power anomalies and energy-use inefficiencies.
Reduced peak wastage by 34% through predictive load balancing telemetry.
`,
    hackathons: () => `
🏆 <span class="code-string">1st Place</span> - 24-Hour Energy Conservation Hackathon (AIM-OPS | 250+ Teams)
⚡ <span class="code-string">Participant / Finalist</span> - Radiothon Hackathon (UpYield FinTech)
🌐 <span class="code-string">Participant</span> - TechSprint Google Hackathon (HappyTrip Travel App)
`,
    education: () => `
VIT-AP University - School of Computer Science & Engineering (SCOPE)
Degree: Bachelor of Technology (B.Tech), Computer Science & Engineering
Location: Amaravati, Andhra Pradesh, India
Current CGPA: <span class="code-num">8.81 / 10.0</span> (Academic Target: 9.00)
`,
    contact: () => `
Email: <a href="mailto:shafin.24bcw7074@vitapstudent.ac.in" style="color:var(--accent-cyan);">shafin.24bcw7074@vitapstudent.ac.in</a>
GitHub: <a href="https://github.com/shaikshafin-swe" target="_blank" style="color:var(--accent-cyan);">github.com/shaikshafin-swe</a>
Location: Amaravati, Andhra Pradesh, India
`,
    resume: () => {
      setTimeout(() => {
        const resumeModal = document.getElementById('resume-modal');
        if (resumeModal) {
          toggleTerminal();
          resumeModal.classList.add('active');
        }
      }, 300);
      return `<span class="code-string">Launching resume viewer...</span>`;
    },
    github: () => {
      window.open('https://github.com/shaikshafin-swe', '_blank');
      return `<span class="code-string">Opening https://github.com/shaikshafin-swe in a new tab...</span>`;
    },
    'sudo hire': () => `
<span style="color:#10b981; font-weight:bold;">[SUCCESS] Authentication accepted!</span>
Shaik Shafin has been marked as a top priority hire.
Email ready: <a href="mailto:shafin.24bcw7074@vitapstudent.ac.in?subject=Interview%20Invitation%20-%20Software%20Developer%20Role" style="color:var(--accent-cyan); text-decoration:underline;">Click here to send an interview invite</a>.
`,
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      terminalInput.value = '';

      if (!cmd) return;

      const userLine = document.createElement('div');
      userLine.innerHTML = `<span style="color:var(--accent-cyan);">$</span> ${escapeHtml(rawCmd)}`;
      userLine.style.marginBottom = '0.35rem';
      terminalOutput.appendChild(userLine);

      if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      }

      const responseLine = document.createElement('div');
      responseLine.style.marginBottom = '1rem';

      if (commands[cmd]) {
        responseLine.innerHTML = commands[cmd]();
      } else {
        responseLine.innerHTML = `<span style="color:#ef4444;">Command not found: "${escapeHtml(rawCmd)}". Type <span class="code-keyword">help</span> for a list of commands.</span>`;
      }

      terminalOutput.appendChild(responseLine);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ===================================================================
   8. GITHUB INTEGRATION (LIVE API WITH RESILIENT FALLBACK)
   =================================================================== */
function initGitHubIntegration() {
  const username = 'shaikshafin-swe';
  const repoCountEl = document.getElementById('gh-repo-count');
  const followersEl = document.getElementById('gh-followers-count');
  const statusEl = document.getElementById('gh-status-text');

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error('API Rate Limited or User Not Found');
      return res.json();
    })
    .then(data => {
      if (repoCountEl && data.public_repos !== undefined) {
        repoCountEl.textContent = data.public_repos;
      }
      if (followersEl && data.followers !== undefined) {
        followersEl.textContent = data.followers;
      }
      if (statusEl) {
        statusEl.textContent = 'Active & Syncing';
        statusEl.style.color = '#10b981';
      }
    })
    .catch(() => {
      // Graceful offline fallback
      if (repoCountEl && repoCountEl.textContent === '--') repoCountEl.textContent = '6+';
      if (followersEl && followersEl.textContent === '--') followersEl.textContent = '10+';
      if (statusEl) {
        statusEl.textContent = 'Verified Profile';
        statusEl.style.color = '#38bdf8';
      }
    });
}

/* ===================================================================
   9. CONTACT FORM & INSTANT EMAIL COMPOSER
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'shafin.24bcw7074@vitapstudent.ac.in';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Copied email to clipboard!');
      }).catch(() => {
        showToast('Email: shafin.24bcw7074@vitapstudent.ac.in');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Recruiter / Collaborator';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Software Developer Inquiry';
      const message = document.getElementById('contact-message')?.value || '';

      if (!email || !message) {
        showToast('Please fill in your email and message');
        return;
      }

      const mailtoUrl = `mailto:shafin.24bcw7074@vitapstudent.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Shafin,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`)}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client...');
      form.reset();
    });
  }
}

/* ===================================================================
   10. SCROLL SPY & NAVIGATION
   =================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu-links');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar backdrop blur change
    if (navbar) {
      if (scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   12. CARD SPOTLIGHT INTERACTION (MOUSE TRACKING HIGHLIGHT)
   =================================================================== */
function initCardSpotlights() {
  const cards = document.querySelectorAll(
    '.glass-panel, .project-card, .bento-hackathon-card, .bento-rag-card, .bento-mini-card, .skill-category-card, .spotlight-card, .timeline-card, .hero-stats-ribbon, .github-metrics-card'
  );
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ===================================================================
   11. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
window.showToast = showToast;
