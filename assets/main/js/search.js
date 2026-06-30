// ---[ wyszukiwarka google ]---
var cx = '014454047747764746987:dhhzcoxetzg';
var gcse = document.createElement('script');
gcse.type = 'text/javascript';
gcse.async = true;
gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
// var s = document.getElementsByTagName('script')[0];

document.body.appendChild(gcse);

// Placeholder - external script
window.onload = demo;

function demo() {
    document.getElementById("gsc-i-id1").setAttribute("placeholder", "szukaj...")
}
