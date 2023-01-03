 //confirmation commande
//Affichage id commande via local storage

function afficherNoCommande() {
   let commandeNumber = document.querySelector("#orderId");
    let commandeID = JSON.parse(localStorage.getItem("idCommande"));
     commandeNumber.innerHTML = `${commandeID}`;
 }
 afficherNoCommande();

//Recuperation e l'id depuis l'URL
let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");

//Affichage du numéro de commande
document.getElementById("orderId").textContent = orderId;