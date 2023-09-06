// PAGE 1 CANAPE --AJOUTER AU PANIER--
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

// Constante nécessaire à la récupération de la chaine de requête et paramètre de l'url
const searchParams = new URLSearchParams(location.search);

// récupére l'id du produit
const newId = searchParams.get('_id');

// Url du produit
const newUrl = `http://localhost:3000/api/products/${newId}`;

// Fetch pour récupérer le produit
fetch(newUrl)
    .then((response) => response.json())
    .then ((data) => {
        const product = data;
        addCard(product);

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
        }

        function addColors(product) {
            let options = document.getElementById('colors');

            for (let colors of product.colors) {
                options.innerHTML += `<option value="${colors}">${colors}</option>`
            }
        }

        let btnAddToCart = document.getElementById('addToCart');

        btnAddToCart.addEventListener("click", () => {
                let colors = document.getElementById("colors");
                let quantity = document.getElementById("quantity");

                let objectProduct = new Product(
                    newId,
                    product.name,
                    product.description,
                    product.price,
                    colors.value,
                    product.imageUrl,
                    product.altTxt,
                    quantity.value
                );

                if (colors.value == "") {
                    alert("Vous devez sélectionner une couleur !");
                } else if (quantity.value == 0) {
                    alert("Vous devez indiquer une quantité !");
                } else {
                    let isInCart = false;
                    let indexModification;
                    for (products of cart) {
                        switch(products.colors) {
                            case objectProduct.colors:
                                isInCart = true;
                                indexModification = cart.indexOf(products);
                        }
                    }
                    if (isInCart) {
                        cart[indexModification].quantity = +cart[indexModification].quantity + +objectProduct.quantity;
                        localStorage.setItem("products", JSON.stringify(cart));
                    } else {
                        cart.push(objectProduct);
                        localStorage.setItem("products", JSON.stringify(cart));
                    }
                    alert("Votre produit à bien été ajouté au panier");
                    window.location.href = "cart.html"
                }
        })

    })
    .catch((error) => {
        alert(
            "Attention votre serveur Node n'est pas lancé !"
        );
    });