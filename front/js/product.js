//Page produit detail d'UN SEUL ELEMENT
window.parent.document.title = "Page Produit";

//Récupération de l'id depuis l'url
let params = new URL(document.location).searchParams;
let idProduct = params.get("id");

//Fetch des données par rapport à l'id récupéré dans l'url du produit
const fetchProductId = async function () {
  await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      produits = data;
    });
};


// Affichage du produit
const afficherLeProduit = async function () {
  await fetchProductId();
  let choixColor = document.querySelector("#colors");
  document.querySelector(".item__img").innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
  document.getElementById("title").textContent = produits.name;
  document.getElementById("price").textContent = produits.price;
  document.getElementById("description").textContent = produits.description;
  produits.colors.forEach((option) => {
      choixColor.innerHTML += `<option value="${option}">${option}</option>`;
  });
};
afficherLeProduit();
//Selection du bouton ajouter au panier
let cartButton = document.getElementById("addToCart");

//Ajouter produit au panier lors du clique
cartButton.addEventListener("click", function (e) {
    if (document.querySelector("#colors").value == "") {
        alert("Veuillez sélectionnez une couleur");
        e.preventDefault();
    } else {
        // Select des elements à mettre dans le panier
        let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
        let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
        let name = document.getElementById("title").textContent;
        let price = document.getElementById("price").textContent + "€";
        let choixOpt = document.querySelector("#colors").value;
        let productID = idProduct;
        //transformation du type of qty
        let qty_chiffre = document.querySelector("#quantity").value;
        let qty = Number(qty_chiffre);

        //pour tester la boucle et l'arreter
        let boucle = 0;
//// PANIER


//alert(addToCart+'Le canape a été ajouté dans votre panier')  
const button = document.querySelector("#addToCart")
if(button != null){
button.addEventListener("click", (e) => {         //e event
const color = document.querySelector("#colors").value
if (color == null || color === "" || quantity == null || quantity == 0) {
  alert("Veuillez choisir la couleur et la quantité")
}
//Enregistrement local storage
localStorage.setItem(idProduct, color)

})
}}})