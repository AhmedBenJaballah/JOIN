function policy() {
  
    document.addEventListener("DOMContentLoaded", function () {
        let currentUrl = window.location.pathname;

        let links = document.querySelectorAll("#sidebar #menu a");
        for (let i = 0; i < links.length; i++) {
            if (links[i].getAttribute("href") === currentUrl) {
                links[i].classList.add("current-page");
                break; // Sobald der passende Link gefunden wurde, breche die Schleife ab
            }
        }
    });


}

function notice(){

}