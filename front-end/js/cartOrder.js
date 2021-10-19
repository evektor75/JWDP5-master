
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
            <tr class='listener' id="${item.color}${item.name}">
					<th scope="row" class="invisible disappear"><p>${item._id}</p></th>
					<td><i class="fas fa-trash-alt button"></i></td>
                    <td><img src="${item.imageUrl}"></td>
                    <td><p>${item.name}</p></td>
                    <td><p class="select">${item.varnish[item.color]}</p></td>
					<td class="price"><p>${item.price / 100}€</p></td>
                    <td class="quantity"><i class="fas fa-minus decrease"></i><span>${item.inCart}</span><i class="fas fa-plus increase"></i></td>
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
        manageQuantity();
        deleteButtons();
    }
    
    else{
       let error = document.querySelector(".products");
       error.innerHTML = `<div class="error"> Votre Panier est Vide</div>` ;
    }
    
}   

function manageQuantity(){
    let decreaseButtons = document.querySelectorAll('decrease')
    let increaseButtons = document.querySelectorAll('increase')
    let currentQuantity = 0
    let currentProduct= ''
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i = 0; i < increaseButtons.length ; i++){
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent
            console.log(currentQuantity)
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim()
            console.log(currentProduct)

        if(cartItems[currentProduct].inCart > 1){
            cartItems[currentProduct].inCart -= 1 
            onLoadCartNumbers(cartItems[currentProduct], "decrease")
            totalCost(cartItems[currentProduct], "decrease")
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))
            displayCart()
        }
        });
        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.button');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.parentElement.getAttribute('id');
            console.log(productName)
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( (cartItems[productName].price * cartItems[productName].inCart)/100));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}
onLoadCartNumbers();
displayCart();

