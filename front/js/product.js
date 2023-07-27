//PAGE info Canape -- Ajout au panier

const cart = JSON.parse(localStorage.getItem("products")) || [];

//class product


//constant nécessaire à la recuperation de la chaine de requête et paramètre de URL
const searchParams = new URLSearchParams(location.search);

//recupere Id du produit
const newId = searchParams.get('_id');

//URL du produit
const newUrl = `http://localhost:3000/api/products/${newId}`;

// Fetch pour récupérer le produit
fetch(newUrl)
    .then((response) => response.json())
    .then ((data) => {
        const product = data;
        addCard(product);

    })