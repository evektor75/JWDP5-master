
//Cache
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
    }
onLoadCartNumbers();

//affichage du panier

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems) /*Conversion en js*/
    let productContainer = document.querySelector(".products");
    let productTotal = document.querySelector(".products-container");
    let cartCost = localStorage.getItem("totalCost");

    
    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr class='listener'>
					<th scope="row" class="invisible disappear"><p>${item._id}</p></th>
					<td><button type="button" class="btn btn-danger">Retirer</button></td>
                    <td><img src="${item.imageUrl}"></td>
                    <td><p>${item.name}</p></td>
                    <td><p>${item.varnish[item.color]}</p></td>
					<td class="price"><p>${item.price / 100}€</p></td>
                    <td class="quantity"><input class"cart-quantity-input" type="number" value="${item.inCart}"></td>
                    <td><p>  ${(item.inCart) * (item.price / 100)} €</p></td>
			</tr>
            `;
        })

        productTotal.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Total Panier
            </h4>
            <h4 class="basketTotal">
                ${cartCost}€
            </h4>

        </div>`
    }
    else{
       let error = document.querySelector(".products");
       error.innerHTML = `<div class="error"> Votre Panier est Vide</div>` ;
    }
    
}   
displayCart();

//Retirer un element du panier
let cartItems = localStorage.getItem("productsInCart")
cartItems = JSON.parse(cartItems)
let removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (let i = 0; i < removeCartItemButtons.length; i++){
    let button = removeCartItemButtons[i]
    let removeLs = cartItems[i]
    button.addEventListener('click', function(event){
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
       localStorage.removeItem(removeLs)
    })
}

/*function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('products')[0]
    let cartRows = cartItemContainer.getElementsByClassName('listener')
    let total = 0
    for (let i =0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('€',''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
       
    }
    document.getElementsByClassName('basketTotal')[0]
}*/

//Ajouter une quantité




