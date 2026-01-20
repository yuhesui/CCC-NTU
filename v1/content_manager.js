import { i18n } from './shared/i18n.js';

export const contentManager = {
    getPageHtml(key) {
        const lang = i18n.getLanguage();
        const t = (k) => i18n.t(k);

        switch (key) {
            case 'home':
                return `
                <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    <div class="absolute inset-0 bg-cover bg-center z-0" style="background-image: url('https://images.unsplash.com/photo-1542332213-31f87348057f')"></div>
                    <!-- gradient overlay to improve text contrast -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                    <div class="relative z-20 text-center px-6 max-w-5xl mx-auto text-paper-white">
                        <h2 class="font-playfair text-7xl md:text-9xl text-paper-white\/95 mb-6 drop-shadow-sm" data-aos="fade-up">五行归序传</h2>
                        <p class="font-noto text-xl md:text-2xl text-paper-white\/90 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                            ${t('home_tagline')}
                        </p>
                        <div class="mt-12 flex gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
                            <a href="#registration" class="bg-midnight-blue text-paper-white px-8 py-4 rounded-md font-bold hover:bg-gold transition-all transform hover:-translate-y-1">${t('cta_begin')}</a>
                            <a href="#about" class="border-2 border-midnight-blue text-paper-white\/95 px-8 py-4 rounded-md font-bold hover:bg-midnight-blue hover:text-white transition-all">${t('nav_about')}</a>
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
                            <h1 class="font-playfair text-5xl text-midnight-blue mb-8">${t('about_history_title')}</h1>
                            <p class="text-brush-gray leading-loose mb-6">${t('about_history_body')}</p>
                        </div>
                        <div class="bg-white/50 p-8 rounded-lg border border-sage-green/10 shadow-sm">
                            <h2 class="font-playfair text-3xl text-gold mb-6">${t('fee_title')}</h2>
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
                    <h1 class="font-playfair text-5xl text-midnight-blue mb-12 text-center">${t('nav_events')}</h1>

                    <!-- Main camp poster card (clickable, works without JS) -->
                    <div class="max-w-3xl mx-auto mb-14">
                        <a href="${lang === 'en' ? 'assets/posters/SingaporeRoadshow_E.jpg' : 'assets/posters/SingaporeRoadshow_C.jpg'}" target="_blank" rel="noopener" class="block group rounded-2xl overflow-hidden border border-sage-green/15 bg-white/60 shadow-lg hover:shadow-xl transition-shadow">
                            <div class="relative">
                                <img src="${lang === 'en' ? 'assets/posters/SingaporeRoadshow_E.jpg' : 'assets/posters/SingaporeRoadshow_C.jpg'}" alt="Main Camp Poster" class="w-full h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" decoding="async" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
                                <div class="absolute bottom-0 left-0 right-0 p-6">
                                    <div class="text-xs uppercase tracking-[0.25em] text-paper-white/90 font-bold">Main Camp Poster</div>
                                    <div class="font-playfair text-3xl text-paper-white mt-2">${lang === 'en' ? 'Elemental Genesis' : '五行归序传'}</div>
                                    <div class="text-sm text-paper-white/90 mt-2">${lang === 'en' ? 'Click to open the poster JPG' : '点击打开高清海报'} </div>
                                </div>
                            </div>
                            <div class="p-6 flex flex-wrap items-center justify-between gap-3">
                                <div class="text-sm text-brush-gray leading-relaxed">
                                    ${t('event_main_desc')}
                                </div>
                                <span class="inline-flex items-center gap-2 text-sm font-bold text-midnight-blue border border-midnight-blue/20 px-4 py-2 rounded-full group-hover:border-gold group-hover:text-gold transition-colors">
                                    ${lang === 'en' ? 'View Poster' : '查看海报'}
                                    <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                                </span>
                            </div>
                        </a>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-white p-8 rounded-lg shadow-md border-t-4 border-midnight-blue">
                            <span class="text-xs uppercase tracking-widest text-sage-green font-bold">Malaysia Online</span>
                            <h2 class="font-playfair text-2xl mt-2 mb-4">Online Roadshow</h2>
                            <p class="text-sm text-brush-gray mb-4">Feb 5 – Feb 8 | Zoom</p>
                            <div class="text-sm leading-relaxed opacity-90">${t('event_my_desc')}</div>
                            <div class="mt-6 grid gap-3">
                                <img src="${lang === 'en' ? 'assets/posters/MalaysiaRoadshow_E.jpg' : 'assets/posters/MalaysiaRoadshow_C.jpg' }" alt="Malaysia Roadshow Poster" class="w-full rounded-lg border border-sage-green/10" loading="lazy" decoding="async" />
                            </div>
                        </div>
                        <div class="bg-white p-8 rounded-lg shadow-md border-t-4 border-sage-green">
                            <span class="text-xs uppercase tracking-widest text-sage-green font-bold">Singapore Physical</span>
                            <h2 class="font-playfair text-2xl mt-2 mb-4">Campus Roadshow</h2>
                            <p class="text-sm text-brush-gray mb-4">March 2 – March 6 | NTU</p>
                            <div class="text-sm leading-relaxed opacity-90">${t('event_sg_desc')}</div>
                            <div class="mt-6 grid gap-3">
                                <img src="${lang === 'en' ? 'assets/posters/SingaporeRoadshow_E.jpg' : 'assets/posters/SingaporeRoadshow_C.jpg' }" alt="Singapore Roadshow Poster" class="w-full rounded-lg border border-sage-green/10" loading="lazy" decoding="async" />
                            </div>
                        </div>
                    </div>
                </section>
                `;
            case 'registration':
                return `
                <section class="py-20 px-6 max-w-4xl mx-auto">
                    <div class="registration-panel bg-white/75 backdrop-blur-sm p-10 md:p-12 rounded-[28px] shadow-2xl border border-sage-green/10">
                        <div class="mb-10 text-center">
                            <h1 class="font-playfair text-4xl md:text-5xl text-midnight-blue mb-3">Registration / 报名</h1>
                        </div>

                        <div class="space-y-12">
                            ${lang === 'en' ? `
                                <!-- English Section -->
                                <section aria-label="English registration">
                                    <h2 class="font-playfair text-2xl text-midnight-blue mb-4">11th Chinese Cultural Camp (CCC)</h2>
                                    <ul class="list-disc list-inside text-brush-gray leading-relaxed space-y-2">
                                        <li><strong>Date:</strong> May 30th – June 1st 2026</li>
                                        <li><strong>Venue:</strong> Nanyang Technological University (NTU)</li>
                                        <li><strong>Registration Fee:</strong> 70 SGD (accommodation included)</li>
                                        <li><strong>Registration Fee:</strong> 15 SGD (accommodation excluded)</li>
                                    </ul>
                                    <p class="mt-4 text-brush-gray"><strong>Event Objectives:</strong> Enhance understanding, encourage exploration on Chinese culture from fresh perspectives</p>
                                </section>
                            ` : `
                                <!-- 中文 Section -->
                                <section aria-label="中文报名">
                                    <h2 class="font-playfair text-2xl text-midnight-blue mb-4">第十一届全国青年华人文化研习与生活营（青年文化营）</h2>
                                    <ul class="list-disc list-inside text-brush-gray leading-relaxed space-y-2">
                                        <li><strong>日期：</strong>2026年5月30日–6月1日</li>
                                        <li><strong>地点：</strong>南洋理工大学校区</li>
                                        <li><strong>报名费：</strong>70 SGD（含住宿）</li>
                                        <li><strong>报名费：</strong>15 SGD（不含住宿）</li>
                                    </ul>
                                    <p class="mt-4 text-brush-gray"><strong>活动宗旨：</strong>提升青少年对华人传统文化的认识，鼓励从新颖角度探索与发掘华人文化</p>
                                </section>
                            `}
                        </div>

                    </div>
                </section>
                `;
            case 'faq':
                return `
                <section class="py-20 px-6 max-w-4xl mx-auto">
                    <h1 class="font-playfair text-5xl text-midnight-blue mb-12 text-center">${t('nav_faq')}</h1>
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
                        <h1 class="font-playfair text-5xl text-midnight-blue mb-8">${t('nav_contact')}</h1>
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
                    <h1 class="font-playfair text-5xl text-midnight-blue mb-12 text-center">${t('nav_gallery')}</h1>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="h-64 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1542332213-31f87348057f" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery image 1">
                        </div>
                        <div class="h-64 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1590487988256-9ed24133863e" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery image 2">
                        </div>
                        <div class="h-80 md:row-span-2 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1512418490979-92798ccc1380" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery image 3">
                        </div>
                        <div class="h-64 bg-sage-green/10 rounded-lg overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1621327017866-da6436750343" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery image 4">
                        </div>
                    </div>
                </section>
                `;
            default:
                return `<div class="p-20 text-center">Page Not Found</div>`;
        }
    }
};
