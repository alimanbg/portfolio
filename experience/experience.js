document.addEventListener("DOMContentLoaded", () => {
  const cityscape = document.getElementById("cityscape");
  const character = document.getElementById("character");
  const buildings = document.querySelectorAll(".building[data-company]"); // only those with data-company (exclude mystery)
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModal");
  const modalLogo = document.getElementById("modalLogo");
  const modalTitle = document.getElementById("modalTitle");
  const modalRole = document.getElementById("modalRole");
  const modalDates = document.getElementById("modalDates");
  const modalLocation = document.getElementById("modalLocation");
  const modalHighlights = document.getElementById("modalHighlights");

  // Company data – keys match data-company attributes and logo file names
  const companyData = {
    soapcycling: {
      name: "Soap Cycling",
      role: "Operations Intern",
      dates: "Jan 2024 – Apr 2024",
      location: "Hong Kong S.A.R • Hybrid",
      highlights: [
        "Streamlined data accuracy and accessibility by inputting and organizing datasets of over 50,000 inventory, customer, and stakeholder records using AirTable",
        "Optimized database connectivity between tables, improving data management practices and accessibility across the organization",
        "Designed and administered complex surveys to gather project-specific data; performed detailed data analysis and presented actionable insights to supervisors",
      ],
    },
    cantonet: {
      name: "CantoNet Cultured Ltd.",
      role: "Operations Lead",
      dates: "Sep 2025 – Present",
      location: "Hong Kong S.A.R • On-site",
      highlights: [
        "Spearheaded comprehensive analytics across 20+ operational datasets (customer data, sales, social media) using Python (pandas, NumPy) and Tableau dashboards, resulting in 38% reach growth and 22% engagement lift",
        "Architected complete database redesign using NocoDB with optimized entity relationships between customer data, class attendance, events, and financial data, reducing duplicate records from 10% to 1.3%",
        "Managed teams of 10+ interns; implemented Google Sheets/Apps Script task systems with automated email reminders, reducing onboarding time through improved productivity tracking",
      ],
    },
    campusx: {
      name: "Campus X",
      role: "STEM and Tech Analyst",
      dates: "Oct 2025 – Present",
      location: "Hong Kong, S.A.R • On-site",
      highlights: [
        "Delivered workshops on AI route mapping using custom website tools and micro:bit programming for ages 4-16, adapting data-driven lesson structures with rewarding systems for younger students and real-world connections for older students",
        "Instructed diverse classes of 2-30 students (ages 6-15) in micro:bit programming, Rice mini robot assembly, 3D design using Tinkercad, and Python/Jupyter Notebook coding",
        "Taught progressive curriculum from basic programming to delivery robot programming, machine learning, LLMs, NLP, and computer vision, developing algorithmic thinking and technical problem-solving skills",
      ],
    },
    zeno: {
      name: "Zeno Ltd.",
      role: "ML Engineer Intern",
      dates: "Mar 2026 – Present",
      location: "Hong Kong S.A.R • Hybrid",
      highlights: [
        "Engineered a production-ready AI agent using LangChain and Composio SDK after extensive research into MCP implementation methods, enabling natural-language control of Gmail and Google Calendar with 27 actions",
        "Built a multilingual RAG chatbot supporting English, Traditional Chinese, and Mandarin Chinese for client delivery, eliminating manual typing while maintaining high information throughput",
        "Led the design and optimization of Prompify's landing page using dynamic decision trees for prompt engineering, replacing multi-step questions with click-based interactions and reducing API costs by 25% through optimized token usage",
      ],
    },
  };

  // Helper: get building's left position in percentages relative to cityscape
  function getBuildingLeft(building) {
    const cityscapeRect = cityscape.getBoundingClientRect();
    const buildingRect = building.getBoundingClientRect();
    const left =
      ((buildingRect.left - cityscapeRect.left) / cityscapeRect.width) * 100;
    return left;
  }

  // Move character horizontally only (bottom stays at 10%)
  function moveCharacter(left) {
    character.style.left = left + "%";
    // bottom remains unchanged (already 10%)
  }

  // Open modal with company data
  function openModal(companyId) {
    const data = companyData[companyId];
    if (!data) return;

    modalLogo.src = `${companyId}.jpg`;
    modalLogo.alt = `${data.name} logo`;
    modalTitle.textContent = data.name;
    modalRole.textContent = data.role;
    modalDates.textContent = data.dates;
    modalLocation.textContent = data.location;

    modalHighlights.innerHTML = "";
    data.highlights.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    modalOverlay.style.display = "flex";
  }

  // Close modal
  function closeModal() {
    modalOverlay.style.display = "none";
  }

  // Event: building click (only for real companies)
  buildings.forEach((building) => {
    building.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetLeft = getBuildingLeft(building);
      moveCharacter(targetLeft);

      character.addEventListener(
        "transitionend",
        () => {
          const companyId = building.getAttribute("data-company");
          openModal(companyId);
        },
        { once: true },
      );
    });
  });

  // Click on cityscape (background) sends character home and closes modal
  cityscape.addEventListener("click", (e) => {
    if (e.target === cityscape) {
      moveCharacter(5); // home left position
      character.addEventListener(
        "transitionend",
        () => {
          closeModal();
        },
        { once: true },
      );
    }
  });

  // Close modal via close button or clicking outside modal content
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Initialise
  moveCharacter(5);
  modalOverlay.style.display = "none";
});
