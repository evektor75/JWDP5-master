

//confirmation formulaire

let myInput = document.querySelector("#inputNumber");
let myZip = document.querySelector("#inputZip");

function checkNumber(inputEvent){

inputEvent.addEventListener('input', function(e) {
    let value = e.target.value;
    if (value.match(/^[0-9]+$/) != null ) {
        inputEvent.classList.add("correct");

    } else {
    inputEvent.classList.add("invalid");
       let invalid =document.querySelector(".inputNumber-text");
       invalid.innerHTML = `Veuillez saisir des chiffres`;
    }
});
}

checkNumber(myInput);
checkNumber(myZip);