import { i18n } from './shared/i18n.js';
import { Router } from './router.js';
import { AudioPlayer } from './components/audio_player.js';

class App {
    constructor() {
        this.router = new Router();
        this.audioPlayer = new AudioPlayer();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.router.init();
            this.audioPlayer.init();
            this.setupLanguageToggle();
            this.renderGlobalElements();
            

            window.addEventListener('languageChanged', () => {
                this.renderGlobalElements();
                this.router.updateCurrentView();
            });
        });
    }

    renderGlobalElements() {
        this.renderHeader();
        this.renderFooter();
        lucide.createIcons();
    }

    renderHeader() {
        const header = document.getElementById('global-header');
        const lang = i18n.getLanguage();
        const items = [
            { key: 'nav_home', hash: '#home' },
            { key: 'nav_about', hash: '#about' },
            { key: 'nav_events', hash: '#events' },
            { key: 'nav_reg', hash: '#registration' },
            { key: 'nav_gallery', hash: '#gallery' },
            { key: 'nav_faq', hash: '#faq' },
            { key: 'nav_contact', hash: '#contact' }
        ];

        header.innerHTML = `
            <nav class="flex items-center justify-between px-6 md:px-12 py-4 bg-paper/80 backdrop-blur-md border-b border-sage-green/10">
                <a class="flex items-center gap-3" href="#home" aria-label="Home">
                    <img src="assets/logo/logo_beige_base.png" alt="CCC Logo" class="w-10 h-10 md:w-11 md:h-11 object-contain" loading="eager" decoding="async" />
                    <div>
                        <div class="font-playfair font-bold text-midnight-blue leading-none text-lg">CCC</div>
                        <p class="text-[9px] uppercase tracking-[0.2em] text-sage-green font-bold">Elemental Genesis</p>
                    </div>
                </a>
                
                <ul class="hidden lg:flex gap-8 items-center font-noto text-xs font-bold text-midnight-blue uppercase tracking-widest">
                    ${items.map(item => `
                        <li><a href="${item.hash}" class="hover:text-gold transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-gold">${i18n.t(item.key)}</a></li>
                    `).join('')}
                </ul>

                <div class="flex items-center gap-4">
                    <button id="lang-btn" class="bg-midnight-blue text-paper-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gold hover:text-midnight-blue transition-all">
                        ${lang === 'en' ? '中文' : 'EN'}
                    </button>
                </div>
            </nav>
        `;
    }

    renderFooter() {
        const footer = document.getElementById('global-footer');
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="space-y-4">
                    <a href="#home" class="inline-flex items-center gap-3" aria-label="Home">
                        <img src="assets/logo/logo_beige_base.png" alt="CCC Logo" class="w-9 h-9 object-contain" loading="lazy" decoding="async" />
                        <div class="font-playfair text-2xl text-gold">Elemental Genesis</div>
                    </a>
                    <p class="text-sm opacity-70 font-noto italic">"${i18n.t('footer_quote')}"</p>
                </div>
                <div class="space-y-4">
                    <h4 class="font-noto text-lg text-gold font-bold">${i18n.t('footer_links_title')}</h4>
                    <div class="grid grid-cols-2 gap-2 text-sm opacity-80">
                        <a href="#about" class="hover:text-gold">${i18n.t('nav_about')}</a>
                        <a href="#events" class="hover:text-gold">${i18n.t('nav_events')}</a>
                        <a href="#registration" class="hover:text-gold">${i18n.t('nav_reg')}</a>
                        <a href="#contact" class="hover:text-gold">${i18n.t('nav_contact')}</a>
                    </div>
                </div>
                <div class="space-y-6 md:text-right">
                    <div class="flex md:justify-end gap-4">
                        <a href="#" class="p-2 border border-white/20 rounded-full hover:border-gold transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                        <a href="#" class="p-2 border border-white/20 rounded-full hover:border-gold transition-colors"><i data-lucide="facebook" class="w-5 h-5"></i></a>
                    </div>
                    <p class="text-xs opacity-50 font-noto">${i18n.t('footer_rights')}</p>
                </div>
            </div>
        `;
    }

    setupLanguageToggle() {
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('#lang-btn')) {
                const nextLang = i18n.getLanguage() === 'en' ? 'zh' : 'en';
                i18n.setLanguage(nextLang);
            }
        });
    }
}

new App();
