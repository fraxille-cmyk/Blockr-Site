// Subtle parallax + reveal on scroll
const reveals = document.querySelectorAll(".feature, .privacy__card, .steps li, .section-head, .cta__inner");
reveals.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

reveals.forEach(el => io.observe(el));

// Mouse parallax on hero phone
const heroPhone = document.querySelector(".hero__phone");
const orbitSystem = document.querySelector(".orbit-system");
const hero = document.querySelector(".hero");
if (heroPhone && hero) {
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    heroPhone.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0)`;
    if (orbitSystem) {
      orbitSystem.style.transform = `translate(calc(-50% + ${x * 18}px), calc(-50% + ${y * 14}px))`;
    }
  });
  hero.addEventListener("mouseleave", () => {
    heroPhone.style.transform = "";
    if (orbitSystem) orbitSystem.style.transform = "translate(-50%, -50%)";
  });
}

// Subtle 3D tilt on feature phones following pointer.
// Excludes cluster phones — they already have CSS-defined positions/rotations
// that an inline transform would overwrite, causing them to "snap" away
// from their layout when hovered.
document.querySelectorAll(".feature__visual > .phone").forEach(phone => {
  phone.addEventListener("mousemove", (e) => {
    const r = phone.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    phone.style.transform = `perspective(2200px) rotateY(${x * 18}deg) rotateX(${-y * 12}deg)`;
  });
  phone.addEventListener("mouseleave", () => {
    phone.style.transform = "";
  });
});
