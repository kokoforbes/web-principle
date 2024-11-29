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

// // Form validation for contact page
// document.addEventListener("DOMContentLoaded", () => {
//   const contactForm = document.getElementById("contact-form");
//   if (contactForm) {
//     contactForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       // Add your form validation logic here
//       console.log("Form submitted");
//     });
//   }
// });

// // Character counter for message field
// const messageField = document.getElementById("message");
// const charCounter = document.getElementById("char-counter");

// if (messageField && charCounter) {
//   messageField.addEventListener("input", () => {
//     const remainingChars = 500 - messageField.value.length;
//     charCounter.textContent = `${remainingChars} characters remaining`;
//   });
// }

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  document.getElementById(
    "captchaQuestion"
  ).textContent = `What is ${num1} + ${num2}?`;
  return num1 + num2;
}

let captchaAnswer = 0;

function updateCharCounter(textarea) {
  const counter = document.getElementById("charCounter");
  const maxLength = parseInt(textarea.getAttribute("maxlength"));
  const currentLength = textarea.value.length;
  counter.textContent = `${currentLength}/${maxLength} characters`;
  counter.classList.toggle("limit-reached", currentLength === maxLength);
}

function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const returnContact = document.getElementById("returnContact").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  const captchaInput = document.getElementById("captcha").value;

  // Reset error messages
  clearErrors();

  let isValid = true;

  // Validate all fields
  if (!name.trim()) {
    showError("name", "Name is required");
    isValid = false;
  }

  if (!email.trim()) {
    showError("email", "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email");
    isValid = false;
  }

  if (!subject.trim()) {
    showError("subject", "Subject is required");
    isValid = false;
  }

  if (!message.trim()) {
    showError("message", "Message is required");
    isValid = false;
  }

  if (!returnContact.trim()) {
    showError("returnContact", "Return contact information is required");
    isValid = false;
  }

  if (!captchaInput.trim()) {
    showError("captcha", "Please solve the captcha");
    isValid = false;
  } else if (parseInt(captchaInput) !== captchaAnswer) {
    showError("captcha", "Incorrect captcha answer");
    isValid = false;
    captchaAnswer = generateCaptcha();
    document.getElementById("captcha").value = "";
  }

  if (isValid) {
    // Here you would typically send the form data to a server
    alert("Message sent successfully!");
    event.target.reset();
    captchaAnswer = generateCaptcha();
  }
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => error.remove());
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageTextarea = document.getElementById("message");

  // Initialize captcha
  captchaAnswer = generateCaptcha();

  // Add event listeners
  form.addEventListener("submit", validateForm);
  messageTextarea.addEventListener("input", () =>
    updateCharCounter(messageTextarea)
  );

  // Initial character counter update
  updateCharCounter(messageTextarea);
});
