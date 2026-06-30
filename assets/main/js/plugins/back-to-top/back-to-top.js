document.addEventListener('DOMContentLoaded', () => {

      $('footer').append(`
          <div id="back-to-top" class="position-fixed">
              <button class="btn btn-primary btn-lg" aria-label="Przewiń do góry">
                  <i class="fas fa-caret-up"></i>
              </button>
          </div>
          `).ready(function() {
          let $btn = $('#back-to-top');
          $(window).on('scroll', function() {
          $(window).scrollTop() > 50 ? $btn.fadeIn() : $btn.fadeOut();
          });

          $btn.click(function () {
              $('body,html').animate({
                  scrollTop: 0
              }, 400);
              return false;
          });
      });
  });