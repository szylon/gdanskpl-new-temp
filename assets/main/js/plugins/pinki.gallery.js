document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery_article_box').forEach((el, index) => {
        let id = el.getAttribute('data-gallery-id');
        $('.gallery_article_box').eq(index).load(`https://www.gdansk.pl/fotogaleria-artykul3/${id}`);
    });
});
