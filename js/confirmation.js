//PAGE CONFIRMATION

//Commande validé le numero de la commande afffiché
const orderId = JSON.parse(localStorage.getItem("order")) || [];
//on insert le numero de la commande avec orderId 
let informations = document.querySelector("#orderId");
//commande valide on vide le panier


localStorage.clear();

if (informations != null) {
    informations.innerHTML += `${orderId.orderId}`;//innerhtml permet d'inserer le num de la commande
}

