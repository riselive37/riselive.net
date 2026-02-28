
document.addEventListener('DOMContentLoaded', () => {
    console.log('RiseLive Main JS Loaded'); // Debug log

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Contact Form Handler (AJAX Submission)
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (contactForm && formSuccessMessage) {
        console.log('Contact form initialized'); // Debug log
        contactForm.addEventListener('submit', async (e) => {
            console.log('Form submission intercepted'); // Debug log
            e.preventDefault(); // Stop default navigation/reload

            const formData = new FormData(contactForm);
            const action = contactForm.getAttribute('action');

            // Basic validation
            if (!action || action === '#' || action.includes('{your-form-id}')) {
                alert('【設定が必要です】\nコード内の action="..." の部分にご自身のFormspree URLを設定してください。');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success: Hide form, show message
                    contactForm.style.display = 'none';
                    formSuccessMessage.style.display = 'block';

                    // Smooth scroll to message
                    const headerOffset = 100;
                    const elementPosition = formSuccessMessage.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    setTimeout(() => {
                        formSuccessMessage.classList.add('visible');
                    }, 10);
                } else {
                    // Server error
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('送信中にエラーが発生しました。時間を置いて再度お試しください。');
                    }
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                // Network error
                alert('送信に失敗しました。ネットワーク接続をご確認ください。');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});

