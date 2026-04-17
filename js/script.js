// ========================================
// 1ST GROUP ACADEMY - MAIN JAVASCRIPT
// ========================================

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 300);
});

// HAMBURGER MENU
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // FAQ TOGGLE
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

  // COUNTER
  let counted = false;
  const countersEl = document.querySelector('.counters');

  if (countersEl) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;

        document.querySelectorAll('.counter-num').forEach(counter => {
          const target = +counter.dataset.target;
          let count = 0;
          const step = Math.ceil(target / 60);

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            counter.textContent = count;
          }, 30);
        });
      }
    }, { threshold: 0.5 });

    observer.observe(countersEl);
  }

  // ========================================
  // MULTI LANGUAGE SYSTEM
  // ========================================

  let currentLang = localStorage.getItem('preferredLanguage') || 'en';

  function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.dataset.translate;

      if (t[key]) {
        if (key === 'hero_title') {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
  }

  // BUTTON CLICK
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      changeLanguage(btn.dataset.lang);
    });
  });

  // INITIAL LOAD
  changeLanguage(currentLang);

});

// ========================================
// CONTACT FORM (API)
// ========================================

async function submitForm() {
  const data = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone").value,
    course: document.getElementById("courseSelect").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("https://onestgroupapi.onrender.com/api/contact/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById("successMsg").style.display = "block";

      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("courseSelect").value = "";
      document.getElementById("message").value = "";
    } else {
      alert(result.error || "Error");
    }

  } catch (error) {
    alert("Server error");
  }
}

// ========================================
// INSTRUCTORS CAROUSEL
// ========================================

function scrollInstructors(direction) {
  const carousel = document.getElementById('instructorsCarousel');

  if (carousel) {
    const card = carousel.querySelector('.instructor-card');
    const width = card ? card.offsetWidth + 28 : 300;

    carousel.scrollBy({
      left: direction * width,
      behavior: 'smooth'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prevInstructorBtn')?.addEventListener('click', () => scrollInstructors(-1));
  document.getElementById('nextInstructorBtn')?.addEventListener('click', () => scrollInstructors(1));
});