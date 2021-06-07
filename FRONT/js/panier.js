const storage = JSON.parse(localStorage.getItem("produits")); // récupération du localStorage des produits du panier

const boxPanier = document.getElementById("boxPanier"); // récupération du bloc contenant le panier

resetHtml(boxPanier, storage); // Appel de la fonction pour générer l'HTML panier

// Création de la fonction pour charger l'HTML du panier en fonction du localStorage

function resetHtml(boxPanier, storage) {

    boxPanier.innerHTML = "";

    if (storage === null || storage === undefined || storage.length === 0) {
        // Si le localStorage est vide alors cela affiche "Votre Panier est vide !"
        let empty = createHtml("td", {
            "class": "text-center",
            "colspan": "4"
        }, boxPanier);
        empty.textContent = "Votre panier est vide !";

    } else {
        // Sinon création des éléments du panier
        for (let i = 0; i < storage.length; i++) {

            let trBody = createHtml("tr", {
                "class": "border-b-2 border-gray-400"
            }, boxPanier);

            let tdName = createHtml("td", {
                "class": "mrem"
            }, trBody);

            let divName = createHtml("div", {
                "class": "flex items-center justify-center"
            }, tdName);

            let imgName = createHtml("img", {
                "class": "m-2 h-10 sm:h-20 lg:h-32 w-10 sm:w-20 lg:w-32 xs rounded-full imgHide object-cover",
                "src": storage[i].imageUrl,
                "alt": "Photo de la peluche " + storage[i].name
            }, divName);

            let pName = createHtml("p", {
                "class": "font-bold"
            }, divName);
            pName.textContent = storage[i].name;

            let tdColor = createHtml("td", {}, trBody);
            tdColor.textContent = storage[i].color;

            let tdQuantité = createHtml("td", {}, trBody);
            tdQuantité.textContent = storage[i].quantity + " (" + storage[i].price + "€/u)";

            let tdPrice = createHtml("td", {
                "class": "text-indigo-400 priceT",
                "value": storage[i].price * storage[i].quantity
            }, trBody);
            tdPrice.textContent = storage[i].price * storage[i].quantity + "€";

            let tdButton = createHtml("td", {}, trBody);

            let delButton = createHtml("button", {
                "class": "bg-red-600 rounded-full w-full del sm:border-2 sm:border-black",
                "id": storage[i].id + storage[i].color.replace(" ", "_")
            }, tdButton);
            delButton.textContent = "-";

            // Récupération de l'id du button pour supprimer les éléments
            const delProduit = document.getElementById(storage[i].id + storage[i].color.replace(" ", "_"));

            delProduit.addEventListener("click", function (e) {
                deleteItem(storage, i, boxPanier); // Fonction pour supprimer l'élément du panier au click du button
            });
        };

        // Création du pied du tableau du panier
        let trFooter = createHtml("tr", {
            "class": "border-t-2 border-gray-400"
        }, boxPanier);

        let tdTotal = createHtml("td", {
            "class": "font-bold p-2",
            "colspan": "3"
        }, trFooter);
        tdTotal.textContent = "Prix Total";

        let totalPrice = 0; // Prix total défini de base à 0

        for (let i = 0; i < storage.length; i++) {
            // On boucle sur chaque élément du panier et défini la nouvelle valeur du prix total à chaque fois en y ajoutant le prix de l'élement(quantité comprise) 
            totalPrice = totalPrice + (storage[i].price * storage[i].quantity);
        };

        let total = createHtml("td", {
            "class": "font-bold text-indigo-400",
            "id": "total"
        }, trFooter);
        total.textContent = totalPrice + "€"; // On affiche le Prix total
    };
};

// Récupération de l'id du button pour vider le panier et création de sa fonction au click
const clearPanier = document.getElementById("clearPanier");

clearPanier.addEventListener("click", function (e) {
    clearStorage(storage, boxPanier); // Fonction pour vider le panier complétement
});

// FORMULAIRE DE COMMANDE

let form = document.getElementById("checkForm");

// Récupération de chaque champs <input>
let lastname = form.lastName;
let firstname = form.firstName;
let email = form.userEmail;
let address = form.userAddress;
let city = form.userCity;
let CP = form.userCP;

// Vérification de chaque données saisie dans chacun des inputs en appellant une fonction pour renvoyer true/false
lastname.addEventListener("change", function () {
    valid(this);
});

firstname.addEventListener("change", function () {
    valid(this);
});

email.addEventListener("change", function () {
    valid(this);
});

address.addEventListener("change", function () {
    valid(this);
});

city.addEventListener("change", function () {
    valid(this);
});

CP.addEventListener("change", function () {
    valid(this);
});

// On écoute l'évènement du bouton Envoyer
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (storage === null || storage === undefined || storage.length === 0) {

        alert("Votre panier est vide !");

    } else {

        // Si toutes les vérifications d'input sont true :
        if (valid(lastname) && valid(firstname) && valid(email) && valid(address) && valid(city) && valid(CP)) {

            // Récupération de la valeur du prix total du panier
            let price = document.getElementById("total").innerText;

            // Création de l'objet contact contenant toutes les informations
            const contact = {
                "firstName": firstname.value,
                "lastName": lastname.value,
                "address": address.value,
                "city": city.value,
                "email": email.value,
                "prix_commande": price,
            };

            // Création du tableau products
            const products = new Array();

            // Envoie de chaque id, présent dans le storage(localStorage), dans le tableau products
            for (let i = 0; i < storage.length; i++) {

                products.push(storage[i].id);

            };

            // Requête POST avec fetch pour envoyer les données au serveur
            const promiseOrder = fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    contact,
                    products
                })

            }).then(async (response) => {

                try {

                    const order = await response.json(); // Récupération de la réponse pour afficher l'ID de commande

                    saveOrder(order); // Fonction pour sauvegarder la commande dans le localStorage et renvoyer sur la page de confirmation de commande

                } catch (e) {

                    console.log(e);
                }
            });

            // Si une ou plusieurs vérifications input est false alors envoie une alerte
        } else {

            alert("Tout les champs ne sont pas correct");

        }
    }
});