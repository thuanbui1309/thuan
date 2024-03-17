// Responsive menu bar
const menu_bar = document.getElementById("header__menu-bar");
const overlay = document.getElementById("overlay");

menu_bar.addEventListener("click", () => {
    let overlayDisplay = window.getComputedStyle(overlay).getPropertyValue('display');

    if (overlayDisplay === "none") {
        menu_bar.src = "images/header-exit.png";
        overlay.style.display = "block";
    } else if (overlayDisplay === "block") {
        menu_bar.src = "images/header-menu.png";
        overlay.style.display = "none";
    }
});

overlay.addEventListener("click", () => {
    menu_bar.src = "images/header-menu.png";
    overlay.style.display = "none";
});

// Enhancement 1: Highlight current page in menu bar
const menu_links = document.querySelectorAll('nav a');
let current_page = window.location.pathname.replace('/', '');

menu_links.forEach( link => {
    if(link.getAttribute('href') === current_page) {
        link.classList.add('active');
    }
});