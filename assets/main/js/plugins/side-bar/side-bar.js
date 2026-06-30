let jsPie = require('./../js-pie/js-pie');

// document.addEventListener('DOMContentLoaded', () => {

//     let toggleNav, switchTheme, decreaseText, resetText, increaseText;

//     (toggleNav = document.querySelectorAll('[data-click="sideBar.toggleNav"]'))
//         && toggleNav.forEach($e => {
//             $e.addEventListener('click', () => {
//                 let sidenav = document.getElementById("mySidenav");
//                 let main = document.getElementById("main");

//                 sidenav.style.visibility = sidenav.style.visibility == "visible" ? 'hidden' : 'visible';
//                 sidenav.style.width = sidenav.style.width == "150px" ? '0' : '150px';
//                 main.style.marginRight = main.style.marginRight === "150px" ? '0' : '150px';

//                 ($e2 = document.querySelector('[data-ico="sideBar.changeIco"]'))
//                     && $e2.classList[$e2.classList.contains('change') ? 'remove' : 'toggle']('change');
//             });
//         });


//     (switchTheme = document.querySelector('[data-click="sideBar.switchTheme"]'))
//         && switchTheme.addEventListener('click', (e) => {
//             let updateButton = e.currentTarget.classList;
//             let updateTheme = async() => {
//                 let manifest = await fetch(`//${location.host}/dist-new/manifest.json`).then((response) => response.json());
//                 let switchTheme = document.querySelector('[data-switch-theme]')
//                 let changeTo = switchTheme.dataset.switchTheme == 'default' ? 'contrast' : 'default';

//                 let urlTheme = manifest[`dist-new/css/main/${changeTo}.css`];

//                 switchTheme.setAttribute('href', urlTheme);
//                 switchTheme.setAttribute('data-switch-theme', changeTo);

//                 updateButton[updateButton.contains('btn-theme-light') ? 'remove' : 'toggle']('btn-theme-light');

//                 jsPie.setCookie('switch-theme', changeTo);
//             }

//             updateTheme();
//         });


//     (decreaseText = document.querySelector('[data-click="sideBar.decreaseText"]'))
//         && decreaseText.addEventListener('click', () => {
//             let curSize = parseInt($('html').css('font-size')) - 2;

//             if (curSize >= 12) {
//                 $('html').css('font-size', curSize);
//                 $('#mySidenav').css('font-size', 48);
//                 $('.openbtn').css('font-size', 32);
//             }
//         });


//     (resetText = document.querySelector('[data-click="sideBar.resetText"]'))
//         && resetText.addEventListener('click', () => {
//           let curSize = parseInt($('html').css('font-size'));

//             if (curSize != 16) {
//                 $('html').css('font-size', 16);
//             }
//         });


//     (increaseText = document.querySelector('[data-click="sideBar.increaseText"]'))
//         && increaseText.addEventListener('click', () => {
//             let curSize = parseInt($('html').css('font-size')) + 2;

//             if (curSize <= 28) {
//                 $('html').css('font-size', curSize);
//                 $('#mySidenav').css('font-size', 48);
//                 $('.openbtn').css('font-size', 32);
//             }
//         });
// });
document.addEventListener('DOMContentLoaded', () => {

    let toggleNav, decreaseText, resetText, increaseText;

    (toggleNav = document.querySelectorAll('[data-click="sideBar.toggleNav"]')) &&
    toggleNav.forEach($e => {
        $e.addEventListener('click', () => {
            let sidenav = document.getElementById("mySidenav");
            let main = document.getElementById("main");

            sidenav.style.visibility = sidenav.style.visibility == "visible" ? 'hidden' : 'visible';
            sidenav.style.width = sidenav.style.width == "150px" ? '0' : '150px';
            main.style.marginRight = main.style.marginRight === "150px" ? '0' : '150px';

            ($e2 = document.querySelector('[data-ico="sideBar.changeIco"]')) &&
            $e2.classList[$e2.classList.contains('change') ? 'remove' : 'toggle']('change');
        });
    });



    (decreaseText = document.querySelector('[data-click="sideBar.decreaseText"]')) &&
    decreaseText.addEventListener('click', () => {
        let curSize = parseInt($('html').css('font-size')) - 2;

        if (curSize >= 12) {
            $('html').css('font-size', curSize);
            $('#mySidenav').css('font-size', 48);
            $('.openbtn').css('font-size', 32);
        }
    });


    (resetText = document.querySelector('[data-click="sideBar.resetText"]')) &&
    resetText.addEventListener('click', () => {
        let curSize = parseInt($('html').css('font-size'));

        if (curSize != 16) {
            $('html').css('font-size', 16);
        }
    });


    (increaseText = document.querySelector('[data-click="sideBar.increaseText"]')) &&
    increaseText.addEventListener('click', () => {
        let curSize = parseInt($('html').css('font-size')) + 2;

        if (curSize <= 28) {
            $('html').css('font-size', curSize);
            $('#mySidenav').css('font-size', 48);
            $('.openbtn').css('font-size', 32);
        }
    });


    let switchTheme = document.querySelector('[data-click="sideBar.switchTheme"]');

    switchTheme.addEventListener('click', async (e) => {
        let updateButton = e.currentTarget.classList;
        let switchThemeLink = document.querySelector('[data-switch-theme]');
        let currentTheme = switchThemeLink.dataset.switchTheme; // aktualny motyw
        let availableThemes = switchThemeLink.dataset.availableTheme.split(','); // lista motywów

        // Wybierz drugi motyw z listy (zakładamy, że zawsze jest kontrast)
        let changeTo = currentTheme === availableThemes[0] ? availableThemes[1] : availableThemes[0];

        // Pobierz nowy URL z manifestu
        let manifest = await fetch('/dist/manifest.json').then(response => response.json());
        let urlTheme = manifest[`dist/css/main/${changeTo}.css`];

        // Zmień arkusz stylów
        switchThemeLink.setAttribute('href', urlTheme);
        switchThemeLink.setAttribute('data-switch-theme', changeTo);

        // Zaktualizuj przycisk
        updateButton.toggle('btn-theme-light', changeTo === availableThemes[0]);

        // Zapisz w ciasteczku nowy motyw
        jsPie.setCookie('switch-theme', changeTo);
    });
})