
// Get references to DOM elements
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

// Show sidebar on hamburger click
hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
});

// Close sidebar on close button click
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});
