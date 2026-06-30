// Pobieramy wszystkie przyciski o atrybucie data-toast-trigger
const toastTriggers = document.querySelectorAll('[data-toast-trigger]');

// Iterujemy po wszystkich przyciskach
toastTriggers.forEach((trigger) => {
  // Dodajemy nasłuchiwanie kliknięcia na każdym przycisku
  trigger.addEventListener('click', () => {
    // Odczytujemy atrybut data-toast przypisany do danego przycisku
    const toastId = trigger.dataset.toastTrigger;

    // Pobieramy odpowiedni toast na podstawie odczytanego atrybutu
    const toast = document.querySelector(`[data-toast="${toastId}"]`);

    // Tworzymy nową instancję Bootstrap Toast z odpowiednim tostem
    const bootstrapToast = new bootstrap.Toast(toast);

    // Pokazujemy toast
    bootstrapToast.show();
  });
});