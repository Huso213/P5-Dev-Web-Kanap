fetch("http://localhost:3000/api/products")
 .then((response) => response.json())
 .then((data) => console.log(data));


//Sélection élément HTML ou afficher produits
const produitELE = document.querySelector("section.item");

async function afficherLesProduits() {
    await recupererLesProduits();
    products.forEach((product) => {
    produitELE.innerHTML +=`
<img src="${product.imageUrl}" alt="${product.altTxt}"> 
//<h1 id="title">"${product.title}</h1>
//<p>Prix : <span id="price">"${product.price}</span>€</p>
//<p id="description">${product.description}</p>
//CHOIX DE LA COULEUR
//<option value="vert">vert</option>
//<option value="blanc">blanc</option> 
`;
    })}
    afficherLesProduits();

    

