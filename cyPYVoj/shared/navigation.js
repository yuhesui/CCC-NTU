import { i18n } from './i18n.js';

export class Navigation {
    constructor() {

        const pathArray = window.location.pathname.split('/');

        this.basePath = pathArray.includes('contact') || pathArray.includes('about') || pathArray.includes('events') ? '../' : './';
        this.audio = null;
    }

    init() {
        this.renderHeader();
        this.renderFooter();
        this.addScrollEffect();
        this.setupLanguageToggle();
        this.initMusicController();
        this.applyContrastGuardrail();
        i18n.updateMetaTags();
    }

    renderHeader() {
        const header = document.getElementById('global-header');
        if (!header) return;

        const lang = i18n.getLanguage();
        const navItems = [
            { id: 'nav_home', link: 'index.html' },
            { id: 'nav_about', link: 'about/index.html' },
            { id: 'nav_events', link: 'events/index.html' },
            { id: 'nav_reg', link: 'registration/index.html' },
            { id: 'nav_gallery', link: 'gallery/index.html' },
            { id: 'nav_faq', link: 'faq/index.html' },
            { id: 'nav_contact', link: 'contact/index.html' }
        ];

        header.innerHTML = `
            <nav class="flex items-center justify-between px-4 md:px-8 py-4 bg-paper/90 backdrop-blur-md border-b border-sage-green/20 sticky-nav shadow-sm">
                <div class="flex items-center gap-3">
                    <img src="https://img.icons8.com/ios-filled/50/1B3B6F/lotus.png" class="w-8 h-8 md:w-10 md:h-10" />
                    <div>
                        <h1 class="font-playfair font-bold text-midnight-blue leading-none text-sm md:text-base">CCC 11th</h1>
                        <p class="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-sage-green">Elemental Genesis</p>
                    </div>
                </div>
                
                <ul class="hidden xl:flex gap-6 items-center font-noto text-xs font-bold text-midnight-blue uppercase tracking-wider">
                    ${navItems.map(item => `
                        <li><a href="${this.basePath}${item.link}" class="hover:text-gold transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-gold">${i18n.t(item.id)}</a></li>
                    `).join('')}
                </ul>

                <div class="flex items-center gap-4">
                    <button id="music-toggle" class="p-2 rounded-full border border-midnight-blue/20 hover:bg-sage-green/10 transition-colors">
                        <i data-lucide="music" class="w-4 h-4 text-midnight-blue"></i>
                    </button>
                    <button id="lang-toggle" class="bg-midnight-blue text-paper-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gold hover:text-midnight-blue transition-all shadow-md">
                        ${lang === 'en' ? '中文' : 'EN'}
                    </button>
                </div>
            </nav>
        `;
        lucide.createIcons();
    }

    renderFooter() {
        const footer = document.getElementById('global-footer');
        if (!footer) return;

        footer.innerHTML = `
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-10">
                <div class="space-y-4">
                    <h4 class="font-playfair text-xl text-gold">Elemental Genesis</h4>
                    <p class="text-sm opacity-80 leading-relaxed font-noto">${i18n.t('footer_tagline')}</p>
                </div>
                <div class="space-y-4">
                    <h4 class="font-noto text-xl text-gold font-bold">${i18n.t('footer_links')}</h4>
                    <ul class="text-sm space-y-3 opacity-80 font-noto">
                        <li><a href="${this.basePath}registration/index.html" class="hover:text-gold transition-colors">→ ${i18n.t('nav_reg')}</a></li>
                        <li><a href="${this.basePath}faq/index.html" class="hover:text-gold transition-colors">→ ${i18n.t('nav_faq')}</a></li>
                        <li><a href="${this.basePath}contact/index.html" class="hover:text-gold transition-colors">→ ${i18n.t('nav_contact')}</a></li>
                    </ul>
                </div>
                <div class="space-y-6 md:text-right">
                    <div class="flex md:justify-end gap-4">
                        <a href="#" class="p-2 bg-white/5 rounded-full hover:bg-gold/20 transition-colors"><i data-lucide="instagram" class="w-5 h-5 text-gold"></i></a>
                        <a href="#" class="p-2 bg-white/5 rounded-full hover:bg-gold/20 transition-colors"><i data-lucide="facebook" class="w-5 h-5 text-gold"></i></a>
                        <a href="#" class="p-2 bg-white/5 rounded-full hover:bg-gold/20 transition-colors"><i data-lucide="message-circle" class="w-5 h-5 text-gold"></i></a>
                    </div>
                    <p class="text-xs opacity-60 font-noto tracking-wide">${i18n.t('footer_rights')}</p>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

    addScrollEffect() {
        const header = document.getElementById('global-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.querySelector('nav')?.classList.add('py-2', 'bg-paper/95', 'shadow-xl');
            } else {
                header.querySelector('nav')?.classList.remove('py-2', 'bg-paper/95', 'shadow-xl');
            }
        });
    }

    setupLanguageToggle() {
        const btn = document.getElementById('lang-toggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const nextLang = i18n.getLanguage() === 'en' ? 'zh' : 'en';
            i18n.setLanguage(nextLang);
            this.renderHeader();
            this.renderFooter();
            this.setupLanguageToggle(); // Re-bind
            this.initMusicController(); // Refresh icons
        });
    }

    initMusicController() {
        const musicBtn = document.getElementById('music-toggle');
        if (!musicBtn) return;


        const isPlaying = localStorage.getItem('ccc_music_playing') === 'true';
        


        if (!this.audio) {
            this.audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-traditional-japanese-meditation-soft-539.mp3');
            this.audio.loop = true;
            this.audio.volume = 0.3;
        }

        const updateIcon = () => {
            const icon = musicBtn.querySelector('i');
            if (localStorage.getItem('ccc_music_playing') === 'true') {
                icon.setAttribute('data-lucide', 'music-2');
                musicBtn.classList.add('bg-gold/20');
            } else {
                icon.setAttribute('data-lucide', 'music');
                musicBtn.classList.remove('bg-gold/20');
            }
            lucide.createIcons();
        };

        musicBtn.addEventListener('click', () => {
            if (this.audio.paused) {
                this.audio.play();
                localStorage.setItem('ccc_music_playing', 'true');
            } else {
                this.audio.pause();
                localStorage.setItem('ccc_music_playing', 'false');
            }
            updateIcon();
        });

        updateIcon();
    }

    applyContrastGuardrail() {

        document.querySelectorAll('a, button, p, span').forEach(el => {
            const style = window.getComputedStyle(el);

            if (style.color === 'rgb(107, 142, 111)') { // Sage green
                el.classList.add('contrast-safe');
            }
        });
    }
}
