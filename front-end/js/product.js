//recuperation de l'id dans l'URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

main();

function main(){
    getFurniture();
}

//Requete produit spécifique

function getFurniture(){
    fetch(`http://localhost:3000/api/furniture/${id}`)
    .then((response)=> {return response.json();
    })
    .catch((err) => {console.log(err);
    let requestError = document.querySelector('.product-container');
    requestError.innerHTML = 'Oups'+ err})

    .then(function (apiResultsProduct){
        const product = apiResultsProduct;
       
        let productCardImg = document.querySelector("#img");
        productCardImg.src = product.imageUrl;

        let productCardTitle = document.querySelector(".card-title");
        productCardTitle.innerHTML = product.name;

        let productCardDescription = document.querySelector(".card-text");
        productCardDescription.innerHTML = product.description; 

        let colorPicker = document.querySelector("#button");
        
        for (let i = 0; i < product.varnish.length; i++) {
            let productCardColorPicker = document.createElement("div");
            colorPicker.appendChild(productCardColorPicker);
            productCardColorPicker.classList.add("dropdown-item");
            productCardColorPicker.classList.add("disabled");
            productCardColorPicker.innerHTML = product.varnish[i];
            
        }
        


    })


}


