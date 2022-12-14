//Page produit detail d'UN SEUL ELEMENT
window.parent.document.title = "Panier";


//Récupération de l'id depuis l'url
let product = JSON.parse(localStorage.getItem("produits"));

//AFFICHAGE DES ELEMENTS DU PANIER
function afficherLesProduit(){
if (panier === null || panier.length == 0) {
  document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";

}
else {
for (i = 0; i < product.length; i++) {
  document.querySelector("#cart__items").innerHTML +=`
  <article class="cart__item" data-id="${product[i][0].idProduct}" data-color="{product-color}">
  <div class="cart__item__img">
  <img src="${product[i][0].image}" alt="${product[i][0].altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product[i][0].name}</h2>
      <p>Vert</p>
      <p>"${product[i][0].price}"€</p>
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
</article>
`;
  }
}
}

afficherLesProduit();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Panier 


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


//Bouton commander affiche la page Confirmation.html

