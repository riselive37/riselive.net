
document.addEventListener('DOMContentLoaded', () => {
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
            const isOpen = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
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

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const googleFormFrame = document.querySelector('iframe[name="googleFormFrame"]');

    if (contactForm && formSuccessMessage) {
        let googleFormSubmitted = false;

        if (googleFormFrame) {
            googleFormFrame.addEventListener('load', () => {
                if (!googleFormSubmitted) {
                    return;
                }
                showSuccess();
                googleFormSubmitted = false;
            });
        }

        const showSuccess = () => {
            contactForm.style.display = 'none';
            formSuccessMessage.style.display = 'block';

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
        };

        contactForm.addEventListener('submit', async (e) => {
            const action = contactForm.getAttribute('action');
            const formProvider = contactForm.dataset.formProvider || 'google';

            if (!action || action === '#') {
                e.preventDefault();
                alert('フォームの送信先設定を確認してください。');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            if (formProvider === 'google') {
                // Let the browser perform HTML validation, then submit natively to the hidden iframe.
                googleFormSubmitted = true;
                setTimeout(() => {
                    if (googleFormSubmitted) {
                        showSuccess();
                        googleFormSubmitted = false;
                    }
                }, 3000);
                return;
            }

            e.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showSuccess();
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
