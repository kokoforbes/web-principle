//toggle menu
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.getElementById("primary-navigation");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
  menuToggle.setAttribute("aria-expanded", !expanded);
  primaryNav.classList.toggle("show");
});

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered successfully:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

// Form validation for contact page
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add your form validation logic here
      console.log("Form submitted");
    });
  }
});

// Character counter for message field
const messageField = document.getElementById("message");
const charCounter = document.getElementById("char-counter");

if (messageField && charCounter) {
  messageField.addEventListener("input", () => {
    const remainingChars = 500 - messageField.value.length;
    charCounter.textContent = `${remainingChars} characters remaining`;
  });
}
