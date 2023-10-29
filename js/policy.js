function policy(element) {
    // Alle Elemente mit der Klasse "privacyLegalSignUp" auswählen
    var elements = document.querySelectorAll('.privacyLegalSignUp');

    // Iteriere durch die ausgewählten Elemente
    elements.forEach(function(el) {
      // Entferne die "active"-Klasse von allen Elementen
      el.classList.remove('active');
    });

    // Füge die "active"-Klasse zum angeklickten Element hinzu
    element.classList.add('active');
  }

function notice(){

}