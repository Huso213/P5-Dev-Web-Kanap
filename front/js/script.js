//Attention peut-on ecrire differement???
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));


//BESOIN AFFICHER LA PHOTO DU CANAPE-NOM DU CANAPE-DESCRIPTION
//`<a href="./product.html?id=${product._id}">
//<article>
 // <img src=".../product01.jpg${product.imageUrl}" alt="${product.altTxt}Lorem ipsum dolor sit amet, Kanap name1">
  //<h3 class="productName">Kanap name1${product.name}</h3>
  //<p class="productDescription">${product.description}</p>
//</article>
//</a>`