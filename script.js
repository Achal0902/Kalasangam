const eventsData = [
  {
    category: "Literary",
    description: "Express yourself through poetry, debate, elocution, and creative writing.",
    id: "literary",
    icon: "📚",
    bgImage: "poetry.jpeg",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLScA4Gor4h8QChokrcIVUtA6HRkhpzKkZrE8m9n8-zFteXWa0A/viewform?usp=publish-editor"
  },
  {
    category: "Theatre",
    description: "Perform with dramatics and bring characters to life on stage.",
    id: "theatre",
    icon: "🎭",
    bgImage: "theatre.jpeg",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdf40A_RgXdhvdjvN66NMHCMI-DSxU0kcK58yQCjCHvwnxcAQ/viewform?usp=publish-editor"
  },
  {
    category: "Fine Arts",
    description: "Create stunning visual art through painting, rangoli, and more.",
    id: "fine-arts",
    icon: "🎨",
    bgImage: "finearts.jpeg",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSesmfCmJDk3QgB7MLjsp1HzKzk80Idk9LlT-EvKRCR595mF4A/viewform?usp=publish-editor"
  },
  {
    category: "Music",
    description: "Showcase your musical talent with solo and group performances.",
    id: "music",
    icon: "🎵",
    bgImage: "music.jpeg",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSe6lPKpZK2ME3enbiebhOgmSWmr-Oztgy1ZVoDdqop8qgPxPw/viewform?usp=preview"
  },
  {
    category: "Dance",
    description: "Embrace the rhythm and express yourself through graceful movements.",
    id: "dance",
    icon: "💃",
    bgImage: "dance.jpeg",
    registerLink: "https://forms.gle/pCi7BaVxDkc13vR17"
  },
];

const registerLink = "https://docs.google.com/forms/d/e/1FAIpQLScA4Gor4h8QChokrcIVUtA6HRkhpzKkZrE8m9n8-zFteXWa0A/viewform?usp=publish-editor";

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

const createBanner = () => {
  if (!filtersContainer) return;

  filtersContainer.innerHTML = `
    <div class="kalasangam-wrapper">
      <!-- Main Kalasangam Section -->
      <div class="events-banner">
        <!-- Left: Kalasangam Logo/Image -->
        <div class="banner-image">
          <img src="images/KalasangamLogo2.png" alt="Kalasangam 2025 Logo" class="banner-logo">
        </div>

        <!-- Right: Content -->
        <div class="banner-content-left">
          <h2 class="banner-subtitle">A Celebration of Roots, Rhythm, and the Soul of Bharat</h2>
          
          <div class="banner-poetry">
            <p class="poetry-line">In the sacred rhythm of tabla,</p>
            <p class="poetry-line">In the graceful flow of classical dance,</p>
            <p class="poetry-line">In the poetry that touches the heart —</p>
            <p class="poetry-line highlight">lives the true spirit of our culture.</p>
          </div>

          <p class="banner-description-main">Government College of Engineering, Jalgaon humbly presents <span class="kalasangam-highlight">Kalasangam 2025</span> — not just a fest, but a heartfelt gathering of traditions, emotions, and artistic devotion.</p>

          <div class="banner-event-info">
            <p class="event-date">📅 March 28, 2025</p>
            <p class="event-venue">📍 Government College of Engineering, Jalgaon, Maharashtra</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderEvents = (filterCategory = "All") => {
  if (!eventsGrid) return;
  eventsGrid.innerHTML = "";

  const filtered =
    filterCategory === "All"
      ? eventsData
      : eventsData.filter((item) => item.category === filterCategory);

  filtered.forEach((category) => {
    const card = document.createElement("article");
    card.className = `event-card fade-in event-${category.id}`;
    card.style.backgroundImage = `linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.20)), url('images/${category.bgImage}')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
    card.innerHTML = `
      <div class="event-card-icon">${category.icon}</div>
      <h3>${category.category}</h3>
      <p>${category.description}</p>
      <div class="card-actions">
        <a class="btn primary" href="${category.registerLink}" target="_blank" rel="noopener">Register Now</a>
        <a class="btn secondary" href="rulebook.html?event=${category.id}">View Rules</a>
      </div>
    `;
    eventsGrid.appendChild(card);
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

console.log("=== CARVAAN EVENTS PAGE INITIALIZED ===");
console.log("Events Grid Element:", eventsGrid);
console.log("Filters Container:", filtersContainer);

createBanner();
renderEvents();
observeAnimations();
setActiveNav();
initTheme();
initAccordion();
handleScroll();

console.log("=== PAGE SETUP COMPLETE ===");
