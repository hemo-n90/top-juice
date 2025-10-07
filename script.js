// عناصر عامة
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const search = document.getElementById("search");
const clearBtn = document.getElementById("clearSearch");
const toTop = document.getElementById("toTop");

// Mobile menu toggle
menuToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));

// Smooth scroll لكل الروابط داخل الصفحة
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks?.classList.remove("open");
    }
  });
});

// Search filter
const cards = Array.from(document.querySelectorAll(".card"));
function normalize(text) {
  return (text || "").toString().toLowerCase();
}
function filterCards() {
  const q = normalize(search?.value);
  cards.forEach((card) => {
    const name = normalize(card.dataset.name);
    card.style.display = !q || name.includes(q) ? "" : "none";
  });
}
search?.addEventListener("input", filterCards);
clearBtn?.addEventListener("click", () => {
  if (!search) return;
  search.value = "";
  filterCards();
  search.focus();
});

// Back to top
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) toTop?.classList.add("show");
  else toTop?.classList.remove("show");
});
toTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// سنة الفوتر
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== Lightbox (صورة مكبرة عند الضغط على البطاقة) =====
const lb = {
  root: document.getElementById("imgLightbox"),
  img: document.getElementById("lightboxImage"),
  caption: document.getElementById("lightboxCaption"),
  closeBtn: document.getElementById("lightboxClose"),
};

// تحميل مسبق للصورة
function preload(url) {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(url);
    i.onerror = reject;
    i.src = url;
  });
}

async function openCardImage(card) {
  const imgEl = card.querySelector("img.thumb");
  if (!imgEl) return;
  const caption = (card.dataset.name || imgEl.alt || "").trim();

  // جرّب data-full، وإن فشل استخدم src (المطلق والمرمّز)
  const candidate = imgEl.dataset.full || imgEl.src;

  try {
    const okUrl = await preload(candidate);
    showLightbox(okUrl, caption);
  } catch {
    try {
      const fallbackUrl = await preload(imgEl.src);
      showLightbox(fallbackUrl, caption);
    } catch {
      alert("تعذر تحميل الصورة. تحقق من اسم الملف والمسار والامتداد.");
    }
  }
}

function showLightbox(url, captionText) {
  if (!lb.root || !lb.img) return;
  lb.img.src = url;
  lb.img.alt = captionText || "";
  if (lb.caption) lb.caption.textContent = captionText || "";
  lb.root.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lb.root) return;
  lb.root.classList.remove("show");
  document.body.style.overflow = "";
  if (lb.img) {
    lb.img.src = "";
    lb.img.alt = "";
  }
  if (lb.caption) lb.caption.textContent = "";
}

// فتح عند الضغط على أي بطاقة
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  openCardImage(card);
});

// إغلاقات
lb.closeBtn?.addEventListener("click", closeLightbox);
lb.root?.addEventListener("click", (e) => {
  if (e.target === lb.root) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// const landingPage = document.querySelector(".landing-Page");
// const imgsArray = ["hero.1.jpg", "hero.2.jpg", "hero.3.jpg"];
// let currentIndex = 2;
// let backgroundInterval = null;

// // ضبط أول صورة
// landingPage.style.backgroundImage = `url("Image/${imgsArray[currentIndex]}")`;

// function startSlideshow() {
//   // إذا كان شغال مسبقاً لا تعيده
//   if (backgroundInterval !== null) return;

//   backgroundInterval = setInterval(() => {
//     // تقدّم للعنصر التالي
//     currentIndex = (currentIndex + 1) % imgsArray.length;
//     landingPage.style.backgroundImage = `url("Image/${imgsArray[currentIndex]}")`;
//   }, 5000); // غيّر المدة إذا تبغى سرعة مختلفة
// }

// startSlideshow();

// // دوال اختيارية للإيقاف وإعادة التشغيل إذا احتجتها
// function stopSlideshow() {
//   clearInterval(backgroundInterval);
//   backgroundInterval = null;
// }
// function restartSlideshow() {
//   stopSlideshow();
//   startSlideshow();
// }
