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
az: {
    nav_about: "Haqqımızda",
    nav_courses: "Kurslar",
    nav_instructors: "Müəllimlər",
    nav_testimonials: "Rəylər",
    nav_faq: "Suallar",
    nav_contact: "Əlaqə",
    nav_enroll: "Qeydiyyat",

    hero_badge: "⭐ 5000+ tələbə tərəfindən seçilib",
    hero_title: "1st Group Academy ilə <span>Dilləri və Rəqəmsal Bacarıqları</span> Öyrən",
    hero_subtitle: "Peşəkar müəllimlər tərəfindən hazırlanmış dil və inkişaf proqramları.",
    hero_browse_courses: "🎓 Kurslara bax",
    hero_learn_more: "▶ Ətraflı",
    hero_students: "Tələbə",
    hero_satisfaction: "Məmnunluq",
    hero_experts: "Ekspert",
    hero_course_preview_title: "Canlı dərslər",
    hero_course_progress_label: "78% tamamlandı",

    about_label: "Haqqımızda",
    about_title: "Niyə 1st Group Academy?",
    about_p1: "1ST Group Academy praktik və nəticəyönümlü təhsil təqdim edən müasir mərkəzdir.",
    about_p2: "Məqsədimiz real və davamlı bacarıqlar formalaşdırmaqdır.",
    about_feature_1: "✓ IELTS, SAT hazırlıq",
    about_feature_2: "✓ General və Business English",
    about_feature_3: "✓ SMM təlimi",
    about_feature_4: "✓ Təcrübəli müəllimlər",
    about_get_started: "Başla →",

    courses_label: "Proqramlar",
    courses_title: "Kurslarımız",
    courses_sub: "Sənin məqsədinə uyğun kurs seç.",
    course_badge_bestseller: "Populyar",
    course_badge_popular: "Seçilən",
    course_badge_new: "Yeni",
    course_tag_all_levels: "Bütün səviyyələr",

    course_ielts_title: "IELTS Hazırlıq",
    course_ielts_desc: "Real imtahan simulyasiyaları ilə hazırlıq.",
    course_sat_title: "SAT (Verbal)",
    course_sat_desc: "Akademik oxu və analiz.",
    course_general_english_title: "General English",
    course_general_english_desc: "Danışıq və gündəlik istifadə.",
    course_business_english_title: "Business English",
    course_business_english_desc: "İş mühiti üçün ünsiyyət.",
    course_grammar_title: "Qrammatika",
    course_grammar_desc: "Sistemli qrammatika öyrənilməsi.",
    course_smm_title: "SMM",
    course_smm_desc: "Digital marketing və content strategiya.",

    section_label_our_team: "Komandamız",
    section_title_meet_instructors: "Müəllimlərimiz",
    section_sub_learn_from_professionals: "Peşəkarlardan öyrən.",

    instructor_role_ceo: "CEO və müəllim",
    instructor_role_english: "İngilis dili müəllimi",

    instructor_bio_toghrul: "IELTS və SAT üzrə mütəxəssis.",
    instructor_bio_nazrin: "General English üzrə müəllim.",
    instructor_bio_gulsavad: "Danışıq üzrə mütəxəssis.",
    instructor_bio_gulara: "Təcrübəli müəllim.",
    instructor_bio_farid: "İmtahan hazırlığı üzrə mütəxəssis.",

    section_label_student_reviews: "Tələbə rəyləri",
    section_title_what_students_say: "Tələbələr nə deyir",
    section_sub_thousands_students_transformed: "Minlərlə tələbə inkişaf edib.",

    testimonial_1: "IELTS nəticəm 7.5 oldu!",
    testimonial_2: "İşimdə yüksəliş əldə etdim.",
    testimonial_3: "Öz biznesimi başladım.",

    section_title_faq: "Tez-tez verilən suallar",
    section_sub_have_questions: "Suallarınıza cavab tapın.",

    faq_q1: "Təcrübə lazımdır?",
    faq_a1: "Xeyr, sıfırdan başlayırıq.",
    faq_q2: "Sertifikat verilir?",
    faq_a2: "Bəli, kurs bitdikdə verilir.",
    faq_q3: "Giriş müddəti?",
    faq_a3: "Ömürlük giriş.",
    faq_q4: "Dərslər necədir?",
    faq_a4: "Həm canlı, həm video.",
    faq_q5: "Qrup paketləri?",
    faq_a5: "Bəli, mövcuddur.",

    contact_label: "Əlaqə",
    contact_title: "Qeydiyyat və Əlaqə",
    contact_sub: "24 saat ərzində cavab verəcəyik.",
    contact_info_title: "Sənin yolun burada başlayır",
    contact_info_desc: "Biz kömək etməyə hazırıq.",

    form_submit: "Göndər →",

    counters_active_students: "Aktiv tələbə",
    counters_expert_courses: "Kurs",
    counters_instructors: "Müəllim",
    counters_satisfaction: "Məmnunluq",

    footer_desc: "2018-dən bəri inkişaf etdiririk.",
    footer_courses: "Kurslar",
    footer_ielts: "IELTS",
    footer_sat: "SAT",
    footer_ge: "General English",
    footer_be: "Business English",
    footer_grammar: "Qrammatika",
    footer_smm: "SMM",
    footer_academy: "Akademiya",
    footer_about: "Haqqımızda",
    footer_instructors: "Müəllimlər",
    footer_reviews: "Rəylər",
    footer_faq: "FAQ",
    footer_contact: "Əlaqə"
  },

  ru: {
    nav_about: "О нас",
    nav_courses: "Курсы",
    nav_instructors: "Преподаватели",
    nav_testimonials: "Отзывы",
    nav_faq: "FAQ",
    nav_contact: "Контакты",
    nav_enroll: "Записаться",

    hero_badge: "⭐ Более 5000 студентов",
    hero_title: "Изучайте <span>языки и цифровые навыки</span>",
    hero_subtitle: "Курсы от профессиональных преподавателей.",
    hero_browse_courses: "🎓 Курсы",
    hero_learn_more: "▶ Подробнее",
    hero_students: "Студенты",
    hero_satisfaction: "Удовлетворение",
    hero_experts: "Эксперты",

    about_label: "О нас",
    about_title: "Почему мы?",
    about_p1: "Современный образовательный центр.",
    about_p2: "Формируем реальные навыки.",

    courses_label: "Программы",
    courses_title: "Наши курсы",

    contact_label: "Контакты",
    contact_title: "Связаться с нами",

    form_submit: "Отправить →",

    footer_about: "О нас",
    footer_contact: "Контакты"
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