require('./plugins/pinki.gallery');
require('share-buttons');


let templatePhotoArticle = `
    <img class="img-responsive img-fluid" src="%src%" alt="%alt%">
    <div class="article-foto-caption">
        <div data-file-title="">%title%</div>
        <div data-file-author="">%author%</div>
    </div>
`;
let renderPhotoInArticle = () => {
    let $articles = document.querySelectorAll('.article-content');

    $articles.forEach(($article) => {
        let $els = $article.querySelectorAll('[class="article-foto"][data-file-id]');
        let articleId = $article.getAttribute('data-article-id');
        let $jsonString = $article.querySelector(`[data-article-data-photos="${articleId}"]`);
        let path = window.location.pathname;

        
        if ($jsonString && /^\/.+,a,\d+$/.test(path)) {
            let data = JSON.parse($jsonString.innerHTML);

            $els.forEach(($node) => {
                if (data.hasOwnProperty($node.getAttribute('data-file-id'))) {
                    let img = data[$node.getAttribute('data-file-id')];
                    let insert = templatePhotoArticle;

                    for (const [key, value] of Object.entries(img)) {
                        const reg = new RegExp(`%${key}%`, 'g');
                        insert = insert.replace(reg, value);
                    }

                    let photo = document.createElement('div');
                    photo.innerHTML = insert;

                    if (data['addDate'] > '2018-04-01 00:00:00') {
                        if ($node.querySelector('.article-foto-caption') === null) {
                            photo.querySelector('.article-foto-caption').remove();
                        }
                    }

                    if ($node.getAttribute('data-file-show-title') == 'false' && $node.getAttribute('data-file-show-author') == 'false') {
                        photo.querySelector('article-foto-caption').remove();
                    }
                    else {
                        if ($node.getAttribute('data-file-show-title') == 'false') {
                            photo.querySelector('data-file-title').remove();
                        }

                        if ($node.getAttribute('data-file-show-author') == 'false') {
                            photo.querySelector('data-file-author').remove();
                        }
                    }

                    $node.innerHTML = photo.innerHTML;
                }
                else {
                    $node.remove();
                }
            });
        }
    });
}

renderPhotoInArticle();
