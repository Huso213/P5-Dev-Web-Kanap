//Page produit detail d'UN SEUL ELEMENT
window.parent.document.title = "Panier";


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
//Sélection élément HTML ou afficher produits
const produitELE = document.querySelector("#items");

//AFFICHAGE LES PRODUIT SUR LA PAGE D ACCEUL
async function afficherLesProduits() {
  await recupererLesProduits();
  products.forEach((product) => { 
  produitELE.innerHTML +=`
  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
});
}

afficherLesProduits(); 


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
//POUR RETIRE DANS LE PANIER
function removeFromcart(product) {
  //pour retire un produit dans le panier
  let cart = getcart(); //on recupere le panier
  cart = cart.filter((p) => p.id != product.id); //on esseye de retire un element
  savecart(cart);
}

//Changement quantite

function changeQuantity(product, quantity) {
  let cart = getcart();
  let foundProduct = cart.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if(foundProduct.quantity <=0){
        removeFromcart(foundProduct);
    } else{
        savecart(cart);

    }
  }

}

//Calculer les quantite 
function getNumberProduct(){
    let cart = getcart();
    let number = 0;
    for(let product of cart){
        number += product.quantity;
    }
    return number
}
//Calculer les prix
function getTotalPrice(){
    let cart = getcart();
    let total = 0;
    for(let product of cart){
        total += product.quantity * product.price;
    }
    return total;
}

// Test local stockage--Aller dans le panier-console puis tapez " getcart() " puis tapez addcart({les donnez qu'on vuet afficher dan local storge }) il doit l'afficher dans le tableau changequantity({},1) pour modifier la quantite getNumberProduct()--calcule la quantite