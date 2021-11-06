
//affichage des achats

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems) /*Conversion en js*/
    let productContainer = document.querySelector(".products")
    let productTotal = document.querySelector('.products-container')
    let cart = localStorage.getItem("totalCost")
    cart = parseInt(cart)


    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr class='listener' id="${item.color}${item.name}">
					<th scope="row" class="invisible disappear"><p>${item._id}</p></th>
                    <td><img src="${item.imageUrl}"></td>
                    <td><p>${item.name}</p></td>
                    <td><p class="select">${item.varnish[item.color]}</p></td>
					<td class="price"><p>${item.price / 100}€</p></td>
                    <td class="quantity"><p>${item.inCart}</p>
                    </td>
                    <td><p>  ${(item.inCart) * (item.price / 100)} €</p></td>
			</tr>
            `;
        })

        productTotal.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Total
            </h4>
            <h4 class="basketTotal">
                ${cart}€
            </h4>

        </div>`
    }

    else {
        let error = document.querySelector(".products-container")
        console.log(error);
        error.innerHTML = `<div class="error"> 
                            Votre Panier est Vide <i class="far fa-sad-cry"></i>
                             </div>` ;
    }

}
displayCart();

//Numero de commande et infos personnelles

function displayForm() {
    let confirmationMessage = document.querySelector('.bloc-container_title');
    let confirmationNumber = document.querySelector('.bloc-container_order');
    let orderMessage = document.querySelector('.bloc-container__message');
    let cartNumbers = localStorage.getItem("cartNumbers");
    let id = localStorage.getItem('orderId');
    let contact = JSON.parse(localStorage.getItem('contact'));
    let prenom = contact.firstName;
    let nom = contact.lastName;
    let address = contact.address;
    let city = contact.city;
    let mail = contact.email;

    if (cartNumbers = !0) {
        confirmationMessage.innerHTML = `Merci <span class="bloc-container_title_name"> ${prenom} ${nom} </span> pour votre Achat`;
        confirmationNumber.innerHTML = `Numéro de commande :</br> </br>
            <span class='bloc-container_order_id'> ${id} </span>`;
        orderMessage.innerHTML = `<div class="bloc-container__message__address"> Votre commande vous sera livré au <span class="bloc-container__message__address__form">${address} ${city}</span></div>
            <div class"bloc-container__message__mail"> Une confirmation vous sera envoyé à <span class='bloc-container__message__mail__form'>${mail}</span></div>`;
        localStorage.clear();

    }
}
displayForm();






