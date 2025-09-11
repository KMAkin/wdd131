document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
        // Toggle active class on nav
        nav.classList.toggle("active");

        // Change button symbol between ☰ and ✖
        if (hamburger.textContent === "☰") {
            hamburger.textContent = "✖"; // close icon
        } else {
            hamburger.textContent = "☰"; // hamburger icon
        }
    });
});
