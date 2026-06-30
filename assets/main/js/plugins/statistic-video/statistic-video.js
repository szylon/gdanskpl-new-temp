// Skrypt dodający znacznik '?gdanskpl' do adresu iframe - dla statystyk

'use strict';
// Poczekaj na załadowanie strony
document.addEventListener('DOMContentLoaded', () => {
    // Pobierz bieżący adres strony
    var currentUrl = window.location.href;

    // Sprawdź, czy adres strony zawiera "www.gdansk.pl"
    if (currentUrl.includes("gdansk.pl")) {
        // Jeżeli tak, dodaj "?gdanskpl" do src iframe
        var iframe = document.querySelector('iframe');
        if (iframe && iframe.src.includes("gdansk.pl/tv/embed-player")) {
            iframe.src += "?gdanskpl";
        }
    }
});