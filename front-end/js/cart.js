//ADD TO CART
let carts = document.querySelector('.add-cart');

let products = [
    {
        name:'Cross table',
        tag:'crossTable',
        price:599,
        inCart:0
    },
    {
        name:'coffee Table',
        tag:'coffeetable',
        price:899,
        inCart:0
    },
    {
        name:'Dining Table',
        tag:'diningTable',
        price:1099,
        inCart:0
    },
    {
        name:'Bench',
        tag:'bench',
        price:399,
        inCart:0
    },
    {
        name:'Vintage Chair',
        tag:'vintageChair',
        price:799,
        incart:0
    },
]
/*{
  "varnish": [
    "Dark Oak",
    "Teak",
    "Mahogany"
  ],
  "_id": "5beaae361c9d440000a57d99",
  "name": "Dining Table (extendable)",
  "price": 109900,
  "imageUrl": "http://localhost:3000/images/oak_3.jpg",
  "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
*/

const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("id");
const newUrl = `http://localhost:3000/api/furniture/${newId}`;


    fetch(newUrl)
    .then(response=> response.json().then( function (results){
        const articleResults = results;
        console.log(articleResults);
    }) 
      
      )
      .catch((err) => {
        let productsContainer = document.querySelector(".products-container");
        productsContainer.innerHTML =
          "<div class='issue text-center fw-bold '> Impossible de trouver votre meubles préféré :( <br> Veuillez essayer ultérieurement.</div>";
      })

  carts.addEventListener('click',function() {
        cartNumbers(products);
        totalCost(products);   
    });


//Mise en place localstorage
    /*Fonction permettant la mise en cache*/
    function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
    }
    
    /*----*/

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);/*conversion en nombre*/
    if( productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers +1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null)    {
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//Fonction calcul coût total
function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");
    

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
}
    }




function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems) /*Conversion en js*/
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <i class="fas fa-times-circle"></i>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <i class="fas fa-minus"><span>${item.inCart}</span></i>
            <i class="fas fa-plus"></i>
            </div>
            <div class="total>
                ${item.inCart * item.price} €
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

onLoadCartNumbers();
displayCart();

/*const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("id");
const newUrl = `http://localhost:3000/api/furniture/${newId}`;


    fetch(newUrl)
    .then(response=> response.json().then( function (results){
        const articleResults =results;
    }) 
      
      )
      .catch((err) => {
        let productsContainer = document.querySelector(".products-container");
        productsContainer.innerHTML =
          "<div class='issue text-center fw-bold '> Impossible de trouver votre meubles préféré :( <br> Veuillez essayer ultérieurement.</div>";
      })*/