const menuToggle = document.querySelector(".menu-toggle"),
  primaryNav = document.getElementById("primary-navigation");
function generateCaptcha() {
  let e = Math.floor(10 * Math.random()),
    t = Math.floor(10 * Math.random());
  return (
    (document.getElementById(
      "captchaQuestion"
    ).textContent = `What is ${e} + ${t}?`),
    e + t
  );
}
menuToggle.addEventListener("click", () => {
  let e = "true" === menuToggle.getAttribute("aria-expanded");
  menuToggle.setAttribute("aria-expanded", !e),
    primaryNav.classList.toggle("show");
}),
  "serviceWorker" in navigator &&
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((e) => {
          console.log("Service Worker registered successfully:", e.scope);
        })
        .catch((e) => {
          console.log("Service Worker registration failed:", e);
        });
    });
let captchaAnswer = 0;
function updateCharCounter(e) {
  let t = document.getElementById("charCounter"),
    r = parseInt(e.getAttribute("maxlength")),
    a = e.value.length;
  (t.textContent = `${a}/${r} characters`),
    t.classList.toggle("limit-reached", a === r);
}
function validateForm(e) {
  e.preventDefault();
  let t = document.getElementById("name").value,
    r = document.getElementById("email").value,
    a = document.getElementById("returnContact").value,
    n = document.getElementById("subject").value,
    s = document.getElementById("message").value,
    o = document.getElementById("captcha").value;
  clearErrors();
  let l = !0;
  t.trim() || (showError("name", "Name is required"), (l = !1)),
    r.trim()
      ? isValidEmail(r) ||
        (showError("email", "Please enter a valid email"), (l = !1))
      : (showError("email", "Email is required"), (l = !1)),
    n.trim() || (showError("subject", "Subject is required"), (l = !1)),
    s.trim() || (showError("message", "Message is required"), (l = !1)),
    a.trim() ||
      (showError("returnContact", "Return contact information is required"),
      (l = !1)),
    o.trim()
      ? parseInt(o) !== captchaAnswer &&
        (showError("captcha", "Incorrect captcha answer"),
        (l = !1),
        (captchaAnswer = generateCaptcha()),
        (document.getElementById("captcha").value = ""))
      : (showError("captcha", "Please solve the captcha"), (l = !1)),
    l &&
      (alert("Message sent successfully!"),
      e.target.reset(),
      (captchaAnswer = generateCaptcha()));
}
function showError(e, t) {
  let r = document.getElementById(e),
    a = document.createElement("div");
  (a.className = "error-message"),
    (a.textContent = t),
    r.parentNode.appendChild(a);
}
function clearErrors() {
  let e = document.querySelectorAll(".error-message");
  e.forEach((e) => e.remove());
}
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
document.addEventListener("DOMContentLoaded", () => {
  let e = document.getElementById("contactForm"),
    t = document.getElementById("message");
  (captchaAnswer = generateCaptcha()),
    e.addEventListener("submit", validateForm),
    t.addEventListener("input", () => updateCharCounter(t)),
    updateCharCounter(t);
});
