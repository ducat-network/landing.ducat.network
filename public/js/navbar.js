const navbarController = document.querySelector('.main-navigation__controller');
const navbarControllerActiveClass = 'main-navigation__controller-active';
const navbarOpenedClass = 'main-navigation__list-open';
const navbarListOfItems = document.querySelector('.main-navigation__list');

const MENU_ITEMS = {
    '#home': {
        from: 0,
        to: 822,
        isActive: true
    },
    '#about': {
        from: 823,
        to: 1278,
        isActive: false
    },
    '#yield': {
        from: 1279,
        to: 1669,
        isActive: false
    },
    '#vaults': {
        from: 1670,
        to: 2193,
        isActive: false
    },
    '#lending': {
        from: 2194,
        to: 2426,
        isActive: false
    },
    '#integrations': {
        from: 2427,
        to: 2879,
        isActive: false
    },
    '#roadmap': {
        from: 2880,
        to: 3429,
        isActive: false
    },
};

const navbarItems = document.querySelectorAll('.main-navigation__item');
const resetNavbar = () => navbarItems.forEach(item => item.classList.remove('main-navigation__item-active'));
const resetItems = () => Object.values(MENU_ITEMS).forEach(v => v.isActive = false);

const onPageScroll = () => {
    Object.entries(MENU_ITEMS).forEach(([k, v]) => {
        if(window.scrollY + 85 >= v.from && window.scrollY + 85 <= v.to && !v.isActive) {
            resetItems();
            MENU_ITEMS[k].isActive = true;
            resetNavbar();
            document.querySelector(`a[href='${k}']`).classList.add('main-navigation__item-active')
        }
    });
};

navbarController.addEventListener('click', e => {
    if(e.currentTarget.classList.contains(navbarControllerActiveClass)) {
        e.currentTarget.classList.remove(navbarControllerActiveClass);
        navbarListOfItems.classList.remove(navbarOpenedClass);
    } else {
        e.currentTarget.classList.add(navbarControllerActiveClass);
        navbarListOfItems.classList.add(navbarOpenedClass);
    }
});

navbarItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        document.removeEventListener('scroll', onPageScroll);
        navbarController.classList.remove(navbarControllerActiveClass);
        navbarListOfItems.classList.remove(navbarOpenedClass);
        const currentItem = e.currentTarget.getAttribute('href');

        const intersectionObserver = new IntersectionObserver((entries) => {
            let [entry] = entries;
            if(entry.isIntersecting) {
                setTimeout(() => {
                    document.addEventListener('scroll', onPageScroll);
                }, 200);
                intersectionObserver.disconnect();
            }
        });

        resetItems();
        MENU_ITEMS[currentItem].isActive = true;
        resetNavbar();
        e.currentTarget.classList.add('main-navigation__item-active');

        intersectionObserver.observe(document.querySelector(currentItem));
        document.querySelector(currentItem).scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    })
});

document.addEventListener('scroll', onPageScroll);