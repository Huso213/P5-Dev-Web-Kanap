// affiche la confirmation et numero de la commande
const orderId = JSON.parse(localStorage.getItem("order")) || [];
let informations = document.querySelector("#orderId");
if(informations != null) {
    informations.innerHTMl += '${orderId.orderId}';
}