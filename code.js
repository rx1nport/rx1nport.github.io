/* Reveals */
const obs = new IntersectionObserver(
  e => { e.forEach(x=>x.target.classList.toggle("visible", x.isIntersecting)); },
  { threshold:0.1 }
);
document.querySelectorAll("section").forEach(s=>obs.observe(s));

/* Pulse */
const ring = document.getElementById("pfpRing");
let isPulsing = false;

document.getElementById("pfpTrigger").addEventListener("mouseenter", () => {
  if (isPulsing) return;

  ring.classList.remove("pulse");
  void ring.offsetWidth;
  ring.classList.add("pulse");

  isPulsing = true;
  ring.addEventListener("animationend", () => {
    isPulsing = false;
  }, { once: true });
  setTimeout(() => 20);
});   

/* Slideshow Arrows */
document.querySelectorAll("[data-slideshow]").forEach(card => {
  const slides = card.querySelectorAll("img");
  let i = 0;

  const showSlide = idx => {
    slides.forEach(s=>s.classList.remove("active"));
    slides[idx].classList.add("active");
  }

  /* Slideshow */
  setInterval(() => { i = (i+1)%slides.length; showSlide(i); }, 4000);

  /* Arrows */
  const left = card.querySelector(".thumb-nav.left");
  const right = card.querySelector(".thumb-nav.right");
  left.addEventListener("click", () => { i = (i-1+slides.length)%slides.length; showSlide(i); });
  right.addEventListener("click", () => { i = (i+1)%slides.length; showSlide(i); });
});
