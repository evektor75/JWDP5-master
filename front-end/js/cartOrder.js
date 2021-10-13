
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems) /*Conversion en js*/
    let productContainer = document.querySelector(".products");

    console.log(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML = `
            <div class="product">
            <i class="fas fa-times-circle"></i>
            <img src="./images/${item.color}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price / 100}</div>
            <div class="quantity">
            <i class="fas fa-minus"><span>${item.inCart}</span></i>
            <i class="fas fa-plus"></i>
            </div>
            <div class="total>
                ${item.inCart /100 * item.price / 100} €
            </div>`;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Total Panier
            </h4>
            <h4 class="basketTotal">
                €${cartCost}
            </h4>

        </div>`
    }
    
}   

displayCart();