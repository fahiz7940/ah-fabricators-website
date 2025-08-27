// -----------------------------
// Theme Toggle Functionality
// -----------------------------
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Load saved theme or default
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// -----------------------------
// Mobile Navigation
// -----------------------------
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// -----------------------------
// Scroll handling with throttling
// -----------------------------
const navbar = document.querySelector(".navbar");
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleNavbarScroll();
      updateActiveNavLink();
      ticking = false;
    });
    ticking = true;
  }
});

function handleNavbarScroll() {
  navbar.style.background = window.scrollY > 50
    ? "rgba(45, 45, 45, 0.98)"
    : "rgba(45, 45, 45, 0.95)";
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

// -----------------------------
// Work Gallery Filter
// -----------------------------
const categoryBtns = document.querySelectorAll(".category-btn");
const workItems = document.querySelectorAll(".work-item");

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    workItems.forEach((item) => {
      const match = category === "all" || item.dataset.category === category;
      item.style.display = match ? "block" : "none";
      // For smoother animations, you can use CSS transitions
      item.style.opacity = match ? "1" : "0";
      item.style.transform = match ? "scale(1)" : "scale(0.8)";
    });
  });
});

// -----------------------------
// Contact Form Handling (EmailJS)
// -----------------------------
const contactForm = document.getElementById("contactForm");
emailjs.init("bMYIAnE-5vydl-CWs");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  const formData = {
    from_name: contactForm.name.value,
    from_email: contactForm.email.value,
    phone: contactForm.phone.value,
    message: contactForm.message.value,
    to_email: "ahfabricators1@gmail.com"
  };

  emailjs.send("service_4vvqysg", "template_k1u5olg", formData)
    .then(() => {
      alert("✅ Thank you! Your message has been sent.");
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, (error) => {
      alert("❌ Something went wrong. Try again.");
      console.error(error);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
});

// -----------------------------
// Intersection Observer for Animations
// -----------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-item, .contact-item, .about-text, .about-image")
    .forEach(el => observer.observe(el));
});

// -----------------------------
// Work Item Hover & Click Effects
// -----------------------------
workItems.forEach((item) => {
  item.addEventListener("mouseenter", () => item.style.transform = "translateY(-10px) scale(1.02)");
  item.addEventListener("mouseleave", () => item.style.transform = "translateY(0) scale(1)");
  item.addEventListener("click", () => {
    const title = item.querySelector("h4").textContent;
    console.log(`Clicked on: ${title}`);
  });
});
