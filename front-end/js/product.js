//Test chargement du script product.js
//console.log("running");



//recuperation de l'id dans l'URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);


getFurniture();


//Requete produit spécifique

function getFurniture(){
    fetch(`http://localhost:3000/api/furniture/${id}`)
    .then((response)=> {
        return response.json();
    })
    .catch((err) => {console.log(err);
    let requestError = document.querySelector('.product-container');
    requestError.innerHTML = 'Oups'+ err})

    .then(function (apiResultsProduct){
        const product = apiResultsProduct;

        let productCard = document.querySelector('.card-body');
       
        let productImg = document.createElement("img");
        let productsCard = document.querySelector('.card-body');
        let parentDiv = productsCard.parentNode;
        parentDiv.insertBefore(productImg, productsCard);
        productImg.classList.add('card-img-top');
        productImg.src = product.imageUrl;
        

        let productCardTitle = document.querySelector(".card-title");
        productCardTitle.innerHTML = product.name;

        let productCardDescription = document.querySelector(".card-text");
        productCardDescription.innerHTML = product.description; 

        let productcardPrice = document.createElement('div');
        productCard.appendChild(productcardPrice);
        productcardPrice.classList.add('card-price');
        productcardPrice.innerHTML = product.price / 100 + " €";


        
        let colorPicker = document.querySelector(".dropdown");
        let productCardButtonLabel = document.createElement("label");
        let productCardButton = document.createElement("select");
        productCardButton.setAttribute('id', 'selectColor')
        colorPicker.appendChild(productCardButtonLabel);
        colorPicker.appendChild(productCardButton);
        productCardButtonLabel.innerHTML =" Choisissez votre couleur préférée :";

        for (let i = 0; i < product.varnish.length; i++) {
            let productCardColorPicker = document.createElement("option");
            productCardColorPicker.value = i;
            productCardColorPicker.text = product.varnish[i];
            productCardButton.appendChild(productCardColorPicker); 
        }
        


    })


}
//ADD TO CART
let carts = document.querySelector('.add-cart');



//Détermination de la couleur choisie par l'utilisateur
function getColor(){
    let e = document.getElementById("selectColor");
    let color = e.value;
    return color;
}


const newUrl = `http://localhost:3000/api/furniture/${id}`;


    fetch(newUrl)
    .then(response=> response.json()
    .then( 
    function (results){
    const articleResults = results;
   
    
    carts.addEventListener('click',function() {
    articleResults['color'] = getColor();
    articleResults['inCart']= 0 ;
    cartNumbers(articleResults);
    totalCost(articleResults);
    
    
});
    }) 
      
      )
      .catch((err) => {
        let productsContainer = document.querySelector(".products-container");
        productsContainer.innerHTML =
          "<div class='issue text-center fw-bold '> Impossible de trouver votre meubles préféré :( <br> Veuillez essayer ultérieurement.</div>";
      })



//Ajout Panier

    function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
    }

    //Ajout du nombre de produits

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

    //Ajout des noms des produits
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.color + product.name] == undefined){
            cartItems= {
                ...cartItems,
                [product.color + product.name]: product
            }

        }
        cartItems[product.color + product.name].inCart += 1;

    }
    else{
        product.inCart= 1;
        cartItems = {
            [product.color + product.name]: product
       }

    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

    //Fonction calcul coût total
function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");
    

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price / 100);
    }
    else{
        localStorage.setItem("totalCost",product.price / 100);
}
    }



onLoadCartNumbers();
