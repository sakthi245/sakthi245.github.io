lucide.createIcons();
document.getElementById('year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const mobileLinks = [...document.querySelectorAll('.mobile-nav a')];
const linkByTarget = new Map(mobileLinks.map((link) => [link.getAttribute('href').slice(1), link]));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    mobileLinks.forEach((link) => link.classList.remove('active'));
    const active = linkByTarget.get(entry.target.id);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));
