/**
 * KiRAN (きらん) Official Website Main JavaScript
 * Handles Navigation, Animations, Tabs, Accordions, and Form Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Hamburger Menu Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Fade-in Animations (IntersectionObserver)
  const fadeElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    }
  });

  // 5. Price / Course Tabs
  const tabBtns = document.querySelectorAll('.price-tab-btn');
  const tabPanes = document.querySelectorAll('.price-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.style.display = 'block';
      }
    });
  });

  // 6. Reservation / Contact Form Validation & Confirmation
  const contactForm = document.getElementById('kiranReservationForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const referrer = document.getElementById('referrerName')?.value.trim();
      const name = document.getElementById('clientName')?.value.trim();
      const email = document.getElementById('clientEmail')?.value.trim();
      const tel = document.getElementById('clientTel')?.value.trim();

      if (!name || !email || !tel) {
        alert('必須項目（お名前、メールアドレス、お電話番号）をご入力ください。');
        return;
      }

      // Modal Alert
      const confirmMsg = `
【体験予約・お問い合わせを受け付けました】
ご入力内容を送信いたしました。
24時間以内に担当トレーナーより確認のご連絡を差し上げます。

■ お名前: ${name} 様
■ ご紹介者様: ${referrer ? referrer + ' 様' : '（なし / 相談中）'}
■ お電話番号: ${tel}
■ メールアドレス: ${email}

※当スタジオは完全紹介制・完全予約制となっております。
ご不明点がございましたら公式LINEからもお気軽にお問い合わせください。
      `;

      alert(confirmMsg);
      contactForm.reset();
    });
  }
});
