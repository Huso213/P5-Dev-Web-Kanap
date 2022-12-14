//page d'ACCEUIL affichage des produits depuis l'API

//Attention peut-on ecrire differement???
//fetch("http://localhost:3000/api/products")
// .then((response) => response.json())
// .then((data) => console.log(data));
//Recupération des données depuis l'API
const recupererLesProduits = async function () {
  await fetch("http://localhost:3000/api/products")
      .then(function (res) {
          return res.json();
      })
      .then(function (data) {
          return (products = data);
      });
};


//Sélection élément HTML ou afficher produits
const produitELE = document.querySelector("#items");

//AFFICHAGE LES PRODUIT SUR LA PAGE D ACCEUL
async function afficherLesProduits() {
  await recupererLesProduits();
  products.forEach((product) => { 
  produitELE.innerHTML +=`
  <a href="./product.html?id=${product._id}">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
</a>`;
});
}

afficherLesProduits(); 