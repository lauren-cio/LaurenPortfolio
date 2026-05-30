// ========================================
// HAMBURGER MENU TOGGLE
// ========================================

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".burger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// ========================================
// DARK / LIGHT MODE TOGGLE
// ========================================

function initThemeToggle() {
    const toggleDesktop = document.getElementById("theme-toggle");
    const toggleMobile = document.getElementById("theme-toggle-mobile");
    const html = document.documentElement;

    // Check saved preference, else check system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        html.setAttribute("data-theme", "light");
    }
    // else: default is dark (no data-theme attribute = dark)

    function toggle() {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        if (next === "dark") {
            html.removeAttribute("data-theme");
        } else {
            html.setAttribute("data-theme", next);
        }
        localStorage.setItem("theme", next);
    }

    if (toggleDesktop) toggleDesktop.addEventListener("click", toggle);
    if (toggleMobile) toggleMobile.addEventListener("click", toggle);
}

// ========================================
// SCROLL-REVEAL ANIMATION
// ========================================

function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");

    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");

                    // Also reveal staggered children
                    const children = entry.target.querySelectorAll(
                        ".reveal-children > *"
                    );
                    children.forEach((child) => {
                        child.classList.add("active");
                    });
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    reveals.forEach((el) => observer.observe(el));

    // Also observe individual children so they get the reveal class behavior
    const revealChildren = document.querySelectorAll(".reveal-children > *");
    revealChildren.forEach((child) => {
        child.classList.add("reveal");
    });
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

function initActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "-80px 0px -50% 0px",
        }
    );

    sections.forEach((section) => observer.observe(section));
}

// ========================================
// NAVBAR BACKGROUND ON SCROLL
// ========================================

function initNavScroll() {
    const desktopNav = document.getElementById("desktop-nav");
    const burgerNav = document.getElementById("burger-nav");

    if (!desktopNav) return;

    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY > 50;
        desktopNav.classList.toggle("scrolled", scrolled);
        if (burgerNav) burgerNav.classList.toggle("scrolled", scrolled);
    });
}

// ========================================
// INITIALIZE EVERYTHING ON DOM READY
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initScrollReveal();
    initActiveNavLink();
    initNavScroll();
});
