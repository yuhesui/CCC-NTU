import { contentManager } from './content_manager.js';
import { Registration } from './components/registration.js';
import { i18n } from './shared/i18n.js';

export class Router {
    constructor() {
        this.viewContainer = document.getElementById('app-view');
        this.overlay = document.getElementById('shuimo-overlay');
        this.blob = this.overlay.querySelector('.ink-blob');
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    async handleRoute() {
        const hash = window.location.hash || '#home';
        const pageKey = hash.substring(1);

        await this.transition(() => {
            this.viewContainer.innerHTML = contentManager.getPageHtml(pageKey);
            window.scrollTo(0, 0);

            i18n.updateMetaTags(pageKey);

            if (pageKey === 'registration') {
                new Registration().init();
            }

            lucide.createIcons();
        });
    }

    updateCurrentView() {
        const hash = window.location.hash || '#home';
        const pageKey = hash.substring(1);
        this.viewContainer.innerHTML = contentManager.getPageHtml(pageKey);
        i18n.updateMetaTags(pageKey);
        if (pageKey === 'registration') new Registration().init();
        lucide.createIcons();
    }

    async transition(callback) {
        const tl = gsap.timeline();


        tl.to(this.overlay, { opacity: 1, duration: 0.1 })
          .to(this.blob, { scale: 1, duration: 0.8, ease: "power3.inOut" })
          .add(() => callback())
          .to(this.blob, { scale: 0, duration: 0.8, ease: "power3.inOut" })
          .to(this.overlay, { opacity: 0, duration: 0.1 });

        return tl;
    }
}
