

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems) /*Conversion en js*/
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    let cartNumbers = localStorage.getItem('cartNumbers');

    console.log(cartNumbers);
    
    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <i class="fas fa-times-circle"></i>
            <img src="${item.imageUrl}">
            <span class="ml-auto">${item.name} ${item.varnish[item.color]} </span>
            <div class="price">${item.price / 100}€</div>
            <div class="quantity">
            <i class="fas fa-minus"></i><span>${item.inCart}</span>
            <i class="fas fa-plus"></i>
            </div>
            <div class="total">
                ${(item.inCart) * (item.price / 100)} €
            </div>
            </div>`;
        })

        productContainer.innerHTML += `
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