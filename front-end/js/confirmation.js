

//confirmation formulaire

let myInput = document.querySelector("#inputNumber");
let myZip = document.querySelector("#inputZip");

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
allLetter(mySurname);
allLetter(myName);
allLetter(myCity);
allLetter(myCountry);