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

    let blockProduit = document.createElement("div");
    blockProduit.classList.add("mx-auto", "py-8", "lg:py-16", "px-8", "max-w-7xl");

    mainProduit.appendChild(blockProduit);

    let blockGrid = document.createElement("div");
    blockGrid.classList.add("grid", "lg:grid-cols-2", "gap-8");

    blockProduit.appendChild(blockGrid);

    let blockImg = document.createElement("div");
    blockImg.classList.add("bg-red-200", "p-4", "sm:p-6", "md:p-10", "rounded-2xl", "shadow-md");

    blockGrid.appendChild(blockImg);

    let imgProduit = document.createElement("img");
    imgProduit.classList.add("rounded-2xl");
    imgProduit.setAttribute("src", data.imageUrl);
    imgProduit.setAttribute("alt", "Photo de la peluche de " + data.name);

    blockImg.appendChild(imgProduit);

    let blockDetails = document.createElement("div");
    blockDetails.classList.add("grid", "gap-4", "lg:gap-0", "text-center", "lg:text-left", "text-xl");

    blockGrid.appendChild(blockDetails);

    let nameProduit = document.createElement("p");
    nameProduit.classList.add("self-center", "font-bold", "text-3xl");
    nameProduit.textContent = data.name;

    blockDetails.appendChild(nameProduit)

    let descProduit = document.createElement("p");
    descProduit.classList.add("self-center");
    descProduit.textContent = data.description;

    blockDetails.appendChild(descProduit);

    let priceProduit = document.createElement("p");
    priceProduit.classList.add("self-center", "text-2xl", "font-bold", "text-indigo-400", "underline");
    priceProduit.textContent = data.price/100 + "€";

    blockDetails.appendChild(priceProduit);

    let blockSelect = document.createElement("div");
    blockSelect.classList.add("self-center");

    blockDetails.appendChild(blockSelect);

    let select = document.createElement("select");
    select.classList.add("p-2", "rounded-full", "shadow-md", "text-base");
    select.setAttribute("name", "color");

    blockSelect.appendChild(select);

    let choice = document.createElement("option");
    choice.setAttribute("value", "");
    choice.textContent = "Selectionnez une couleur";

    select.appendChild(choice);

        for(let i = 0; i < data.colors.length; i++) {

            let color = document.createElement("option");
            color.classList.add("font-bold")
            color.setAttribute("value", data.colors[i]);
            color.textContent = data.colors[i];

            switch(data.colors[i]){
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

            select.appendChild(color);
        }
    
    let blockQuantity = document.createElement("div");
    blockQuantity.classList.add("self-center");

    blockDetails.appendChild(blockQuantity);

    let labelQuantity = document.createElement("label");
    labelQuantity.classList.add("mr-4");
    labelQuantity.setAttribute("for", "quantity");
    labelQuantity.textContent = "Quantité";

    blockQuantity.appendChild(labelQuantity);

    let quantity = document.createElement("input");
    quantity.classList.add("border-2", "border-black");
    quantity.setAttribute("type", "number");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("min", "1");
    quantity.setAttribute("max", "100");

    blockQuantity.appendChild(quantity);

    let blockButton = document.createElement("div");
    blockButton.classList.add("self-center");

    blockDetails.appendChild(blockButton);

    let button = document.createElement("button");
    button.classList.add("border-black", "border-2", "rounded-full", "px-8", "bg-purple-600", "text-white", "shadow-md");
    button.textContent = "Ajouter au panier";

    blockButton.appendChild(button);
});