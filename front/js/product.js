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
let cartButton = document.getElementById("addToCart");

//ENREGISTREMENT DANS LE PANIER

function savecart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart)); //on le transforme en chaine de caractere;
}

function getcart() {
  let cart = localStorage.getItem("cart"); //on recupere la chaine de caractere et permet de transformer chaine de caractere a nouveau en objet ou tableau
  if (cart == null) {
    //panier null
    return []; //tableau vide si panier n'existe pas
  } else {
    //sinon panier existe
    return JSON.parse(cart);
  } //sinon panier remplie
}
//enregistrement sous forme de tableau tableu
function addcart(product) {
  let cart = getcart(); //on recupere le panier
  //ajout quantite dans le panier
  let foundProduct = cart.find((p) => p.id == product.id); //find fonction travaille sur les tableaux permet de cherche elmnt sur tableau par rapport a une condition
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1; //definition de quantite
    cart.push(product);
  }
  savecart(cart); //enregistrement panier
}

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

}
