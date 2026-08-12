lucide.createIcons();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; particles = Array.from({ length: Math.min(36, Math.floor(canvas.width / 28)) }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.4 + .3, speed: Math.random() * .16 + .03 })); }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#59736d'; particles.forEach((p) => { p.y -= p.speed; if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; } ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }); requestAnimationFrame(animate); }
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { resizeCanvas(); window.addEventListener('resize', resizeCanvas); animate(); }
