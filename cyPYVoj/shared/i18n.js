export const i18n = {
    dictionary: {
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_events: "Events",
            nav_reg: "Registration",
            nav_gallery: "Gallery",
            nav_faq: "FAQ",
            nav_contact: "Contact",
            meta_title: "11th Chinese Cultural Camp | Elemental Genesis",
            home_tagline: "Ink defines the world; the Five Elements restore the order. Rediscover your cultural roots through the rhythm of the brush.",
            cta_begin: "Begin Your Genesis",
            home_mission_title: "Origin: Cultivating the Cultural Soul",
            home_mission_body: "Elemental Genesis is more than a camp; it is a spiritual dialogue spanning millennia. Through an immersive exploration of the Wuxing philosophy (Metal, Wood, Water, Fire, and Earth), we empower participants to reconnect with the warmth and wisdom of Chinese heritage amidst the pulse of modern life.",
            about_history_title: "Our Heritage",
            about_history_body: "Since its inception, the Chinese Society at NTU has been a bridge between tradition and modernity. We are a community of youths passionate about Han culture, dedicated to transforming ancient classics into vibrant, living experiences.",
            fee_title: "Contribution",
            fee_full: "Full Experience (Stay-in)",
            fee_day: "Day Pass (Commuter)",
            fee_note: "Includes starter kit, cultural workshop materials, and exclusive merchandise.",
            reg_title: "Join the Genesis",
            btn_next: "Continue",
            btn_prev: "Back",
            btn_submit: "Complete Registration",
            footer_quote: "Harmony in balance; wisdom in motion.",
            footer_links_title: "Navigation",
            footer_rights: "© 2026 Chinese Society NTU. All Rights Reserved.",
            event_main_desc: "A 3-day immersive journey featuring elemental rituals and grand puzzles.",
            event_my_desc: "Virtual cultural teasers and early-bird registration info via Zoom.",
            event_sg_desc: "Live knot-making demos and 'Wuxing' personality quizzes on campus.",
            faq_q1: "Who can join the camp?", faq_a1: "Open to all tertiary students in Singapore and Malaysia.",
            faq_q2: "Is vegetarian food provided?", faq_a2: "Yes, we provide Halal-certified and vegetarian options.",
            faq_q3: "What does $70 fee include?", faq_a3: "Accommodation, all meals, workshop materials, and T-shirt.",
            label_name: "Full Name", label_nat: "Nationality", label_uni: "University", label_diet: "Dietary", label_ticket: "Pass Type"
        },
        zh: {
            nav_home: "首页",
            nav_about: "关于",
            nav_events: "活动",
            nav_reg: "报名",
            nav_gallery: "相册",
            nav_faq: "常见问题",
            nav_contact: "联系",
            meta_title: "第十一届全国青年华人文化研习与生活营 | 五行归序传",
            home_tagline: "墨化万物，五行归序。在流转的笔触中，寻回文化的本源。",
            cta_begin: "开启归序之旅",
            home_mission_title: "溯源：深耕文化之魂",
            home_mission_body: "“五行归序传”不仅是一场营会，更是一次穿越千年的心灵对话。我们致力于通过五行哲学（金、木、水、火、土）的深度沉浸，让每一位参与者在快节奏的现代生活中，重新触摸中华文化的温度与智慧。",
            about_history_title: "南大中文学会简介",
            about_history_body: "南洋理工大学中文学会自成立以来，始终致力于搭建连接传统与现代的桥梁。我们是一群热爱汉文化的青年，旨在通过创新的形式，将沉睡的经典转化为鲜活的体验。",
            fee_title: "报名费用",
            fee_full: "全程参与 (含住宿)",
            fee_day: "日间通行 (不含住宿)",
            fee_note: "包含入门礼包、文化工坊材料及专属周边。",
            reg_title: "归序报名",
            btn_next: "下一步",
            btn_prev: "上一步",
            btn_submit: "提交报名",
            footer_quote: "五行相生，智慧常在。",
            footer_links_title: "快速链接",
            footer_rights: "© 2026 南大中文学会。版权所有。",
            event_main_desc: "为期3天2夜的沉浸式旅程，涵盖五行仪式与大型解谜。",
            event_my_desc: "通过Zoom进行的虚拟文化预热及早鸟报名咨询。",
            event_sg_desc: "校园内的现场中国结演示与“五行”性格测试。",
            faq_q1: "谁可以参加？", faq_a1: "面向新加坡和马来西亚的所有大专院校学生。",
            faq_q2: "是否提供素食？", faq_a2: "是的，我们提供清真与素食选项。",
            faq_q3: "$70费用包含什么？", faq_a3: "住宿、所有膳食、工坊材料及营衫。",
            label_name: "姓名", label_nat: "国籍", label_uni: "就读院校", label_diet: "饮食习惯", label_ticket: "门票种类"
        }
    },

    getLanguage() {
        return localStorage.getItem('ccc_lang') || 'en';
    },

    setLanguage(lang) {
        localStorage.setItem('ccc_lang', lang);
        this.updateMetaTags();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    },

    t(key) {
        const lang = this.getLanguage();
        return this.dictionary[lang][key] || this.dictionary['en'][key] || key;
    },

    updateMetaTags() {
        const title = this.t('meta_title');
        document.title = title;

    }
};
