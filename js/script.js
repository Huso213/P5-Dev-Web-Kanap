//URL de l'API pour récupérer les produit
const url = 'http://localhost:3000/api/products/';

//Utiliser fetch pour recuperer les donnees des produits
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    addCards(data);
  })
    //Alert si le serveur n'est pas lancé
    .catch ((error) => {
        alert("Alerte le serveur Node n'est pas lancé !")
    });

// Fonction permetant d'afficher les produits en page d'accueil
function addCards(data) {
    const items = document.getElementById('items');

    data.forEach(product => {
        const card = document.createElement('a');
        card.href = `./product.html?_id=${product._id}`;

        const article = document.createElement('article');

        const img = document.createElement('img');
        img.decoding = 'async';
        img.src = product.imageUrl;
        img.alt = product.altTxt;

        const productName = document.createElement('h3');
        productName.className = 'productName';
        productName.textContent = product.name;

        const productDescription = document.createElement('p');
        productDescription.className = 'productDescription';
        productDescription.textContent = product.description;

        article.appendChild(img);
        article.appendChild(productName);
       article.appendChild(productDescription);
        card.appendChild(article);
        items.appendChild(card);
    });
}