/* ===== SITE SETTINGS: add your real links here. Empty = hidden. ===== */
const CONFIG = {
  email: "",      // e.g. "yourname@gmail.com"
  social: []      // e.g. [{name:"GitHub", url:"https://github.com/yourname"}]
};
/* ==================================================================== */
document.documentElement.classList.add("js");
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const setMenu = o => { burger.classList.toggle("open", o); menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });

const pc = $("#particles");
if (pc && !reduce) for (let i = 0; i < 22; i++) {
  const p = document.createElement("i");
  p.style.cssText = `left:${Math.random() * 100}%;top:${30 + Math.random() * 70}%;animation-duration:${6 + Math.random() * 8}s;animation-delay:${-Math.random() * 10}s`;
  pc.appendChild(p);
}

const imgs = $$("#slider img"), dots = $$("#dots button"); let cur = 0, timer;
const show = n => { cur = (n + imgs.length) % imgs.length; imgs.forEach((im, i) => im.classList.toggle("on", i === cur)); dots.forEach((d, i) => d.classList.toggle("on", i === cur)); };
const play = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(cur + 1), 4200); };
dots.forEach((d, i) => d.addEventListener("click", () => { show(i); play(); })); play();

const dev = $("#devimg"), devSec = $("#developer");
if (dev && !reduce) addEventListener("scroll", () => {
  const r = devSec.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
  const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
  dev.style.transform = `translateX(${p * -26}px) scale(1.12)`;
}, { passive: true });

$$("[data-open]").forEach(b => b.addEventListener("click", () => $("#" + b.dataset.open).showModal()));
$$("dialog").forEach(d => d.addEventListener("click", e => e.target === d && d.close()));

if (CONFIG.email) { const b = $("#contact-btn"); b.href = "mailto:" + CONFIG.email; b.hidden = false; $("#contact-note").textContent = "Questions or feedback? Get in touch."; }
CONFIG.social.forEach(s => { const a = document.createElement("a"); a.href = s.url; a.textContent = s.name; a.target = "_blank"; a.rel = "noopener noreferrer"; $("#social").appendChild(a); });
