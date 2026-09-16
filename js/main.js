const startupScreen = document.querySelector('.startup-screen');
const skipStartup = document.querySelector('.startup-skip');
const startupSeenKey = 'amxxn-startup-seen';

const finishStartup = () => {
    sessionStorage.setItem(startupSeenKey, 'true');
    document.body.classList.remove('startup-pending');
    if (startupScreen) {
        startupScreen.classList.add('startup-complete');
        window.setTimeout(() => startupScreen.remove(), 800);
    }
};

if (sessionStorage.getItem(startupSeenKey) === 'true') {
    document.body.classList.remove('startup-pending');
    if (startupScreen) startupScreen.remove();
}

if (startupScreen && skipStartup) {
    skipStartup.addEventListener('click', finishStartup);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
            finishStartup();
        }
    });
    window.setTimeout(finishStartup, 4300);
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
    revealItems.forEach((item, index) => {
        let x = 0;
        let y = 24;
        let r = 0;
        let delay = 0;

        if (item.classList.contains('reveal-left')) {
            x = -24;
            r = -1.5;
        } else if (item.classList.contains('reveal-right')) {
            x = 24;
            r = 1.5;
        } else if (item.classList.contains('reveal-up')) {
            y = 28;
        }

        if (item.classList.contains('skill-card')) {
            x = item.classList.contains('reveal-left') ? -12 : 12;
            y = 16;
            r = item.classList.contains('reveal-left') ? -0.5 : 0.5;
        }

        item.style.setProperty('--offset-x', `${x}px`);
        item.style.setProperty('--offset-y', `${y}px`);
        item.style.setProperty('--offset-r', `${r}deg`);

        if (item.classList.contains('section-heading')) {
            delay = 0;
        } else if (item.classList.contains('interest-card')) {
            delay = 180 + Array.from(item.parentElement.children).indexOf(item) * 80;
        } else if (item.classList.contains('skill-card')) {
            delay = 180 + Array.from(item.parentElement.children).indexOf(item) * 100;
        } else if (item.classList.contains('stat-item')) {
            delay = 120 + Array.from(item.parentElement.children).indexOf(item) * 70;
        } else {
            delay = index * 60;
        }

        item.style.transitionDelay = `${delay}ms`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -10px 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
}

const spiralGrid = document.querySelector('.spiral-grid');
if (spiralGrid) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const spiralObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('spiral-active');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.28 });

        spiralObserver.observe(spiralGrid);
    } else {
        spiralGrid.classList.add('spiral-active');
        spiralGrid.querySelectorAll('.spiral-card').forEach((card) => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    }
}

const expertiseContent = {
    development: ['01', 'DEVELOPMENT', 'HTML · CSS · JavaScript · Kotlin · Responsive Design'],
    creative: ['02', 'CREATIVE', 'Graphic Design · Photography · Visual Editing · Branding'],
    digital: ['03', 'DIGITAL', 'Social Media · Marketing · Content Creation · Visual Strategy'],
    business: ['04', 'BUSINESS', 'Entrepreneurship · Brand Development · Customer Experience']
};
const expertiseDisplay = document.querySelector('.expertise-display');

document.querySelectorAll('.expertise-tab').forEach((tab) => {
    const activateExpertise = () => {
        const content = expertiseContent[tab.dataset.expertise];
        document.querySelectorAll('.expertise-tab').forEach((item) => {
            item.classList.toggle('is-active', item === tab);
            item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
        });
        expertiseDisplay.querySelector('.expertise-display-label').textContent = `SELECTED EXPERTISE / ${content[0]}`;
        expertiseDisplay.querySelector('h3').textContent = content[1];
        expertiseDisplay.querySelector('p').textContent = content[2];
        expertiseDisplay.querySelector('.expertise-display-mark').innerHTML = `AMXXN<span>/</span>${content[0]}`;
    };

    tab.addEventListener('mouseenter', activateExpertise);
    tab.addEventListener('focus', activateExpertise);
});

const approachContent = {
    discover: ['01', 'DISCOVER', 'Understand the problem, idea or objective.'],
    design: ['02', 'DESIGN', 'Create a clear visual and functional direction.'],
    build: ['03', 'BUILD', 'Turn the concept into a working experience.'],
    refine: ['04', 'REFINE', 'Improve the details until everything feels right.']
};
const timelineDetail = document.querySelector('.timeline-detail');
const timelineTrack = document.querySelector('.timeline-track');

document.querySelectorAll('.timeline-step').forEach((step, index) => {
    const activateStep = () => {
        const content = approachContent[step.dataset.step];
        document.querySelectorAll('.timeline-step').forEach((item) => {
            item.classList.toggle('is-active', item === step);
            item.setAttribute('aria-selected', item === step ? 'true' : 'false');
        });
        timelineDetail.querySelector('.timeline-detail-label').textContent = `CURRENT STEP / ${content[0]}`;
        timelineDetail.querySelector('h3').textContent = content[1];
        timelineDetail.querySelector('p').textContent = content[2];
        timelineTrack.style.setProperty('--timeline-progress', `${(index + 1) * 25}%`);
    };

    step.addEventListener('click', activateStep);
    step.addEventListener('focus', activateStep);
});
