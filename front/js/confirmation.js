//Afficher le numero de la commande
const orderId = JSON.parse(localStorage.getItem("order")) || [];
let informations = document.querySelector("#orderId");
localStorage.clear();
if (informations != null) {
    informations.innerHTML += `${orderId.orderId}`;
}
