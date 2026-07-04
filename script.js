const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
const isExportMode = new URLSearchParams(window.location.search).has("export");

if (isExportMode) {
    document.body.classList.add("export-mode");
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (!isExportMode) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

if (!isExportMode) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const activeId = `#${entry.target.id}`;
                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === activeId);
                });
            });
        },
        {
            rootMargin: "-35% 0px -50% 0px",
            threshold: 0.12
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalLabel = submitButton.textContent;
        submitButton.textContent = "Inquiry Prepared";
        submitButton.disabled = true;

        window.setTimeout(() => {
            submitButton.textContent = originalLabel;
            submitButton.disabled = false;
            contactForm.reset();
        }, 2200);
    });
}
