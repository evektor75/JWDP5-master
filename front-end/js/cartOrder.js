
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
            <tr>
					<th scope="row" class="invisible disappear"><p>${item._id}</p></th>
					<td> <i class="fas fa-times-circle delete"></i></td>
                    <td><img src="${item.imageUrl}"></td>
                    <td><p>${item.name}</p></td>
                    <td><p>${item.varnish[item.color]}</p></td>
					<td><p>${item.price / 100}€</p></td>
                    <td><i class="fas fa-minus"></i><span>${item.inCart}</span>
                    <i class="fas fa-plus"></i></td>
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
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
Object.getOwnPropertyNames(cartItems);
console.log(Object.getOwnPropertyNames(cartItems));

let item = document.querySelector(".delete");
item.addEventListener('click', function() {
        console.log(cartItems);
})


//Ajouter une quantité




