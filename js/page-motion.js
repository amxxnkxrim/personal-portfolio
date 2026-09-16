(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll('.scroll-reveal');

    if (reduceMotion) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

        revealItems.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
            revealObserver.observe(item);
        });
    }

    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
        const target = link.getAttribute('href');
        if (!target || target.startsWith('#') || link.target === '_blank') return;

        link.addEventListener('click', (event) => {
            if (reduceMotion || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            event.preventDefault();
            document.body.classList.add('page-leaving');
            window.setTimeout(() => { window.location.href = target; }, 360);
        });
    });
})();