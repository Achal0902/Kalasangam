const eventsData = [
  {
    category: "Literary",
    events: [
      {
        name: "Poetry",
        description: "Express powerful verses with rhythm and emotion.",
        max: "5 solo",
        id: "poetry",
      },
      {
        name: "Elocution",
        description: "Persuasive speaking with clarity and confidence.",
        max: "5 solo",
        id: "elocution",
      },
      {
        name: "Debate",
        description: "Argue your stance with logic and teamwork.",
        max: "2 teams of 2 members",
        id: "debate",
      },
      {
        name: "Essay Writing",
        description: "Craft thoughtful ideas into structured essays.",
        max: "5 solo",
        id: "essay-writing",
      },
    ],
  },
  {
    category: "Music",
    events: [
      {
        name: "Solo Singing",
        description: "Solo melodies that capture the stage.",
        max: "5 solo",
        id: "solo-singing",
      },
      {
        name: "Group Singing",
        description: "Harmony, coordination, and musical unity.",
        max: "1 team max 6 members",
        id: "solo-singing",
      },
      {
        name: "Instrumental Music",
        description: "Showcase your instrumental mastery.",
        max: "5 solo",
        id: "instrumental-music",
      },
    ],
  },
  {
    category: "Dance",
    events: [
      {
        name: "Solo Dance",
        description: "Graceful moves and high-energy performance.",
        max: "5 solo",
        id: "solo-dance",
      },
      {
        name: "Group Dance",
        description: "Synchronize steps with your crew.",
        max: "1 team max 6 members",
        id: "group-dance",
      },
    ],
  },
  {
    category: "Fine Arts",
    events: [
      {
        name: "Rangoli",
        description: "Traditional designs with vibrant creativity.",
        max: "5 solo",
        id: "rangoli",
      },
      {
        name: "On the Spot Painting",
        description: "Paint instantly with imagination and flair.",
        max: "5 solo",
        id: "on-the-spot-painting",
      },
    ],
  },
  {
    category: "Theatre",
    events: [
      {
        name: "Mimicry",
        description: "Perform impressions with a dramatic twist.",
        max: "5 solo",
        id: "mimicry",
      },
    ],
  },
  {
    category: "Spot Photography",
    events: [
      {
        name: "Spot Photography",
        description: "Capture the moment with your lens.",
        max: "5 solo",
        id: "spot-photography-event",
      },
    ],
  },
];

const registerLink = "https://forms.gle/your-form-link";

const eventsGrid = document.getElementById("eventsGrid");
const filtersContainer = document.getElementById("filters");
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");
const scrollTopBtn = document.getElementById("scrollTop");
const navbar = document.querySelector(".navbar");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const setActiveNav = () => {
  const page = document.body.dataset.page;
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    const linkHref = link.getAttribute("href");
    link.classList.remove("active");

    if (page === "events" && linkHref === "#events") {
      link.classList.add("active");
    }

    if (page === "rulebook" && linkHref === "#top") {
      link.classList.add("active");
    }
  });
};

const createFilters = () => {
  if (!filtersContainer) return;

  const categories = ["All", ...eventsData.map((item) => item.category)];
  filtersContainer.innerHTML = "";

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.textContent = category;
    if (index === 0) button.classList.add("active");

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderEvents(category);
    });

    filtersContainer.appendChild(button);
  });
};

const renderEvents = (filterCategory = "All") => {
  if (!eventsGrid) return;
  eventsGrid.innerHTML = "";

  const filtered =
    filterCategory === "All"
      ? eventsData
      : eventsData.filter((item) => item.category === filterCategory);

  filtered.forEach((group) => {
    group.events.forEach((event) => {
      const card = document.createElement("article");
      card.className = `event-card fade-in event-${event.id}`;
      card.innerHTML = `
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <p class="event-meta">Max Participants: ${event.max}</p>
        <div class="card-actions">
          <a class="btn primary" href="${registerLink}" target="_blank" rel="noopener">Register</a>
          <a class="btn ghost" href="rulebook.html#${event.id}">View Rules</a>
        </div>
      `;
      eventsGrid.appendChild(card);
    });
  });

  observeAnimations();
};

const observeAnimations = () => {
  const items = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
};

const toggleMenu = () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  hamburger.setAttribute("aria-expanded", isOpen);
};

const handleScroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
    scrollTopBtn.classList.add("show");
  } else {
    navbar.classList.remove("scrolled");
    scrollTopBtn.classList.remove("show");
  }
};

const setTheme = (mode) => {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  themeIcon.textContent = mode === "dark" ? "🌙" : "☀️";
};

const initTheme = () => {
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
};

const initAccordion = () => {
  const items = document.querySelectorAll(".accordion-item");
  if (!items.length) return;

  items.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const panel = item.querySelector(".accordion-panel");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach((other) => {
        other.classList.remove("active");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
};

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

if (navLinks) {
  navLinks.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-link")) {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
    }
  });
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

window.addEventListener("scroll", handleScroll);

createFilters();
renderEvents();
observeAnimations();
setActiveNav();
initTheme();
initAccordion();
handleScroll();
