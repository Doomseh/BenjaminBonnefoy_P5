const url = new URL(window.location);
const url_params = new URLSearchParams(url);
const id = url.searchParams.get("id");
console.log(url);

fetch("http://localhost:3000/api/teddies/" + id).then(response => {
    if (response.ok) {
        return response.json();
    }
}).then(data => {
    console.log(data);

    const mainProduit = document.getElementById("mainProduit");

    /* let blockProduit = document.createElement("div");
    blockProduit.classList.add("mx-auto", "py-8", "lg:py-16", "px-8", "max-w-7xl");
    mainProduit.appendChild(blockProduit); */
    let blockProduit = createHtml("div", {"class": "mx-auto py-8 lg:py-16 px-8 max-w-7xl"}, mainProduit);

    /* let blockGrid = document.createElement("div");
    blockGrid.classList.add("grid", "lg:grid-cols-2", "gap-8");
    blockProduit.appendChild(blockGrid); */
    let blockGrid = createHtml("div", {"class": "grid lg:grid-cols-2 gap-8"}, blockProduit);

    /* let blockImg = document.createElement("div");
    blockImg.classList.add("bg-red-200", "p-4", "sm:p-6", "md:p-10", "rounded-2xl", "shadow-md");
    blockGrid.appendChild(blockImg); */
    let blockImg = createHtml("div", {"class": "bg-red-200 p-4 sm:p-6 md:p-10 rounded-2xl shadow-md"}, blockGrid);

    /* let imgProduit = document.createElement("img");
    imgProduit.classList.add("rounded-2xl");
    imgProduit.setAttribute("src", data.imageUrl);
    imgProduit.setAttribute("alt", "Photo de la peluche " + data.name);
    blockImg.appendChild(imgProduit); */
    let imgProduit = createHtml("img", {"class": "rounded-2xl", "src": data.imageUrl, "alt": "Photo de la peluche " + data.name}, blockImg);

    /* let blockDetails = document.createElement("div");
    blockDetails.classList.add("grid", "gap-4", "lg:gap-0", "text-center", "lg:text-left", "text-xl");
    blockGrid.appendChild(blockDetails); */
    let blockDetails = createHtml("div", {"class": "grid gap-4 lg:gap-0 text-center lg:text-left text-xl"}, blockGrid);

    /* let nameProduit = document.createElement("p");
    nameProduit.classList.add("self-center", "font-bold", "text-3xl");
    blockDetails.appendChild(nameProduit) */
    let nameProduit = createHtml("p", {"class": "self-center font-bold text-3xl"}, blockDetails);
    nameProduit.textContent = data.name;

    /* let descProduit = document.createElement("p");
    descProduit.classList.add("self-center");
    blockDetails.appendChild(descProduit); */
    let descProduit = createHtml("p", {"class": "self-center"}, blockDetails);
    descProduit.textContent = data.description;

    /* let priceProduit = document.createElement("p");
    priceProduit.classList.add("self-center", "text-2xl", "font-bold", "text-indigo-400", "underline");
    blockDetails.appendChild(priceProduit); */
    let priceProduit = createHtml("p", {"class": "self-center text-2xl font-bold text-indigo-400 underline"}, blockDetails);
    priceProduit.textContent = data.price / 100 + "€";

    /* let blockSelect = document.createElement("div");
    blockSelect.classList.add("self-center");
    blockDetails.appendChild(blockSelect); */
    let blockSelect = createHtml("div", {"class": "self-center"}, blockDetails);

    /* let select = document.createElement("select");
    select.classList.add("p-2", "rounded-full", "shadow-md", "text-base", "border-2", "border-black");
    select.setAttribute("name", "color")
    select.setAttribute("id", "colorProduit");
    blockSelect.appendChild(select); */
    let select = createHtml("select", {"class": "p-2 rounded-full shadow-md text-base border-2 border-black", "name": "color", "id": "colorProduit"}, blockSelect);

    /* let choice = document.createElement("option");
    choice.setAttribute("value", "");
    select.appendChild(choice); */
    let choice = createHtml("option", {"value": ""}, select);
    choice.textContent = "Selectionnez une couleur";

    for (let i = 0; i < data.colors.length; i++) {

        /* let color = document.createElement("option");
        color.classList.add("font-bold")
        select.appendChild(color); */
        let color = createHtml("option", {"class": "font-bold"}, select);
        color.setAttribute("value", data.colors[i]);
        color.textContent = data.colors[i];

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
        }

        
    }

    /* let blockQuantity = document.createElement("div");
    blockQuantity.classList.add("self-center");
    blockDetails.appendChild(blockQuantity); */
    let blockQuantity = createHtml("div", {"class": "self-center"}, blockDetails);

    /* let labelQuantity = document.createElement("label");
    labelQuantity.classList.add("mr-4");
    labelQuantity.setAttribute("for", "quantity");
    blockQuantity.appendChild(labelQuantity); */
    let labelQuantity = createHtml("label", {"class": "mr-4", "for": "quantity"}, blockQuantity);
    labelQuantity.textContent = "Quantité :";


    /* let quantity = document.createElement("input");
    quantity.classList.add("border-2", "border-black");
    quantity.setAttribute("type", "number");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("value", "1");
    quantity.setAttribute("min", "1");
    quantity.setAttribute("max", "100");
    blockQuantity.appendChild(quantity); */
    let quantity = createHtml("input", {"class": "border-2 border-black", "type": "number", "id": "quantity", "value": "1", "min": "1", "max": "100"}, blockQuantity);

    /* let blockButton = document.createElement("div");
    blockButton.classList.add("self-center");
    blockDetails.appendChild(blockButton); */
    let blockButton = createHtml("div", {"class": "self-center"}, blockDetails);

    /* let button = document.createElement("button");
    button.classList.add("border-black", "border-2", "rounded-full", "px-8", "bg-purple-600", "text-white", "shadow-md");
    button.setAttribute("id", "addCart");
    blockButton.appendChild(button); */
    let button = createHtml("button", {"class": "border-black border-2 rounded-full px-8 bg-purple-600 text-white shadow-md", "id": "addCart"}, blockButton);
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

        // Condition pour savoir si un localStorage est présent ou non
        if (localStorage.getItem("produits") == null) {
            const pArray = [produit]; // Création d'un tableau avec les valeurs du produit
            console.log(pArray);
            const pStringify = JSON.stringify(pArray);
            console.log(pStringify);
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
            console.log(pStringify);
        }

    });
});