const menuToggle = document.querySelector(".menu-toggle"),
  primaryNav = document.getElementById("primary-navigation");

menuToggle.addEventListener("click", () => {
  let e = "true" === menuToggle.getAttribute("aria-expanded");
  menuToggle.setAttribute("aria-expanded", !e),
    primaryNav.classList.toggle("show");
}),
  // Check if the browser supports service workers
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
