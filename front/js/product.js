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
      produit = data;
    });
};

//AFFICHER LE PRODUIT

const afficherLeProduit = async function () {
  await fetchProductId();
  let choixColor = document.querySelector("#colors");
  document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  document.getElementById("title").textContent = produit.name;
  document.getElementById("price").textContent = produit.price;
  document.getElementById("description").textContent = produit.description;
  produit.colors.forEach((option) => {
    //boucler tableau color pour apparaitre pour les couleurs
    choixColor.innerHTML += `<option value="${option}">${option}</option>`;
  });
};

afficherLeProduit();

//SELECTION DU BOUTON AJOUTER AU PANIER

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

//BOUTON AJOUTER AU PANIER ENREGISTRE LA COMMANDE


//ALERT AU CLICK

onclick(addToCart)= alert('Le canape a été ajouté dans votre panier')