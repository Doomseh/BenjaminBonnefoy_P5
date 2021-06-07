/**
 * createHtml - créé une div et ses attributs et l'ajoute à un parent
 * @param {string} tag le tag html à créé
 * @param {object} attributes un objet représentant les proprétés html à ajouter, par exemple :  {"class": "py-16"}
 * @param {HTMLElement} parent l'élément html auquel ajouter le nouvel élément
 * @returns Le nouvel élément
 */
function createHtml(tag, attributes, parent) {

    let newElement = document.createElement(tag);
    Object.entries(attributes).forEach((value) => {
        newElement.setAttribute(value[0], value[1]);
    });

    parent.appendChild(newElement);

    return newElement;
};

// Fonction de vérifications des champs input grâce aux regex

function valid(input) {

    let inputName = input.attributes.name.value
    let regex; // On déclare une première fois la valeur de regex

    switch (inputName) {
        case "lastName":
        case "firstName":
        case "userCity":
            regex = /^[A-Za-zÀ-ÿ -']+$/; // On défini cette regex pour les 3 cases précédente
            break;
        case "userEmail":
            regex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; // On défini la regex pour l'Email
            break;
        case "userAddress":
            regex = /^[0-9A-Za-zÀ-ÿ -]+$/; // On défini la regex pour l'adresse 
            break;
        case "userCP":
            regex = /^[0-9]{5}$/; // On défini la regex pour le Code Postal
            break;
    };
    let testRegex = regex.test(input.value); // On test la regex pour qu'elle renvoie true ou false
    updateInputStyle(testRegex, input); // Appelle de la fonction pour changer le style des bordure en fonction de true ou de false
    return testRegex;
};

// Fonction pour changer le style des bordure de l'input si true/false

function updateInputStyle(valid, input) {
    if (valid === true) {
        input.classList.remove("border-black", "border-red-500");
        input.classList.add("border-green-400", "border-4");
    } else {
        input.classList.remove("border-black", "border-green-400");
        input.classList.add("border-red-500", "border-4");
    };
};

// Fonction pour supprimer l'élément du panier au click du button

function deleteItem(storage, i, boxPanier) {

    storage.splice(i, 1); // Suppression du tableau correspondant à l'élément ciblé dans le storage

    const sStringify = JSON.stringify(storage);
    localStorage.setItem("produits", sStringify); // Sauvegarde de la nouvelle valeur du localStorage

    resetHtml(boxPanier, storage); // On appelle la fonction pour recharger l'HTML de la page pour afficher les modifications éffectuées

};

// Fonction pour vider le panier complétement

function clearStorage(storage, boxPanier) {

    storage = localStorage.clear(); // Suppression total du contenu de localStorage

    resetHtml(boxPanier, storage); // Appel de la fonction pour recharger l'HTML

};

// Fonction pour sauvegarder la commande dans le localStorage et renvoyer sur la page de confirmation de commande

function saveOrder(order) {

    // On enregistre toutes les informations dans un nouveau localStorage
    localStorage.setItem("orderID", order.orderId);
    localStorage.setItem("orderPrice", order["contact"]["prix_commande"]);
    localStorage.setItem("orderName", order["contact"]["firstName"] + " " + order["contact"]["lastName"]);

    // Suppression du localStorage des produits du panier
    localStorage.removeItem("produits");

    // Puis on renvoie sur la page de confirmation de commande
    window.location.href = "../FRONT/commande.html";
};

// Fonction pour afficher un pop-up de confirmation d'ajout au panier

function popupAdd(produit, mainProduit) {

    let popup = createHtml("div", {
        "class": "float-right max-w-xs grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 bg-purple-400 rounded-2xl w-auto absolute top-0 right-0 m-2 slideAnim"
    }, mainProduit);

    let popupImg = createHtml("img", {
        "class": "w-auto rounded-2xl",
        "src": produit.imageUrl,
        "alt": produit.description
    }, popup);

    let popupText = createHtml("div", {
        "class": "font-bold text-xl self-center grid grid-rows-2"
    }, popup);

    let popupColor = createHtml("p", {}, popupText);
    popupColor.textContent = produit.quantity + " " + produit.color;

    let popupTextAdd = createHtml("p", {}, popupText);
    popupTextAdd.textContent = "Ajouté !";
};