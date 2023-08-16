//Page Panier
cart = JSON.parse(localStorage.getItem("products")) || [];

//si le panier contient un produit
if (cart.length > 0) {
    for(product of cart) {
        displayCart(product);
    }
    productIncart();
    displayCart();
}

// Affichage des produits présents dans le panier
function displayCart(product) {
  const indexProduct = cart.indexOf(product);
  const productList = document.getElementById("cart__items");
  if (productList != null) {
    productList.innerHTML += `
        <article class="cart__item" data-id="${product.id}">
        <div class="cart__item__img">
            <img decoding="async" src="${product.imageUrl}" alt="${
      product.altTxt
    }">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${product.name}</h2>
                <p>${product.price * product.quantity} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div><p>Color : ${product.colors}</p><br></div>
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                  product.quantity
                }" data-index=${indexProduct}>
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick="remove(${indexProduct})">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
  }
}

