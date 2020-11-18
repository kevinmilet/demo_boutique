// stockage de l'adresse du fichier json dans une constante
const productCatalog = 'assets/json/productCatalog.json';

// initialisation des variables utilisées dans les fonctions
let total = 0;
let average = 0;
let moreExpensivePrice = 0;
let lessExpensivePrice = 0;
let position = 0;
let product = 0;

// initialisation variables pour les tableaux
let products = [];
let priceArray = [];
let nameArray = [];

// initialisation de la variable qui incrémentera les ids
let newId = 0;

// initialisation des boutons
const btnTotal = document.querySelector('#btnTotal');
const btnAverage = document.querySelector('#btnAverage');
const btnMoreExpensive = document.querySelector('#btnMoreExpensive');
const btnLessExpensive = document.querySelector('#btnLessExpensive');

// initialisation des modales
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//   });

// on récupère le fichier json
fetch(productCatalog)
    .then(response => response.json())
    .then(response => {
        products = response;
        appendDom(products)
    });


// fonction de remplissage de la page avec le contenu
// dans les card
function appendDom(products) {
    // on boucle sur le tableau récupéré grace au fetch()
    products.forEach((element) => {

        // on récupère l'id la card
        // et on la stocke dans une variable
        let colCard = document.getElementById('colCard');

        // on clone la card
        let colCardClone = colCard.cloneNode(true);

        // on incrémente les ids des éléments html de la card
        // et on ajoute le contenu
        colCardClone.id = 'colCardClone' + newId;
        document.querySelector('.row').appendChild(colCardClone);

        colCardClone.querySelector('#cardImg').id = 'cardImg' + newId;
        colCardClone.querySelector('#cardImg' + newId).src = element.image + '?' + newId;

        colCardClone.querySelector('#cardTitle').id = 'cardTitle' + newId;
        colCardClone.querySelector('#cardTitle' + newId).innerHTML = element.name;

        colCardClone.querySelector('#cardPrice').id = 'cardPrice' + newId;
        colCardClone.querySelector('#cardPrice' + newId).innerHTML = element.price + ' €';

        colCardClone.querySelector('#cardContent').id = 'cardContent' + newId;
        colCardClone.querySelector('#cardContent' + newId).innerHTML = element.detail;

        // on incrémente l'id
        newId++
    });
};


// fonction qui retourne le total du prix des articles
btnTotal.onclick = function () {
    let total = 0;
    // on boucle sur le tableau récupéré grace au fetch()
    products.forEach((element) => {
        total += parseFloat(element.price);
    });

    document.querySelector('.modal-title').innerHTML = 'Total';
    document.querySelector('#modalContent').innerHTML = `Le total des produits est de: ${total} €`;
};


// fonction qui retourne la moyenne des prix
btnAverage.onclick = function () {
    let average = 0;
    // on boucle sur le tableau récupéré grace au fetch()
    products.forEach((element) => {
        average += parseFloat(element.price) / products.length;
    });

    document.querySelector('.modal-title').innerHTML = 'Moyenne';
    document.querySelector('#modalContent').innerHTML = `La moyenne du prix des produits est de: ${average.toFixed(2)} €`;

};


//fonction qui retourne le prix le plus élevé
btnMoreExpensive.onclick = function () {

    products = products.filter(element => (!isNaN(element.price) && element.price) ?? element.price);

    let priceArray = products.map(element => parseFloat(element.price));

    let position = priceArray.indexOf(Math.max(...priceArray));

    let moreExpensivePrice = Math.max(...priceArray);

    let product = products[position].name;

    document.querySelector('.modal-title').innerHTML = 'Produit le plus cher';
    document.querySelector('#modalContent').innerHTML = `Le prix le plus élevé est celui du produit ${product} au prix de ${moreExpensivePrice} €`;
};


//fonction qui retourne le prix le moins élevé
btnLessExpensive.onclick = function () {

    products = products.filter(element => (!isNaN(element.price) && element.price) ?? element.price);

    let priceArray = products.map(element => parseFloat(element.price));

    let position = priceArray.indexOf(Math.min(...priceArray));

    let lessExpensivePrice = Math.min(...priceArray);

    let product = products[position].name;

    document.querySelector('.modal-title').innerHTML = 'Produit le moins cher';
    document.querySelector('#modalContent').innerHTML = `Le prix le moins élevé est celui du produit ${product} au prix de ${lessExpensivePrice} €`;
};