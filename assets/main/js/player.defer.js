import videojs from 'video.js';
window.videojs = videojs;

import 'video.js/dist/lang/pl.json';
import "./plugins/nuevo/nuevo.min.js";

try {
    require("./plugins/nuevo/lang/pl.js");
} catch (e) {
    console.warn("Brak pliku lang/pl.js dla Nuevo 14.");
}

const bootPlayer = (id, vjsOptions, nuevoOptions) => {
    const el = document.getElementById(id);
    if (!el || el.classList.contains('vjs-done')) return;

    const hlsUrl = el.getAttribute('data-hls');
    const mp4Url = el.getAttribute('data-fallback');
    const posterAttr = el.getAttribute('data-poster');
    const aspectRatioAttr = el.getAttribute('data-aspect-ratio');

    const currentVjsOptions = { ...vjsOptions };

    if (posterAttr) currentVjsOptions.poster = posterAttr;
    
    // Obsługa wideo pionowego 9:16
    if (aspectRatioAttr) {
        currentVjsOptions.aspectRatio = aspectRatioAttr;
    }

    // Bezpośrednie dodawanie źródeł bez blokującego sprawdzania fetch HEAD
    const sources = [];
    if (hlsUrl && hlsUrl.trim() !== "") {
        sources.push({ src: hlsUrl, type: 'application/x-mpegURL' });
    }
    if (mp4Url && mp4Url.trim() !== "") {
        sources.push({ src: mp4Url, type: 'video/mp4' });
    }

    currentVjsOptions.sources = sources;

    const player = videojs(el, currentVjsOptions);

    player.ready(function() {
        const p = this;

        if (p && typeof p.nuevo === 'function') {
            try {
                p.nuevo({
                    ...nuevoOptions,
                    license: "0303505d170c1f4308",
                    url: mp4Url,
                    hlsJS: true,
                    pauseClick: true
                });
                el.classList.add('vjs-done');

                // --- OBSŁUGA PARAMETRU ?start=X ---
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const startParam = urlParams.get('start');
                let startTime = startParam ? parseFloat(startParam) : null;

                if (startTime && !isNaN(startTime)) {
                    p.currentTime(startTime);
                    p.play();
                    
                    if (p.controlBar && p.controlBar.progressControl && p.controlBar.progressControl.seekBar) {
                        p.controlBar.progressControl.seekBar.update();
                    }

                    p.on('seeking', function () {
                        if (p.currentTime() < startTime) {
                            p.currentTime(startTime);
                        }
                    });

                    p.on('timeupdate', function () {
                        if (p.currentTime() < startTime) {
                            p.currentTime(startTime);
                        }
                    });
                }

                // --- FALLBACK W RAZIE BŁĘDU HLS (.m3u8) ---
                p.on('error', function() {
                    const source = p.currentSource();
                    if (source && source.type === 'application/x-mpegURL' && mp4Url) {
                        p.src({
                            type: 'video/mp4',
                            src: mp4Url
                        });
                        p.play();
                    }
                });

                // --- PRZYWRACANIE POSTERA PO ZAKOŃCZENIU FILMU ---
                p.on('ended', function () {
                    if (posterAttr) {
                        p.poster(posterAttr);
                    }
                    p.currentTime(0);
                    
                    if (p.controlBar && typeof p.controlBar.show === 'function') {
                        p.controlBar.show();
                    }
                    
                    if (typeof p.hasStarted === 'function') {
                        p.hasStarted(false);
                    }
                });

            } catch (nError) {
                console.error("Nuevo init error:", nError);
            }
        }
    });
};

// --- KONFIGURACJE ---
const MAIN_PLAYER_VJS_OPTIONS = {
    autoplay: false,
    muted: false,
    preload: 'auto',
    language: 'pl',
    fluid: true,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    vhs: { overrideNative: true }
};

const MAIN_PLAYER_NUEVO_OPTIONS = {
    buttonForward: true,
    buttonRewind: true,
    snapshot: true,
    hlsQualities: true,
    hdIcon: true,
    video_info: false,
    contextMenu: false,
    singlePlay: true,
    playbackRateMenu: true,
    pauseClick: true,
    shareMenu: false
};

const STREAM_PLAYER_VJS_OPTIONS = {
    autoplay: true,
    muted: true,
    preload: 'auto',
    language: 'pl',
    fluid: true,
    controls: true,
    vhs: { overrideNative: true }
};

const STREAM_PLAYER_NUEVO_OPTIONS = {
    snapshot: true,
    hlsQualities: true,
    hdIcon: true,
    video_info: false,
    contextMenu: false,
    singlePlay: true,
    playbackRateMenu: true,
    pauseClick: true,
    resOnly: true,
    logo: "https://www.gdansk.pl/images/live-streaming4.png",
    logoposition: "LT",
    shareMenu: false
};

const SHORT_PLAYER_VJS_OPTIONS = {
    autoplay: true,
    muted: true,
    loop: true,
    language: 'pl',
    fluid: true,
    controls: true
};

const SHORT_PLAYER_NUEVO_OPTIONS = {
    controlbar: false,
    contextMenu: false,
    singlePlay: true,
    shareMenu: false
};

const setup = () => {
    document.querySelectorAll('.main-player').forEach(el => {
        bootPlayer(el.id, MAIN_PLAYER_VJS_OPTIONS, { ...MAIN_PLAYER_NUEVO_OPTIONS, title: el.getAttribute('name') || "" });
    });
    
    document.querySelectorAll('.stream-player').forEach(el => {
        bootPlayer(el.id, STREAM_PLAYER_VJS_OPTIONS, { ...STREAM_PLAYER_NUEVO_OPTIONS, title: el.getAttribute('name') || "" });
    });

    document.querySelectorAll('.short-player').forEach(el => {
        bootPlayer(el.id, SHORT_PLAYER_VJS_OPTIONS, SHORT_PLAYER_NUEVO_OPTIONS);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}