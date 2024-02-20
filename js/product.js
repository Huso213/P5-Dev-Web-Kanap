// PAGE 1 CANAPE --AJOUTER AU PANIER--

const cart = JSON.parse(localStorage.getItem("allproducts")) || [];

// class Canape
class Canape {
    constructor(id, name, price, colors, imageUrl, quantity)
    {
        this.id = id;
        this.name = name;
        //this.description = description;
        this.price = +price;
        this.colors = colors;
        this.imageUrl = imageUrl;
        //this.altTxt = altTxt;
        this.quantity = +quantity;
    }
}

// Constante pour recupere la requête et paramètre de l'url
const searchParams = new URLSearchParams(location.search);

// récupére l'id du produit
const newId = searchParams.get('_id');

// Url produit
const nouvUrl = `http://localhost:3000/api/products/${newId}`;

// Fetch pour récupérer le produit
fetch(nouvUrl)
    .then((response) => response.json())
    .then ((data) => {
        const product = data;
        addCard(product);
        
//Fonction pour afficher le produit en affichant les elements images, noms des produits, prix...
        function addCard(product) {
            const productImage = document.querySelector('.item__img');
           productImage.innerHTML += `<img decoding="async" src="${product.imageUrl}" alt="${product.altTxt}" />`;

            const productName = document.getElementById('title');
            productName.innerHTML += `${product.name}`;

            const productPrice = document.getElementById('price');
            productPrice.innerHTML += `${product.price}`;

            const productDescription = document.getElementById('description');
            productDescription.innerHTML += `${product.description}`;

            addColors(product);

    //l'onglet est reome par le nom du produit au lieu de "nom du produit"
         document.title = product.name +''
        }

//fonction pour afficher les couleurs disponible
        function addColors(product) {
            let options = document.getElementById('colors');

            for (let colors of product.colors) {
                options.innerHTML += `<option value="${colors}">${colors}</option>`
            }
        }
//bouton "ajouter au panier" 
        let boutAddCart = document.getElementById('addToCart');

        boutAddCart.addEventListener("click", () => {
                let colors = document.getElementById("colors");
                let quantity = document.getElementById("quantity");

                let objetProduit = new Canape(
                    newId,
                    product.name,
                   // product.description,
                    product.price,
                    colors.value,
                    product.imageUrl,
                    //product.altTxt,
                    quantity.value
                );
//alert si l'utilisateur n'a pas choisit la couleurs et la quantité
                if (colors.value == "") {
                    alert("Vous devez sélectionner une couleur !");
                } else if (quantity.value == 0) {
                    alert("Vous devez sélectionner une quantité !");
                } else {
                    let isInCart = false;
                    let infoPanier;
                    for (products of cart) {
                        switch(products.colors) {
                            case objetProduit.colors:
                                isInCart = true;
                                infoPanier = cart.indexOf(products);
                        }
                    }
                    if (isInCart) {
                        cart[infoPanier].quantity = +cart[infoPanier].quantity + +objetProduit.quantity;
                        localStorage.setItem("allproducts", JSON.stringify(cart));
                    } else {
                        cart.push(objetProduit);
                        localStorage.setItem("allproducts", JSON.stringify(cart));
                    }
                    alert("Votre produit à été enregistre dans le panier");
                }
        })

    })
    //alert si le serveur n'est pas lancé
    .catch((error) => {
        alert(
            "Attention votre serveur Node n'est pas lancé !"
        );
    });

  