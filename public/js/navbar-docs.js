const navbarItems = document.querySelectorAll('.main-menu > ul > li > a, .main-menu > ul > ul > li > a');
navbarItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const currentItem = e.currentTarget.getAttribute('href');
        window.scrollTo({
            top: document.querySelector(currentItem).offsetTop - 20,
            behavior: 'smooth'
        });
    })
});