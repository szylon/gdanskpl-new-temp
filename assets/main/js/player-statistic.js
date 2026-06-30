const prepareQuery = (query = {}) => 
    Object.keys(query).length > 0 
        ? '?' + Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&') 
        : ''; [cite: 2]

function hapi(endpoint, options = {}) {
    let get = {};
    if (typeof options.get !== 'undefined') {
        options = { method: 'GET', ...options }; [cite: 3]
        get = options.get; [cite: 4]
    }
    return fetch(`https://www.gdansk.pl/hapi/${endpoint}${prepareQuery(get)}`, options); [cite: 4]
}

function sendStatistics(plikHapi, videoId, getPublishFrom, playerType, category) {
    if (category !== '18') { [cite: 12]
        hapi(plikHapi, {
            get: { videoId: videoId, url: document.URL, getPublishFrom: getPublishFrom, player: playerType } [cite: 12]
        }).then(r => r.json()).then(d => console.log('Statystyki wysłane:', d)); [cite: 12]
    }
}

function sendCamStatistics(plikHapi, videoId, getPublishFrom, playerType) {
    hapi(plikHapi, {
        get: { videoId: videoId, url: document.URL, getPublishFrom: getPublishFrom, player: playerType } [cite: 14]
    }).then(r => r.json()).then(d => console.log('Statystyki kamery wysłane:', d)); [cite: 14]
}

document.addEventListener('DOMContentLoaded', () => {
    const category = window.videoCategory || '';

    // Opóźnienie równe 500ms gwarantuje, że instancje Video.js zdążyły się utworzyć w player.defer.js
    setTimeout(() => {
        // 1. PLAYER GŁÓWNY (Typ: 1)
        document.querySelectorAll('.main-player').forEach(el => {
            const playerInstance = window.videojs(el.id);
            if (playerInstance) {
                let trackingSent = false;
                playerInstance.on('play', function () { [cite: 23]
                    if (!trackingSent) {
                        const videoId = el.getAttribute('data-video-id'); [cite: 23]
                        const publishFrom = el.getAttribute('data-publish-from'); [cite: 23]
                        
                        if (category === '18') { [cite: 13]
                            sendCamStatistics('statystykiVideo', videoId, publishFrom, 0); [cite: 13]
                        } else {
                            sendStatistics('statystykiVideo', videoId, publishFrom, 1, category); [cite: 23]
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
                playerInstance.on('playing', function () { [cite: 20]
                    if (!trackingSent) {
                        const videoId = el.getAttribute('data-video-id'); [cite: 20]
                        const publishFrom = el.getAttribute('data-publish-from'); [cite: 20]
                        sendStatistics('statystykiVideo', videoId, publishFrom, 2, category); [cite: 20]
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
                playerInstance.on('playing', function () { [cite: 17]
                    if (!trackingSent) {
                        const videoId = el.getAttribute('data-video-id'); [cite: 17]
                        const publishFrom = el.getAttribute('data-publish-from'); [cite: 17]
                        sendStatistics('statystykiVideo', videoId, publishFrom, 3, category); [cite: 17]
                        trackingSent = true;
                    }
                });
            }
        });
    }, 500);
});