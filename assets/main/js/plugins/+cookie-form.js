'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let script = document.createElement('script');
    let s = document.getElementsByTagName("head")[0];

    script.setAttribute('src', '//system.cookieform.pl/assets/js/plugin.js');
    s.insertBefore(script, s.firstChild);
});