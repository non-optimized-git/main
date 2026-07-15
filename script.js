// ===== Data Management =====
const defaultData = {
    hero: {
        name: "Yuanyi Li",
        tagline: "Creative Developer",
        subtitle: "用代码创造美学体验"
    },
    about: {
        text: "热爱技术与设计的交汇点，专注于创造兼具美感与功能性的数字体验。相信极简主义的力量，用最少的元素传达最深的意义。",
        stats: [
            { number: "3+", label: "年经验" },
            { number: "10+", label: "完成项目" },
            { number: "5+", label: "技术栈" }
        ]
    },
    skills: [
        { title: "前端", items: "React, Vue.js, TypeScript" },
        { title: "后端", items: "Node.js, Python, PostgreSQL" },
        { title: "工具", items: "Git, Docker, AWS" }
    ],
    projects: [
        { name: "Keysight", desc: "面向问卷交叉表分析的本地前端工具，支持 Excel 结构映射解析、多视图管理和表格卡片展示。", tech: "React, TypeScript, Vite", link: "#", image: "" },
        { name: "Scrub (数刷)", desc: "轻量级 Excel/CSV 数据清洗工具，纯前端实现无需服务器，支持五种清洗操作。", tech: "纯前端, 克莱因蓝设计", link: "#", image: "" },
        { name: "Snapdata (数达)", desc: "浏览器端 Excel 数据分析工具，面向非技术用户，支持多条件筛选和交叉分析。", tech: "Vite, React, Tailwind", link: "#", image: "" },
        { name: "TableX (表析)", desc: "问卷数据分析工具，解析 Excel 导出文件后按模块分组生成三个并排表格。", tech: "HTML/CSS/JS, 暖色调主题", link: "#", image: "" },
        { name: "WeaveTale (织语)", desc: "访谈内容智能整理工具，调用小米 MiMo AI 生成结构化用户画像报告。", tech: "AI, 单文件应用", link: "#", image: "" }
    ],
    contact: {
        email: "your-email@example.com",
        phone: "",
        address: ""
    },
    social: {
        github: "https://github.com/yourusername",
        linkedin: "",
        twitter: "",
        wechat: ""
    }
};

let siteData = null;

async function loadData() {
    if (siteData) return siteData;
    try {
        const res = await fetch('data.json?' + Date.now());
        if (res.ok) {
            siteData = await res.json();
            return siteData;
        }
    } catch (e) {}
    const saved = localStorage.getItem('siteData');
    siteData = saved ? JSON.parse(saved) : { ...defaultData };
    return siteData;
}

// ===== Render Content =====
async function renderContent() {
    const data = await loadData();

    // Hero
    const heroName = document.getElementById('heroName');
    const heroTagline = document.getElementById('heroTagline');
    const heroSubtitle = document.getElementById('heroSubtitle');

    if (heroName) heroName.textContent = data.hero.name;
    if (heroTagline) heroTagline.textContent = data.hero.tagline;
    if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;

    // About
    const aboutText = document.getElementById('aboutText');
    if (aboutText) aboutText.textContent = data.about.text;

    const aboutStats = document.getElementById('aboutStats');
    if (aboutStats) {
        aboutStats.innerHTML = data.about.stats.map(stat => `
            <div class="stat">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    // Skills
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
        skillsGrid.innerHTML = data.skills.map(skill => `
            <div class="skill-card">
                <h3>${skill.title}</h3>
                <ul>
                    ${skill.items.split(',').map(item => `<li>${item.trim()}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Projects
    const projectsList = document.getElementById('projectsList');
    if (projectsList) {
        projectsList.innerHTML = data.projects.map((project, i) => `
            <a href="${project.link}" class="project-item" data-cursor="link">
                <div class="project-info">
                    <span class="project-number">0${i + 1}</span>
                    <h3 class="project-name">${project.name}</h3>
                    <p class="project-desc">${project.desc}</p>
                    <div class="project-tech">
                        ${project.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}
                    </div>
                </div>
                <div class="project-visual">
                    ${project.image
                        ? `<img src="${project.image}" alt="${project.name}" class="project-image">`
                        : `<span class="project-visual-text">0${i + 1}</span>`
                    }
                </div>
            </a>
        `).join('');
    }

    // Contact
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) {
        contactEmail.href = `mailto:${data.contact.email}`;
        contactEmail.textContent = data.contact.email;
    }

    // Social
    const contactSocial = document.getElementById('contactSocial');
    if (contactSocial) {
        const socials = [];
        if (data.social.github) socials.push({ name: 'GitHub', url: data.social.github });
        if (data.social.linkedin) socials.push({ name: 'LinkedIn', url: data.social.linkedin });
        if (data.social.twitter) socials.push({ name: 'Twitter', url: data.social.twitter });
        if (data.social.wechat) socials.push({ name: 'WeChat', url: '#' });

        contactSocial.innerHTML = socials.map(s => `
            <a href="${s.url}" class="social-link" data-cursor="link" target="_blank" rel="noopener">
                <span>${s.name}</span>
                <span>&rarr;</span>
            </a>
        `).join('');
    }
}

// ===== Loader =====
function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
}

// ===== Custom Cursor =====
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor interactions
    document.querySelectorAll('[data-cursor="link"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ===== Parallax Effect =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// ===== Navbar Scroll Effect =====
function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    // Always visible — no hide on scroll
    nav.style.opacity = '1';
    nav.style.pointerEvents = 'auto';

    // Highlight active section link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu-links a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ===== Magnetic Effect for Links =====
function initMagnetic() {
    document.querySelectorAll('[data-cursor="link"]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                el.style.transition = '';
            }, 500);
        });
    });
}

// ===== Hero Background Letters =====
function initBgLetters() {
    const container = document.getElementById('heroBgLetters');
    if (!container) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const count = 15;

    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'hero-bg-letter';
        span.textContent = chars[Math.floor(Math.random() * chars.length)];

        const size = 80 + Math.random() * 200;
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * duration;
        const blur = 2 + Math.random() * 6;

        span.style.cssText = `
            left: ${left}%;
            bottom: -10%;
            font-size: ${size}px;
            filter: blur(${blur}px);
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;

        container.appendChild(span);
    }
}

// ===== Text Split Animation =====
function initTextSplit() {
    document.querySelectorAll('[data-animate="text"]').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        el.style.opacity = '1';
        el.style.transform = 'none';

        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100%)';
            span.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.03}s`;
            el.appendChild(span);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(el);
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Glitch Effect on Hover =====
function initGlitch() {
    document.querySelectorAll('.hero-title-line').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                el.style.animation = '';
            }, 300);
        });
    });

    // Add glitch keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);
}

// ===== Tilt Effect for Cards =====
function initTilt() {
    document.querySelectorAll('.skill-card, .stat').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    initBgLetters();
    initLoader();
    initCursor();
    initMobileMenu();
    initScrollAnimations();
    initParallax();
    initNavScroll();
    initMagnetic();
    initTextSplit();
    initSmoothScroll();
    initGlitch();
    initTilt();
});

// Listen for storage changes (real-time sync with admin)
window.addEventListener('storage', (e) => {
    if (e.key === 'siteData') {
        siteData = null;
        renderContent();
    }
});
