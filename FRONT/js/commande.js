// Récupération des informations dans le localStorage 

const orderName = localStorage.getItem("orderName"); // Nom + Prénom

const orderID = localStorage.getItem("orderID"); // ID de commande

const orderPrice = localStorage.getItem("orderPrice"); // Prix total

// Récupération des éléments html

const purchaseName = document.getElementById("purchaseName");
const purchaseID = document.getElementById("purchaseID");
const purchasePrice = document.getElementById("purchasePrice");

if (orderName && orderID && orderPrice) {

    // Ajout des informations dans les textes html
    
    purchaseName.textContent = "Bonjour " + orderName + ", nous vous remerçions pour votre achat.";

    purchaseID.textContent = "L'ID de votre commande est : " + orderID;

    purchasePrice.textContent = "Le montant total de votre commande est de " + orderPrice + ".";
}