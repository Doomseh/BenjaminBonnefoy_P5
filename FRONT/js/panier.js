const storage = JSON.parse(localStorage.getItem("produits"));
console.log(storage);

const boxPanier = document.getElementById("boxPanier");

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
        tdPrice.textContent = storage[i].price * storage[i].quantity;

        let tdButton = document.createElement("td");

            let delButton = document.createElement("button");
            delButton.classList.add("bg-red-600", "rounded-full", "w-full", "del", "sm:border-2", "sm:border-black");
            delButton.textContent = "-";

            tdButton.appendChild(delButton);

        trBody.appendChild(tdName);
        trBody.appendChild(tdColor);
        trBody.appendChild(tdQuantité);
        trBody.appendChild(tdPrice);
        trBody.appendChild(tdButton);
}

let trFooter = document.createElement("tr");
trFooter.classList.add("border-t-2", "border-gray-400");

boxPanier.appendChild(trFooter);

    let tdTotal = document.createElement("td");
    tdTotal.classList.add("font-bold", "p-2");
    tdTotal.setAttribute("colspan", "3");
    tdTotal.textContent = "Prix Total";

    let totalPrice = 0;

    for (let i = 0; i < storage.length; i++) {
        totalPrice = totalPrice + (storage[i].price * storage[i].quantity);
    }

    console.log(totalPrice)

    let TotalPrice = document.createElement("td");
    TotalPrice.classList.add("font-bold", "text-indigo-400");
    TotalPrice.textContent = totalPrice + "€";

    trFooter.appendChild(tdTotal);
    trFooter.appendChild(TotalPrice);




