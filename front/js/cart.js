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

//Gestion des quantites produits
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

 //Regex pour formulaire
 const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
 const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
 const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
 const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
 

 const order = document.querySelector('#order');

 if (order != null) {

    order.addEventListener("click", (event) => {
//Collecter les info formulaire dans l'objet contact
let contact = {
    firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value

}
if (
    (regexName.test(contact.firstName) == true) &
    (regexName.test(contact.lastName) == true) &
    (regexAddress.test(contact.address) == true) &
    (regexCity.test(contact.city) == true) &
    (regexMail.test(contact.email) == true)
) {
    let products = [];
    for (listId of cart) {
        products.push(listId.id);
    }
    //envoi objet contact et tableau products à l'API
    const urlPost = 'http://localhost:3000/api/products/order/';
    fetch(urlPost, {
        method: "POST",
        headers: {"Content-Type" : "application/json"
    },
    body: JSON.stringify({ contact, products })
})
.then((response) => response.json())
.then((data) => {
    localStorage.setItem("order", JSON.stringify(data));
    document.location.href = "../html/confirmation.html";
})
.catch((error) => console.log("erreur : " + error));

    //Si erreur formulaire alert
} else {
    errorMsgFirstName = document.getElementById("firstNameErrorMsg");
    if (regexName.test(contact.firstName) == false) {
        errorMsgFirstName.innerHTML += "Merci de renseigner ce champs correctement";
    }


    errorMsgLastName = document.getElementById("lastNameErrorMsg");
            if (regexName.test(contact.lastName) == false){
                errorMsgLastName.innerHTML = "Merci de renseigner ce champs correctement";
            }

  errorMsgAdress = document.getElementById("addressErrorMsg");
            if (regexAdress.test(contact.address) == false) {
                errorMsgAdress.innerHTML += "Merci de renseigner ce champs correctement";
            }

errorMsgCity = document.getElementById("cityErrorMsg");
            if (regexCity.test(contact.city) == false) {
                errorMsgCity.innerHTML += "Merci de renseigner ce champs correctement";
            }

            errorMsgEmail = document.getElementById("emailErrorMsg");
            if (regexMail.test(contact.email) == false) {
                errorMsgEmail.innerHTML += "Merci de renseigner ce champs correctement";
            }
        }
    });
}
