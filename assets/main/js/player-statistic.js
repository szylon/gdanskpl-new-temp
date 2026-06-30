function prepareQuery(query) {
    query = query || {};
    var keys = Object.keys(query);
    if (keys.length === 0) return '';

    var pairs = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        pairs.push(key + '=' + query[key]);
    }
    return '?' + pairs.join('&');
}

function hapi(endpoint, options) {
    options = options || {};
    let get = {};
    if (typeof options.get !== 'undefined') {
        options = Object.assign({ method: 'GET' }, options);
        get = options.get;
    }
    return fetch('https://www.gdansk.pl/hapi/' + endpoint + prepareQuery(get), options);
}

function sendStatistics(plikHapi, videoId, getPublishFrom, playerType, category) {
    if (category !== '18') {
        hapi(plikHapi, {
            get: { videoId: videoId, url: document.URL, getPublishFrom: getPublishFrom, player: playerType }
        }).then(r => r.json()).then(d => console.log('Statystyki wysłane:', d));
    }
}

function sendCamStatistics(plikHapi, videoId, getPublishFrom, playerType) {
    hapi(plikHapi, {
        get: { videoId: videoId, url: document.URL, getPublishFrom: getPublishFrom, player: playerType }
    }).then(r => r.json()).then(d => console.log('Statystyki kamery wysłane:', d));
}

document.addEventListener('DOMContentLoaded', () => {
    const category = window.videoCategory || '';

    // Opóźnienie pozwala upewnić się, że instancje Video.js zostały poprawnie zainicjalizowane
    setTimeout(() => {
        // 1. PLAYER GŁÓWNY (Typ: 1)
        document.querySelectorAll('.main-player').forEach(el => {
            const playerInstance = window.videojs(el.id);
            if (playerInstance) {
                let trackingSent = false;
                playerInstance.on('play', function () {
                    if (!trackingSent) {
                        const videoId = el.getAttribute('data-video-id');
                        const publishFrom = el.getAttribute('data-publish-from');
                        
                        if (category === '18') {
                            sendCamStatistics('statystykiVideo', videoId, publishFrom, 0);
                        } else {
                            sendStatistics('statystykiVideo', videoId, publishFrom, 1, category);
                        }
                        trackingSent = true;
                    }
                });
            }
        });

        // 2. PLAYER SHORT (Typ: 2)
        document.querySelectorAll('.short-player').forEach(el => {
            const playerInstance = window.videojs(el.id);
            if (playerInstance) {
                let trackingSent = false;
                playerInstance.on('playing', function () {
                    if (!trackingSent) {
                        const videoId = el.getAttribute('data-video-id');
                        const publishFrom = el.getAttribute('data-publish-from');
                        sendStatistics('statystykiVideo', videoId, publishFrom, 2, category);
                        trackingSent = true;
                    }
                });
            }
        });

        // 3. PLAYER STREAM (Typ: 3)
        document.querySelectorAll('.stream-player').forEach(el => {
            const playerInstance = window.videojs(el.id);
            if (playerInstance) {
                let trackingSent = false;
                playerInstance.on('playing', function () {
                    if (!trackingSent) {
                        const videoId = el.getAttribute('data-video-id');
                        const publishFrom = el.getAttribute('data-publish-from');
                        sendStatistics('statystykiVideo', videoId, publishFrom, 3, category);
                        trackingSent = true;
                    }
                });
            }
        });
    }, 500);
});