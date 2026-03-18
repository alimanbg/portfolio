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
  const modalHighlights = document.getElementById("modalHighlights");

  // Company data – keys match data-company attributes and logo file names
  const companyData = {
    soapcycling: {
      name: "Soap Cycling",
      role: "Operations Intern",
      dates: "Jan 2024 – Apr 2024",
      highlights: [
        "Coordinated volunteer schedules for weekly recycling events",
        "Managed inventory and supply chain for soap collection",
        "Assisted in community outreach programs",
      ],
    },
    cantonet: {
      name: "CantoNet",
      role: "Data Scientist",
      dates: "Sep 2025 – Feb 2026",
      highlights: [
        "Developed predictive models for user engagement",
        "Analyzed large datasets using Python and SQL",
        "Presented insights to stakeholders",
      ],
    },
    campusx: {
      name: "Campus X",
      role: "Tech & Stem Analyst",
      dates: "Oct 2025 – Present",
      highlights: [
        "Conducted research on emerging technologies",
        "Prepared reports and presentations for university partners",
        "Organized STEM workshops for students",
      ],
    },
    zeno: {
      name: "Zeno Ltd.",
      role: "Machine Learning Intern",
      dates: "Mar 2026 – Present",
      highlights: [
        "Built and fine‑tuned NLP models",
        "Collaborated on MLOps pipeline development",
        "Contributed to model deployment on cloud platforms",
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
