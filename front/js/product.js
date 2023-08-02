//Page produit detail d'UN SEUL ELEMENT

//renomer l'onglet
//window.parent.document.title = "Page Produit";

const cart = JSON.parse(localStorage.getItem("products")) || [];
// class Product
class Product {
  constructor(id, name, description, price, colors, imageUrl, altTxt, quantity)
  {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = +price;
      this.colors = colors;
      this.imageUrl = imageUrl;
      this.altTxt = altTxt;
      this.quantity = +quantity;
  }
}

//Constante  pour recupere la chaine de requête et parametre de l'Url
const searchParams = new URLSearchParams(location.search);

//Récupération de l'id depuis l'url
let params = new URL(document.location).searchParams;
let idProduct = params.get("id");

// récupére l'id du produit
const newId = searchParams.get('_id');

// Url du produit
const newUrl = `http://localhost:3000/api/products/${newId}`;

//Fetch pour recuperer le produit
fetch(newUrl)
.then((response) => response.json())
.then((data) => {
  const product = data;
  addCards(product);

  function addCards(product) {
    const productImage = document.querySelector('.item_img');
    productImage.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}" />`
  }
})