global.$ = global.jQuery = require('jquery');
// global.jsPie = require('./plugins/js-pie/js-pie');
global.linkBuild = require('./plugins/link-build');

global.collectTrigger = [];
global.flushTrigger = () => global.collectTrigger.map(trigger => trigger());

// import 'share-buttons';
// import 'popper.js';
// import '@fortawesome/fontawesome-free/js/all';

global.bootstrap = require('bootstrap');
// global.share_buttons = require('share-buttons');
// global.slick_carousel = require('slick-carousel');

require('./plugins/owl.carusel');





// ───────────────────────────────
// Ustawienie jQuery globalnie
// import $ from 'jquery';
// window.$ = window.jQuery = $;

// global.linkBuild = require('./plugins/link-build');
// global.collectTrigger = [];
// global.flushTrigger = () => global.collectTrigger.map(trigger => trigger());
// global.bootstrap = require('bootstrap');

// require('./plugins/owl.carusel');

