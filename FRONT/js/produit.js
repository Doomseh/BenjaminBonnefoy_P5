const url = new URL(window.location);
const url_params = new URLSearchParams(url);
const id = url.searchParams.get("id");

// fetch de l'api avec l'id de l'ours sélectionné sur la page précédente

fetch("http://localhost:3000/api/teddies/" + id).then(response => {
    if (response.ok) {
        return response.json();
    }
}).then(data => {
    console.log(data);

    const mainProduit = document.getElementById("mainProduit"); // récupération de la <div> contenant les détails du produit

    let blockProduit = createHtml("div", {
        "class": "mx-auto py-8 lg:py-16 px-8 max-w-7xl"
    }, mainProduit);

    let blockGrid = createHtml("div", {
        "class": "grid lg:grid-cols-2 gap-8"
    }, blockProduit);

    let blockImg = createHtml("div", {
        "class": "bg-red-200 p-4 sm:p-6 md:p-10 rounded-2xl shadow-md"
    }, blockGrid);

    let imgProduit = createHtml("img", {
        "class": "rounded-2xl",
        "src": data.imageUrl,
        "alt": "Photo de la peluche " + data.name
    }, blockImg);

    let blockDetails = createHtml("div", {
        "class": "grid gap-4 lg:gap-0 text-center lg:text-left text-xl"
    }, blockGrid);

    let nameProduit = createHtml("p", {
        "class": "self-center font-bold text-3xl"
    }, blockDetails);
    nameProduit.textContent = data.name;

    let descProduit = createHtml("p", {
        "class": "self-center"
    }, blockDetails);
    descProduit.textContent = data.description;

    let priceProduit = createHtml("p", {
        "class": "self-center text-2xl font-bold text-indigo-400 underline"
    }, blockDetails);
    priceProduit.textContent = data.price / 100 + "€";

    let blockSelect = createHtml("div", {
        "class": "self-center"
    }, blockDetails);

    let select = createHtml("select", {
        "class": "p-2 rounded-full shadow-md text-base border-2 border-black",
        "name": "color",
        "id": "colorProduit"
    }, blockSelect);

    let choice = createHtml("option", {
        "value": ""
    }, select);
    choice.textContent = "Selectionnez une couleur";

    // Boucle pour parcourir tout le tableau des couleurs
    for (let i = 0; i < data.colors.length; i++) {

        let color = createHtml("option", {
            "class": "font-bold",
            "value": data.colors[i]
        }, select);
        color.textContent = data.colors[i];

        // Création d'un switch pour assigner à chaque couleur leur couleur de fond respective
        switch (data.colors[i]) {
            case 'Tan':
                color.style.backgroundColor = "#d2b48c";
                break;
            case 'Chocolate':
                color.style.backgroundColor = "#d2691e";
                break;
            case 'Black':
                color.style.backgroundColor = "#000";
                color.style.color = "#FFF";
                break;
            case 'White':
                color.style.backgroundColor = "#FFF";
                break;
            case 'Pale brown':
                color.style.backgroundColor = "#C4A484";
                break;
            case 'Dark brown':
                color.style.backgroundColor = "#654321";
                break;
            case 'Brown':
                color.style.backgroundColor = "#a52a2a";
                break;
            case 'Blue':
                color.style.backgroundColor = "	#0000FF";
                color.style.color = "#FFF";
                break;
            case 'Pink':
                color.style.backgroundColor = "#FF69B4";
                break;
            case 'Beige':
                color.style.backgroundColor = "#f5f5dc";
                break;
        };
    };

    let blockQuantity = createHtml("div", {
        "class": "self-center"
    }, blockDetails);

    let labelQuantity = createHtml("label", {
        "class": "mr-4",
        "for": "quantity"
    }, blockQuantity);
    labelQuantity.textContent = "Quantité :";

    let quantity = createHtml("input", {
        "class": "border-2 border-black",
        "type": "number",
        "id": "quantity",
        "value": "1",
        "min": "1",
        "max": "100"
    }, blockQuantity);

    let blockButton = createHtml("div", {
        "class": "self-center"
    }, blockDetails);

    let button = createHtml("button", {
        "class": "border-black border-2 rounded-full px-8 bg-purple-600 text-white shadow-md",
        "id": "addCart"
    }, blockButton);
    button.textContent = "Ajouter au panier";


    // Création d'une class pour stocker le produit
    class Produit {
        constructor(id, name, imageUrl, price, description, quantity, color) {
            this.id = id;
            this.name = name;
            this.imageUrl = imageUrl;
            this.price = price;
            this.description = description;
            this.quantity = quantity;
            this.color = color;
        }
    };

    // Récupération du bouton "Ajouter au panier"
    const addCart = document.getElementById("addCart");

    // Fonction pour le click du bouton
    addCart.addEventListener("click", function (e) {

        // Création du produit
        const produit = new Produit(data._id, data.name, data.imageUrl, data.price / 100, data.description, document.getElementById('quantity').value, document.getElementById('colorProduit').value);
        
        if (select.value == "") {

            e.preventDefault();
            alert("Veuillez selectionner une couleur !") // Envoi une alerte si une couleur n'a pas été selectionné 

        } else {

            // Fonction pour afficher un pop-up de confirmation d'ajout au panier
            popupAdd(produit, mainProduit);
            
            // Condition pour savoir si un localStorage est présent ou non
            if (localStorage.getItem("produits") == null) {

                const pArray = [produit]; // Création d'un tableau avec les valeurs du produit
                const pStringify = JSON.stringify(pArray);
                localStorage.setItem("produits", pStringify); // Sauvegarde des données avec la clé "produits" de valeur pStringify

            } else {

                const produits = JSON.parse(localStorage.getItem("produits"));
                const filter = produits.filter(item => item.id === produit.id).filter(item => item.color === produit.color); // filtre pour vérifier l'id et la couleur

                if (filter.length > 0) {

                    filter[0].quantity = parseInt(filter[0].quantity) + parseInt(document.getElementById('quantity').value); // Ajoute uniquement des quantitées si l'élement est déja présent

                } else {

                    produits.push(produit); // Ajoute les nouvelles valeurs des produits non déja présente
                }
                
                const pStringify = JSON.stringify(produits);
                localStorage.setItem("produits", pStringify); // Sauvegarde des données avec la clé "produits" de valeur pStringify
            }

        }
    });
});