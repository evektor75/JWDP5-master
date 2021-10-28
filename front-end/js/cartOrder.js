
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
    let cartItems = localStorage.getItem("productsInCart")
    let cartNumbers = localStorage.getItem("cartNumbers");
    cartItems = JSON.parse(cartItems) /*Conversion en js*/
    let productContainer = document.querySelector(".products")
    let cart = localStorage.getItem("totalCost")
    cart = parseInt(cart)

    if(cartNumbers != 0) {
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
                    <td class="quantity">
                    <i class="fas fa-minus decrease"></i>
                    <span>${item.inCart}</span>
                    <i class="fas fa-plus increase"></i>
                    </td>
                    <td><p>  ${(item.inCart) * (item.price / 100)} €</p></td>
			</tr>
            `;
        })

       let basketTotal = document.querySelector('.basketTotal')
       basketTotal.innerHTML = `<span class="basket-price">${cart}</span>€ `
        deleteButtons();
        manageQuantity();
    }
    
    else{
       let error = document.querySelector(".products-container")
       console.log("error");
       error.innerHTML = `<div class="error"> 
                            Votre Panier est Vide <i class="far fa-sad-cry"></i>
                             </div>` ;
    }
    
}   

//rappel fonction cart number 
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);/*conversion en nombre*/

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers -1;
        console.log("action running")

    }else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }  
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product);

}
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

function totalCost(product, action ){
    let cart = localStorage.getItem("totalCost");
    
    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price /100);
    }
    else if(cart != null) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price / 100);
    }
    else{
        localStorage.setItem("totalCost",product.price / 100);
}
    }


//Gerer l'ajout et le retrait d'une quantité 

function manageQuantity(){
    let decreaseButtons = document.querySelectorAll('.decrease')
    let increaseButtons = document.querySelectorAll('.increase')
    let currentQuantity = 0
    let currentProduct= ''
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    for(let i = 0; i < increaseButtons.length ; i++){
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent
            console.log(currentQuantity)
            currentProduct = decreaseButtons[i].parentElement.parentElement.getAttribute('id')
            console.log(currentProduct)
        
        //Ajout d'une condition: lorsqu'il y a plus d'un produit spécifique dans le local storage
        if(cartItems[currentProduct].inCart > 1){
            cartItems[currentProduct].inCart -= 1 
            cartNumbers(cartItems[currentProduct], "decrease")
            totalCost(cartItems[currentProduct], "decrease")
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))
            displayCart()
        }
        });
        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.parentElement.getAttribute('id')
            console.log(currentProduct)

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}


//Gerer le bouton pour supprimer une ligne

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.button');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

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

//confirmation formulaire

        //Vérification que l'input contienne des chiffres
        let myInput = document.querySelector("#inputNumber");
        let myZip = document.querySelector("#inputZip");
        let myNumber = document.querySelector("#inputPhone");

        function checkNumber(inputEvent){
        inputEvent.addEventListener('input', function(e) {
            let value = e.target.value;
            let error =  e.target.parentElement.getElementsByClassName("inputNumber-text")[0];

            if (value.match(/^[0-9]+$/) != null ) {
                console.log("correct");
                inputEvent.classList.remove("invalid");
                error.innerHTML = '';
                
            } else {
            inputEvent.classList.add("invalid");
            error.innerHTML = `Veuillez saisir des chiffres`;
            }
        });
        }

        //vérification que l'input contienne des lettres
        let mySurname = document.querySelector("#lastName");
        let myName = document.querySelector("#firstName");
        let myCity = document.querySelector('#inputCity');
        let myCountry = document.querySelector('#inputState');

        function allLetter(inputtxt){
            inputtxt.addEventListener('input', function(e) {
                let value = e.target.value;
                let error= e.target.parentElement.getElementsByClassName("input-text")[0];

                if (value.match(/^[A-Za-z]+$/) != null) {
                    console.log("correct");
                    inputtxt.classList.remove("invalid");
                    error.innerHTML = ``;
                }
                else{
                    inputtxt.classList.add("invalid");
                    error.innerHTML = `Veuillez saisir des lettres`;
                }
            })}
   
  
  
checkNumber(myInput);
checkNumber(myZip);
checkNumber(myNumber);
allLetter(mySurname);
allLetter(myName);
allLetter(myCity);
allLetter(myCountry);

//Listener

let inputName = document.getElementById('firstName');
let inputLastName =  document.getElementById('lastName');
let inputZip = document.getElementById('inputZip');
let inputCity = document.getElementById('inputCity');
let inputEmail = document.getElementById('inputEmail4');
let inputAddress = document.getElementById('inputAddress');
let inputPhone = document.getElementById('inputPhone');
let error = document.querySelector('.error');
let lists = JSON.parse(localStorage.getItem("productsInCart"));

/*buttonSubmit.addEventListener('click', function(e){
    if(!inputName.value||
        !inputLastName.value|| 
        !inputZip.value||
        !inputCity.value||
        !inputEmail.value||
        !inputAddress.value||
        !inputPhone.value
        ){
            error.innerHTML = "Tous les champs ne sont pas remplis";
            e.preventDefault();
        }else if (isNaN(inputPhone.value)){
            e.preventDefault();
            error.innerText = "Votre numéro n'est pas valide";
        } else {
        
            let productsSelected =[];
         productsSelected.push(list);
        
        let form ={
            contact : {
                firstName : inputName.value,
                lastName :inputLastName.value,
                address : inputAddress.value,
                city : inputCity.value,
                email : inputEmail.value                                 
            },
            products : productsSelected,
        };


     let options ={
            
            method: "POST", 
            body: JSON.stringify(form),
            headers: {'Content-Type': 'application/json'}
        };
    
        let priceConfirmation = document.querySelector(".basket-price").innerText;

        
    
    fetch("http://localhost:3000/api/furniture/order", options)
    .then((response) => response.json())
    .then((data) => {
        //localStorage.clear();
        console.log(data);
        localStorage.setItem("orderId", data.orderId);
        //document.location.href = "formulaire.html";
        //window.open("./formulaire.html")
    })
    .catch ((err) => {
        alert("il y a eu une erreur:" + err);
    });
   
   
}
})
*/



let buttonSubmit = document.querySelector('#button');
buttonSubmit.addEventListener('click', function(e){
    let cartTotal = localStorage.getItem('totalCost');
    console.log(cartTotal);

    let contact = {
        firstName : inputName.value,
        lastName : inputLastName.value,
        address : inputAddress.value,
        city : inputCity.value,
        email : inputEmail.value 

    }
    console.log(contact);
    getId(product);
    function getId(product){
        let products =[];
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        console.log(cartItems);
        let productsId = cartItems[product]._id;
        products.push((productsId));
        console.log(products);
    
        let send = {
            contact,
            products
        }
        console.log(send);
    }
    
   

    let post = async function (data){
        try {
            let response = await fetch('http://localhost:3000/api/furniture/order',{
                method: 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type':'application/json'
                }
            });
            if(response.ok){
                let data = await response.json();
                console.log(data.orderId);
                localStorage.setItem("orderId", data.orderId);
                window.location = "formulaire.html";
            }
            else {
                e.preventDefault();
                console.error(`ERROR : ` + response.status);
                alert('ERROR :'+ response.status);
            }
        } catch (error) {
            alert("ERROR : " + error)
        }
    };
    post(send);
})






         


onLoadCartNumbers();
displayCart();
