import 'owl.carousel';

function owlCarousel() {
    let owlCarousel = {
        loop: false,
        autoplay: false,
        margin: 20,
        navText: [
            '<div class="d-flex justify-content-center carousel-control-prev-icon"><span  style="visibility: hidden;">Poprzedni</span></div>',
            '<div class="d-flex justify-content-center carousel-control-next-icon"><span  style="visibility: hidden;">Następny</span></div>',
        ],
        responsiveClass: true,
        lazyLoad: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            540: {
                items: 1,
                slideBy: 1,
            },
            720: {
                items: 1,
                slideBy: 1,
            },
            960: {
                items: 1,
                slideBy: 1,
            }
        }
    };

    document.querySelectorAll('.owl-carousel').forEach((el, index) => {
        if (!el.hasAttribute('data-value-render') || el.getAttribute('data-value-render') == 'false') {
            let json = el.getAttribute('data-value') ?? {};

            json = json.replace('&quot;', '"');
            json = JSON.parse(json);
            json = Object.assign(owlCarousel, json);

            $('.owl-carousel').eq(index).owlCarousel(json);
            el.setAttribute('data-value-render', true);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    owlCarousel();
});

global.collectTrigger.push(() => owlCarousel());
