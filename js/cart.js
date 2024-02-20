//PAGE PANIER
cart = JSON.parse(localStorage.getItem("allproducts")) || [];


//Renomer l'onglet "PANIER"
document.title = "Panier"

//Dans le panier au moins 1 produit ou panier vide si 0 produit "panier vide"
if (cart.length > 0) {
    for (product of cart) {
        afficherCart(product);
    }
    productsdnsCart();
    displaytotalsCart();
} else {
    const elementParent = document.getElementById("cartAndFormContainer");
    elementParent.innerHTML = `<h1>Votre panier est vide</h1>`;
}
// Fonction pour afficher les articles du panier
function afficherCart(product) {
  const indexProduct = cart.indexOf(product);
  const produitList = document.getElementById("cart__items");
  if( produitList != null) {

    produitList.innerHTML += `
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

//Le nombre total d'article dans panier
function productsdnsCart() {
    let produitNombres = document.getElementById("totalQuantity");
  
    if (cart.length > 0) {
        let productdnCart = 0;
        for (product of cart) {
            productdnCart += product.quantity;
        }
        if (produitNombres != null) {
            produitNombres.innerHTML += `${productdnCart}`;
        }
    }
  }
  
  //------Calcul du montant total du panier----
  function MjourTotal () {
    let totalsCart = 0;
    cart.forEach((product) => {
        totalsCart = totalsCart + (product.quantity * product.price);
    });
    return totalsCart;
}

  //-----Fonction pour calculer le montant total du panier
  function displaytotalsCart() {
    const totalsContent = document.getElementById("totalPrice");
   if (totalsContent != null) {
       totalsContent.innerHTML += MjourTotal();
   }
}
//---Modifier la quantité d'un produit panier-----
const entryList = document.querySelectorAll(".itemQuantity");
for (input of entryList) {
    let ind = input.getAttribute("data-index");
    input.addEventListener("click", (e) => {
        const nouValue = e.target.value;
        for (products of cart) {
            let index = cart.indexOf(products);
            let qty = cart[index].quantity;
            if(index == ind && nouValue > qty) {
                cart[index].quantity++;
                localStorage.setItem("allproducts", JSON.stringify(cart));
                location.reload();
            }else if (index == ind && nouValue < qty) {
                cart[index].quantity--;
                localStorage.setItem("allproducts", JSON.stringify(cart));
                location.reload();
            } else {
                nouValue == qty;
            }
        }
    });
}

//-----Fonction suprimer un produit du panier -----
function remove(index) {
  cart.splice(index, 1);//methode pour sup 1 element dans le tableau
  localStorage.setItem("allproducts", JSON.stringify(cart));
  location.reload();
  afficherCart();
}

//------Verification des donnees du formulaire pour valider la commande
 //Regex pour formulaire
 const regexNom = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
 const regexCity = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/; 
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
    (regexNom.test(contact.firstName) == true) &
    (regexNom.test(contact.lastName) == true) &
    (regexAddress.test(contact.address) == true) &
    (regexCity.test(contact.city) == true) &
    (regexMail.test(contact.email) == true)
) {
    let products = [];
    for (listId of cart) {
        products.push(listId.id);
    }
    // Envoyer les information a l'API sous forme d'objet contact et tableau
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
    location.reload();

    document.location.href = "../html/confirmation.html";

})
.catch((error) => console.log("erreur : " + error));

    //Si erreur formulaire alert
} else {
    errorMsgFirstName = document.getElementById("firstNameErrorMsg");
    if (regexNom.test(contact.firstName) == false) {
        errorMsgFirstName.innerHTML += "Champs incorrects veuillez vérifier vôtre Prenom";
    }


    errorMsgLastName = document.getElementById("lastNameErrorMsg");
            if (regexNom.test(contact.lastName) == false){
                errorMsgLastName.innerHTML = "Champs incorrects veuillez vérifier vôtre Nom";
            }

  errorMsgAdress = document.getElementById("addressErrorMsg");
            if (regexAddress.test(contact.address) == false) {
                errorMsgAdress.innerHTML += "Champs incorrects vous ne pouvez utiliser que des chiffres, lettres, espaces";
            }

errorMsgCity = document.getElementById("cityErrorMsg");
            if (regexCity.test(contact.city) == false) {
                errorMsgCity.innerHTML += "Champs incorrects merci de saisir votre code postal et votre ville";
            }

            errorMsgEmail = document.getElementById("emailErrorMsg");
            if (regexMail.test(contact.email) == false) {
                errorMsgEmail.innerHTML += "Champs incorrects merci de verifier votre adresse mail";
            }
        }
    });
}
