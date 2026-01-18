import { i18n } from './shared/i18n.js';

export const contentManager = {
    getPageHtml(key) {
        const lang = i18n.getLanguage();
        const t = (k) => i18n.t(k);

        switch (key) {
            case 'home':
                return `
                <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542332213-31f87348057f')] bg-cover bg-center opacity-20"></div>
                    <div class="relative z-10 text-center px-6">
                        <h2 class="font-playfair text-7xl md:text-9xl text-midnight-blue mb-6 drop-shadow-sm" data-aos="fade-up">五行归序传</h2>
                        <p class="font-noto text-xl md:text-2xl text-sage-green max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                            ${t('home_tagline')}
                        </p>
                        <div class="mt-12 flex gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
                            <a href="#registration" class="bg-midnight-blue text-paper-white px-8 py-4 rounded-md font-bold hover:bg-gold transition-all transform hover:-translate-y-1">${t('cta_begin')}</a>
                            <a href="#about" class="border-2 border-midnight-blue text-midnight-blue px-8 py-4 rounded-md font-bold hover:bg-midnight-blue hover:text-white transition-all">${t('nav_about')}</a>
                        </div>
                    </div>
                </section>
                <section class="py-20 px-6 max-w-5xl mx-auto text-center">
                    <h3 class="font-playfair text-4xl text-midnight-blue mb-10">${t('home_mission_title')}</h3>
                    <p class="text-lg text-brush-gray leading-loose font-noto">${t('home_mission_body')}</p>
                </section>
                `;
            case 'about':
                return `
                <section class="py-20 px-6 max-w-6xl mx-auto">
                    <div class="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 class="font-playfair text-5xl text-midnight-blue mb-8">${t('about_history_title')}</h2>
                            <p class="text-brush-gray leading-loose mb-6">${t('about_history_body')}</p>
                        </div>
                        <div class="bg-white/50 p-8 rounded-lg border border-sage-green/10 shadow-sm">
                            <h3 class="font-playfair text-3xl text-gold mb-6">${t('fee_title')}</h3>
                            <div class="space-y-4">
                                <div class="flex justify-between border-b border-sage-green/10 pb-2">
                                    <span>${t('fee_full')}</span>
                                    <span class="font-bold text-midnight-blue">$70</span>
                                </div>
                                <div class="flex justify-between border-b border-sage-green/10 pb-2">
                                    <span>${t('fee_day')}</span>
                                    <span class="font-bold text-midnight-blue">$15</span>
                                </div>
                                <p class="text-xs opacity-60 mt-4 italic">${t('fee_note')}</p>
                            </div>
                        </div>
                    </div>
                </section>
                `;
            case 'events':
                return `
                <section class="py-20 px-6 max-w-6xl mx-auto">
                    <h2 class="font-playfair text-5xl text-midnight-blue mb-12 text-center">${t('nav_events')}</h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="event-card bg-white p-8 rounded-lg shadow-md border-t-4 border-gold">
                            <span class="text-xs uppercase tracking-widest text-sage-green font-bold">Main Camp</span>
                            <h4 class="font-playfair text-2xl mt-2 mb-4">Elemental Genesis</h4>
                            <p class="text-sm text-brush-gray mb-6">May 30 – June 1 | NTU Campus</p>
                            <div class="text-sm leading-relaxed opacity-80">${t('event_main_desc')}</div>
                        </div>
                        <div class="event-card bg-white p-8 rounded-lg shadow-md border-t-4 border-midnight-blue">
                            <span class="text-xs uppercase tracking-widest text-sage-green font-bold">Malaysia Online</span>
                            <h4 class="font-playfair text-2xl mt-2 mb-4">Online Roadshow</h4>
                            <p class="text-sm text-brush-gray mb-6">Feb 5 – Feb 8 | Zoom</p>
                            <div class="text-sm leading-relaxed opacity-80">${t('event_my_desc')}</div>
                        </div>
                        <div class="event-card bg-white p-8 rounded-lg shadow-md border-t-4 border-sage-green">
                            <span class="text-xs uppercase tracking-widest text-sage-green font-bold">Singapore Physical</span>
                            <h4 class="font-playfair text-2xl mt-2 mb-4">Campus Roadshow</h4>
                            <p class="text-sm text-brush-gray mb-6">March 2 – March 6 | NTU</p>
                            <div class="text-sm leading-relaxed opacity-80">${t('event_sg_desc')}</div>
                        </div>
                    </div>
                </section>
                `;
            case 'registration':
                return `
                <section class="py-20 px-6 max-w-3xl mx-auto">
                    <div class="bg-white/80 backdrop-blur-sm p-10 rounded-xl shadow-xl border border-sage-green/10">
                        <div class="mb-10 text-center">
                            <h2 class="font-playfair text-4xl text-midnight-blue mb-2">${t('reg_title')}</h2>
                            <div id="reg-steps-indicator" class="flex justify-center gap-4 mt-6">
                                <div class="step-dot active w-3 h-3 rounded-full bg-gold"></div>
                                <div class="step-dot w-3 h-3 rounded-full bg-sage-green/20"></div>
                                <div class="step-dot w-3 h-3 rounded-full bg-sage-green/20"></div>
                            </div>
                        </div>
                        <form id="reg-form" class="space-y-6"></form>
                    </div>
                </section>
                `;
            case 'faq':
                return `
                <section class="py-20 px-6 max-w-4xl mx-auto">
                    <h2 class="font-playfair text-5xl text-midnight-blue mb-12 text-center">${t('nav_faq')}</h2>
                    <div class="space-y-4">
                        ${[1,2,3,4,5,6,7,8,9,10].map(i => `
                            <details class="group bg-white/50 border border-sage-green/10 rounded-lg">
                                <summary class="p-6 cursor-pointer font-bold text-midnight-blue list-none flex justify-between items-center">
                                    ${t(`faq_q${i}`)}
                                    <i data-lucide="chevron-down" class="group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-brush-gray leading-relaxed border-t border-sage-green/5">
                                    ${t(`faq_a${i}`)}
                                </div>
                            </details>
                        `).join('')}
                    </div>
                </section>
                `;
            case 'contact':
                return `
                <section class="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 class="font-playfair text-5xl text-midnight-blue mb-8">${t('nav_contact')}</h2>
                        <div class="space-y-8">
                            <div class="flex gap-4">
                                <i data-lucide="mail" class="text-gold"></i>
                                <div>
                                    <p class="font-bold">Email</p>
                                    <p class="text-brush-gray">ntu-chs@e.ntu.edu.sg</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <i data-lucide="map-pin" class="text-gold"></i>
                                <div>
                                    <p class="font-bold">Address</p>
                                    <p class="text-brush-gray">50 Nanyang Ave, Singapore 639798</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-[400px] rounded-xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all">
                        <iframe class="w-full h-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6677!2d103.68!3d1.345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0fd8d7168863%3A0x16347313a3ca7469!2sNanyang%20Technological%20University!5e0!3m2!1sen!2ssg!4v1705500000000"></iframe>
                    </div>
                </section>
                `;
            case 'gallery':
                return `
                <section class="py-20 px-6 max-w-7xl mx-auto">
                    <h2 class="font-playfair text-5xl text-midnight-blue mb-12 text-center">${t('nav_gallery')}</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="h-64 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1542332213-31f87348057f" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                        <div class="h-64 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1590487988256-9ed24133863e" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                        <div class="h-80 md:row-span-2 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1512418490979-92798ccc1380" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                        <div class="h-64 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1621327017866-da6436750343" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                    </div>
                </section>
                `;
            default:
                return `<div class="p-20 text-center">Page Not Found</div>`;
        }
    }
};
