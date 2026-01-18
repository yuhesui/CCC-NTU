import { i18n } from '../shared/i18n.js';
import { Navigation } from '../shared/navigation.js';

document.addEventListener('DOMContentLoaded', () => {

    const nav = new Navigation();
    nav.init();

    lucide.createIcons();

    const updateTranslations = () => {
        const currentLang = i18n.getLanguage();
        

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = i18n.t(key);
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
        

        i18n.updateMetaTags();
        lucide.createIcons();
    };

    window.addEventListener('languageChanged', updateTranslations);
    updateTranslations();

    const contactForm = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = i18n.getLanguage() === 'en' ? 'Sending...' : '发送中...';


            setTimeout(() => {
                statusDiv.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
                statusDiv.classList.add('bg-green-100', 'text-green-700');
                
                statusDiv.innerHTML = i18n.getLanguage() === 'en' 
                    ? 'Message sent successfully! We will get back to you soon.' 
                    : '信息发送成功！我们将尽快回复您。';
                
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                gsap.from(statusDiv, { opacity: 0, y: 10, duration: 0.5 });
            }, 1200);
        });
    }

    gsap.to('[data-aos="fade-up"]', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });
});
