function updateDynamicSection(url, updateEvery = 180, firstRun = false) {
    let lastPageActivity = Date.now();

    document.addEventListener("mousemove", function() {
        lastPageActivity = Date.now();
    });

    document.addEventListener("click", function() {
        lastPageActivity = Date.now();
    });

    const myInterval = setInterval(updateHtml, 1000);

    function updateHtml() {
        let now = Date.now();

        if (now - lastPageActivity > updateEvery * 1000 || firstRun === true) {
            lastPageActivity = Date.now();

            fetch(url).then(function (response) {
                return response.text();
            }).then(function (html) {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(html, "text/html");
                const dynamicSections = htmlDocument.querySelectorAll('[data-update-dynamic-section]');

                dynamicSections.forEach(item => {
                    let name = item.dataset.updateDynamicSection;
                    let update = document.querySelector(`[data-update-dynamic-section="${name}"]`);

                    update.innerHTML = item.innerHTML;
                });
            }).catch(function (err) {
                console.warn('updateDynamicSection: something went wrong.', err);
            });
        }

        firstRun = false;
    }
}

module.exports = updateDynamicSection;