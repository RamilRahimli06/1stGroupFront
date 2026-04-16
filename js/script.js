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

// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// COUNTER ANIMATION
let counted = false;
const countObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.counter-num').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        counter.textContent = count.toLocaleString();
      }, 30);
    });
  }
}, { threshold: 0.5 });

const countersEl = document.querySelector('.counters');
if (countersEl) countObserver.observe(countersEl);

// FAQ TOGGLE
function toggleFaq(element) {
  const item = element.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Attach FAQ event listeners
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => toggleFaq(q));
});

// ========================================
// EMAILJS CONFIGURATION
// HOW TO SET UP (one-time, free):
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add Gmail as an Email Service → copy your SERVICE ID below
// 3. Create an Email Template with these variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{course}}, {{message}}
//    Set "To Email" in the template to: baktiyarli2006@gmail.com
//    Copy your TEMPLATE ID below
// 4. Go to Account → API Keys → copy your PUBLIC KEY below
// ========================================
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJkLmNoP'

// CONTACT FORM SUBMIT — sends email directly to baktiyarli2006@gmail.com via EmailJS
function submitForm() {
  const fname   = (document.getElementById('fname')?.value || '').trim();
  const lname   = (document.getElementById('lname')?.value || '').trim();
  const email   = (document.getElementById('email')?.value || '').trim();
  const phone   = (document.getElementById('phone')?.value || '').trim();
  const course  = (document.getElementById('courseSelect')?.value || '').trim();
  const message = (document.getElementById('message')?.value || '').trim();

  if (!fname || !email || !course) {
    alert('Please fill in your name, email, and select a course.');
    return;
  }

  const submitBtn = document.querySelector('.form-submit');
  const successMsg = document.getElementById('successMsg');

  // Disable button while sending
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  // Send via EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  fname + ' ' + lname,
    from_email: email,
    phone:      phone || '—',
    course:     course,
    message:    message || '—',
    to_email:   'baktiyarli2006@gmail.com'
  })
  .then(() => {
    // Success
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.textContent = '✅ Thank you! We\'ll contact you within 24 hours.';
      setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    }

    // Clear form fields
    ['fname','lname','email','phone','courseSelect','message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  })
  // .catch((error) => {
  //   console.error('EmailJS error:', error);
  //   alert('Failed to send message. Please call us directly at +994 (55) 580-06-12.');
  // })
  .finally(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Enrollment Request →';
    }
  });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks) navLinks.classList.remove('open');
    }
  });
});

// ========================================
// INSTRUCTORS CAROUSEL SCROLL FUNCTION
// ========================================

function scrollInstructors(direction) {
  const carousel = document.getElementById('instructorsCarousel');
  if (carousel) {
    const card = carousel.querySelector('.instructor-card');
    const cardWidth = card ? card.offsetWidth + 28 : 308; // width + gap
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }
}

// Attach carousel button event listeners
const prevBtn = document.getElementById('prevInstructorBtn');
const nextBtn = document.getElementById('nextInstructorBtn');

if (prevBtn) {
  prevBtn.addEventListener('click', () => scrollInstructors(-1));
}
if (nextBtn) {
  nextBtn.addEventListener('click', () => scrollInstructors(1));
}

// ========================================
// MULTI-LANGUAGE SYSTEM
// ========================================

const translations = {
  en: {
    nav_about: "About", nav_courses: "Courses", nav_instructors: "Instructors",
    nav_testimonials: "Reviews", nav_faq: "FAQ", nav_contact: "Contact",
    nav_enroll: "Enroll Now",
    hero_badge: "⭐ Trusted by 5,000+ Students Worldwide",
    hero_title: 'Master Languages & <span>Digital Skills</span> with 1st Group Academy',
    hero_subtitle: "Expert-led language programs and professional development courses. IELTS, SAT, Business English, Grammar, and Social Media Marketing — all designed to achieve real results.",
    hero_browse_courses: "🎓 Browse Courses", hero_learn_more: "▶ Learn More",
    hero_students: "Students", hero_satisfaction: "Satisfaction", hero_experts: "Experts",
    hero_course_preview_title: "Live Interactive Classes", hero_course_progress_label: "78% Complete",
    about_label: "About Us", about_title: "Why Choose 1st Group Academy?",
    about_p1: "1ST Group Academy is a modern educational center dedicated to developing individuals through practical and results-oriented training programs. We specialize in language and professional development.",
    about_p2: "Our mission is not just to provide certificates, but to form real and sustainable skills — fluent speaking, correct grammar, academic and business communication, high exam results, and digital skills.",
    about_feature_1: "✓ IELTS, SAT, and international exam preparation",
    about_feature_2: "✓ General, Business, and Grammar English programs",
    about_feature_3: "✓ Social Media Marketing (SMM) practical training",
    about_feature_4: "✓ Experienced instructors with real-world expertise",
    about_get_started: "Get Started Today →",
    courses_label: "Our Programs", courses_title: "Explore Our Courses",
    courses_sub: "From beginners to advanced professionals — find the perfect course to match your goals.",
    course_badge_bestseller: "Bestseller", course_badge_popular: "Popular", course_badge_new: "New",
    course_tag_all_levels: "All Levels",
    course_ielts_title: "IELTS Preparation", course_ielts_desc: "Strategy-based preparation with real exam simulations, individual feedback, and speaking intensives.",
    course_sat_title: "SAT (Verbal)", course_sat_desc: "Systematic program focused on academic reading, critical analysis, and advanced vocabulary.",
    course_general_english_title: "General English", course_general_english_desc: "Focus on fluent and natural speaking. Grammar taught practically with real-life situations.",
    course_business_english_title: "Business English", course_business_english_desc: "Effective communication skills for professional environments. Email, presentations, negotiations.",
    course_grammar_title: "Grammar Mastery", course_grammar_desc: "Learn grammar systematically and logically. Structure, pattern, and application-based method.",
    course_smm_title: "SMM (Social Media Marketing)", course_smm_desc: "Digital brand building, content strategy, and real market experience with practical projects.",
    section_label_our_team: "Our Team", section_title_meet_instructors: "Meet Your Instructors",
    section_sub_learn_from_professionals: "Learn from seasoned professionals with years of real-world industry experience.",
    instructor_role_ceo: "CEO & English Instructor", instructor_role_english: "English Language Instructor",
    instructor_bio_toghrul: "CEO of 1ST Group Academy teaching IELTS, SAT, Grammar, General, Business English. Former translator with international experience.",
    instructor_bio_nazrin: "Lead instructor for General English and Grammar programs. Methodology based on speaking and grammar integration.",
    instructor_bio_gulsavad: "Specializes in developing fluent speaking skills and grammatical accuracy with interactive lessons.",
    instructor_bio_gulara: "Experienced English instructor focusing on practical communication and student-centered learning approaches.",
    instructor_bio_farid: "Specializes in exam preparation and advanced grammar. Helps students achieve high scores in international tests.",
    section_label_student_reviews: "Student Reviews", section_title_what_students_say: "What Our Students Say",
    section_sub_thousands_students_transformed: "Thousands of students have transformed their careers through 1st Group Academy.",
    testimonial_1: "\"The IELTS preparation course was exceptional. I improved from Band 6 to Band 7.5 in just 8 weeks!\"",
    testimonial_2: "\"Business English helped me get promoted. My presentation and negotiation skills improved dramatically.\"",
    testimonial_3: "\"The SMM course gave me real practical skills. I started my own agency after completing the program!\"",
    section_title_faq: "Frequently Asked Questions", section_sub_have_questions: "Have questions? We've got answers to help you make the right decision.",
    faq_q1: "Do I need prior experience to enroll?", faq_a1: "No prior experience is required for most of our beginner courses. We start from fundamentals and gradually build your skills.",
    faq_q2: "Will I receive a certificate?", faq_a2: "Yes! Upon completing any course, you will receive a digital certificate from 1st Group Academy recognized by employers.",
    faq_q3: "How long do I have access?", faq_a3: "Once enrolled, you have lifetime access to all course materials, including any future updates.",
    faq_q4: "Are classes live or pre-recorded?", faq_a4: "We offer both! Pre-recorded video lessons plus weekly live Q&A sessions with instructors.",
    faq_q5: "Do you offer group or corporate packages?", faq_a5: "Yes, we offer special rates for teams and organizations. Contact us for corporate packages.",
    contact_label: "Get In Touch", contact_title: "Enroll or Contact Us",
    contact_sub: "Ready to start your learning journey? Fill in the form and we'll get back to you within 24 hours.",
    contact_info_title: "Let's Start Your Journey", contact_info_desc: "Whether you have a question about our courses, pricing, or want to enroll, our team is here to help.",
    form_submit: "Send Enrollment Request →",
    counters_active_students: "Active Students",
    counters_expert_courses: "Expert Courses",
    counters_instructors: "Instructors",
    counters_satisfaction: "% Satisfaction",
    footer_desc: "Empowering learners worldwide with industry-relevant education and expert mentorship since 2018.",
    footer_courses: "Courses",
    footer_ielts: "IELTS Preparation",
    footer_sat: "SAT (Verbal)",
    footer_ge: "General English",
    footer_be: "Business English",
    footer_grammar: "Grammar Mastery",
    footer_smm: "SMM Marketing",
    footer_academy: "Academy",
    footer_about: "About Us",
    footer_instructors: "Instructors",
    footer_reviews: "Reviews",
    footer_faq: "FAQ",
    footer_contact: "Contact"
  }
};

// LANGUAGE SYSTEM
let currentLang = localStorage.getItem('preferredLanguage') || 'en';

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('preferredLanguage', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const t = translations[lang];

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (t[key]) {
      if (key === 'hero_title') {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
}

// Init language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    changeLanguage(btn.getAttribute('data-lang'));
  });
});

// Load saved language
document.addEventListener('DOMContentLoaded', () => {
  changeLanguage(currentLang);
});

// Fix contact form submit button
const submitBtn = document.querySelector('.form-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', submitForm);
}