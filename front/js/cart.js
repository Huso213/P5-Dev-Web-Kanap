//Page Panier

cart = JSON.parse(localStorage.getItem("products")) || [];

// Si le panier contient au moins 1 produit
if (cart.length > 0) {
    for (product of cart) {
        displayCart(product);
    }
    productsInCart();
    displayTotalCart();
}

// Affichage des produits présents dans le panier
function displayCart(product) {
  const indexProduct = cart.indexOf(product);
  const productList = document.getElementById("cart__items");
  if( productList != null) {

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

//Afficher le nombre d'article dans panier
function productsInCart() {
  let productNumbers = document.getElementById("totalQuantity");

  if (cart.length > 0) {
      let productInCart = 0;
      for (product of cart) {
          productInCart += product.quantity;
      }
      if (productNumbers != null) {
          productNumbers.innerHTML += `${productInCart}`;
      }
  }
}

  //Calcul du montant total du panier
  function updateTotalCost () {
    let totalCart = 0;
    cart.forEach((product) => {
        totalCart = totalCart + (product.quantity * product.price);
    });
    return totalCart;
}

  //Affichage du montant total du panier
  function displayTotalCart() {
    const totalContent = document.getElementById("totalPrice");
   if (totalContent != null) {
       totalContent.innerHTML += updateTotalCost();
   }
}

//gestion des quantites produits
const inputList = document.querySelectorAll(".itemQuantity");
for (input of inputList) {
    let ind = input.getAttribute("data-index");
    input.addEventListener("click", (e) => {
        const newValue = e.target.value;
        for (products of cart) {
            let index = cart.indexOf(products);
            let qty = cart[index].quantity;
            if(index == ind && newValue > qty) {
                cart[index].quantity++;
                localStorage.setItem("products", JSON.stringify(cart));
                location.reload();
            }else if (index == ind && newValue < qty) {
                cart[index].quantity--;
                localStorage.setItem("products", JSON.stringify(cart));
                location.reload();
            } else {
                newValue == qty;
            }
        }
    });
}
//suprimer le produit
function remove(index) {
  cart.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(cart));
  location.reload();
  displayCart();
}

