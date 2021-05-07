const storage = JSON.parse(localStorage.getItem("produits")); // récupération du localStorage des produits du panier
console.log(storage);

const boxPanier = document.getElementById("boxPanier"); // récupération du bloc contenant le panier

resetHtml(boxPanier, storage); // Appel de la fonction pour générer l'HTML panier

// Création de la fonction pour charger l'HTML du panier en fonction du localStorage

function resetHtml(boxPanier, storage) {

    boxPanier.innerHTML = "";

    if(storage === null || storage === undefined || storage.length === 0 ) { 

        // Si le localStorage est vide alors cela affiche "Votre Panier est vide !"

        let empty = document.createElement("td");
        empty.classList.add("text-center");
        empty.setAttribute("colspan", "4")
        empty.textContent = "Votre panier est vide !"

        boxPanier.appendChild(empty);

    } else {
        
        // Sinon création des éléments du panier
    
        for (let i = 0; i < storage.length; i++) {


            let trBody = document.createElement("tr");
            trBody.classList.add("border-b-2", "border-gray-400")

            boxPanier.appendChild(trBody);

            let tdName = document.createElement("td");
            tdName.classList.add("mrem");

                let divName = document.createElement("div");
                divName.classList.add("flex", "items-center", "justify-center");

                tdName.appendChild(divName);

                let imgName = document.createElement("img");
                imgName.classList.add("m-2", "h-10", "sm:h-20", "lg:h-32", "w-10", "sm:w-20", "lg:w-32", "xs", "rounded-full", "imgHide", "object-cover");
                imgName.setAttribute("src", storage[i].imageUrl);
                imgName.setAttribute("alt", "Photo de la peluche " + storage[i].name);

                divName.appendChild(imgName);

                let pName = document.createElement("p");
                pName.textContent = storage[i].name;

                divName.appendChild(pName)
            
            let tdColor = document.createElement("td");
            tdColor.textContent = storage[i].color;

            let tdQuantité = document.createElement("td");
            tdQuantité.textContent = storage[i].quantity + " (" + storage[i].price + "€/u)";

            let tdPrice = document.createElement("td");
            tdPrice.classList.add("text-indigo-400", "priceT");
            tdPrice.setAttribute("value", storage[i].price * storage[i].quantity);
            tdPrice.textContent = storage[i].price * storage[i].quantity + "€";

            let tdButton = document.createElement("td");

                let delButton = document.createElement("button");
                delButton.classList.add("bg-red-600", "rounded-full", "w-full", "del", "sm:border-2", "sm:border-black");
                delButton.setAttribute("id", storage[i].id + storage[i].color.replace(" ", "_"));
                delButton.textContent = "-";

                tdButton.appendChild(delButton);

            trBody.appendChild(tdName);
            trBody.appendChild(tdColor);
            trBody.appendChild(tdQuantité);
            trBody.appendChild(tdPrice);
            trBody.appendChild(tdButton);

            // Récupération de l'id du button pour supprimer les éléments

            const delProduit = document.getElementById(storage[i].id + storage[i].color.replace(" ", "_")); 

            // Fonction pour supprimer l'élément du panier au click du button
        
            delProduit.addEventListener("click", function (e) {

                storage.splice(i, 1); // Suppression du tableau correspondant à l'élément ciblé dans le storage
                console.log(storage);

                const sStringify = JSON.stringify(storage);
                localStorage.setItem("produits", sStringify); // Sauvegarde de la nouvelle valeur du localStorage

                resetHtml(boxPanier, storage); // On appelle la fonction pour recharger l'HTML de la page pour afficher les modifications éffectuées

            });
        }
    
    // Création du pied du tableau du panier

    let trFooter = document.createElement("tr");
    trFooter.classList.add("border-t-2", "border-gray-400");

    boxPanier.appendChild(trFooter);

        let tdTotal = document.createElement("td");
        tdTotal.classList.add("font-bold", "p-2");
        tdTotal.setAttribute("colspan", "3");
        tdTotal.textContent = "Prix Total";

        let totalPrice = 0; // Prix total défini de base à 0

        for (let i = 0; i < storage.length; i++) {

            // On boucle sur chaque élément du panier et défini la nouvelle valeur du prix total à chaque fois en y ajoutant le prix de l'élement(quantité comprise) 
            totalPrice = totalPrice + (storage[i].price * storage[i].quantity);
        }

        console.log(totalPrice)

        let TotalPrice = document.createElement("td");
        TotalPrice.classList.add("font-bold", "text-indigo-400");
        TotalPrice.textContent = totalPrice + "€"; // On affiche le Prix total

        trFooter.appendChild(tdTotal);
        trFooter.appendChild(TotalPrice);
    }
}  
        
// Récupération de l'id du button pour vider le panier et création de sa fonction au click

const clearPanier = document.getElementById("clearPanier");

clearPanier.addEventListener("click", function (e) {
    let storage = localStorage.clear(); // Suppression total du contenu de localStorage
    console.log(storage);
    resetHtml(boxPanier, storage); // Appel de la fonction pour recharger l'HTML
});







