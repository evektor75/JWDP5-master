main();

function main() {
  getFurnitures();
}

//Requete général API
function getFurnitures() {
  fetch("http://localhost:3000/api/furniture")
    .then(function (response) {
      return response.json();
    })
    .catch((err) => {
      let productsContainer = document.querySelector(".furnitures-container");
      productsContainer.innerHTML =
        "<div class='issue text-center fw-bold '> Impossible de trouver vos meubles préférés :( <br> Veuillez essayer ultérieurement.</div>";
    })

    .then(function (apiResults) {
      const articles = apiResults;
      console.log(articles);
      for (let article in articles) {
        let productCard = document.createElement("div");
        document.querySelector(".furnitures").appendChild(productCard);
        productCard.classList.add("furniture");
        productCard.classList.add("card");
        productCard.classList.add("col-12");
        productCard.classList.add("col-sm-6");
        productCard.classList.add("my-auto");
        productCard.classList.add("mx-2");



        let productImg = document.createElement("img");
        productCard.appendChild(productImg);
        productImg.src = apiResults[article].imageUrl;
       
        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = `product.html?id=${apiResults[article]._id}`;
        productLink.classList.add("stretched-link");
        productLink.classList.add("text-decoration-none");
        
        let productInfosDiv = document.createElement("div");
        productLink.appendChild(productInfosDiv);
        productInfosDiv.classList.add("furniture__infos");
        productInfosDiv.classList.add("card-body");

        let productInfoTitle = document.createElement("div");
        productInfosDiv.appendChild(productInfoTitle);
        productInfoTitle.classList.add("furniture__infos__title");
        productInfoTitle.classList.add("card-title");
        productInfoTitle.innerHTML = apiResults[article].name;

        let productInfoDescription = document.createElement("div");
        productInfosDiv.appendChild(productInfoDescription);
        productInfoDescription.classList.add("furniture__infos__description");
        productInfoDescription.classList.add("card-text");
        productInfoDescription.innerHTML = apiResults[article].description;

        let productInfoPrice = document.createElement("div");
        productInfosDiv.appendChild(productInfoPrice);
        productInfoPrice.classList.add("furniture__infos__price");

        let productInfoButton = document.createElement("a");
        productInfosDiv.appendChild(productInfoButton);
        productInfoButton.classList.add("btn");
        productInfoButton.classList.add("furniture__infos__button");
        productInfoButton.innerHTML = "Ajouter au panier";
        productLink.href = '#';



        /* conversion prix en euros*/
        apiResults[article].price = apiResults[article].price / 100;
        productInfoPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(apiResults[article].price);
      }
    });
}