function createHtml(tag, attributes, parent) {

    let test = document.createElement(tag);
    Object.entries(attributes).forEach((value) => { 
        test.setAttribute(value[0], value[1]);
    });
    
    parent.appendChild(test);

    return test;

};

fetch("http://localhost:3000/api/teddies").then(response => {
    if (response.ok) {
        return response.json();
    }
}).then(data => {
    console.log(data)

    let divOurs = document.getElementById("divOurs"); // récupération de la <div> contenant les ours

    // Création d'une boucle pour récupérer la totalité des peluches 

    for (let i = 0; i < data.length; i++) {

        // let aBear = document.createElement("div");
        let aBear = createHtml("div", {"class" : "py-10 px-6 bg-red-200 text-center rounded-lg shadow-md"}, divOurs);
        //  aBear.classList.add("py-10", "px-6", "bg-red-200", "text-center", "rounded-lg", "shadow-md");

        //divOurs.appendChild(aBear);

       /* let blockBear = document.createElement("a");
        blockBear.classList.add("space-y-10");
        blockBear.setAttribute("href", "produit.html?id=" + data[i]._id);

        aBear.appendChild(blockBear); */

        let blockBear = createHtml("a", {"class" : "space-y-10", "href" : "produit.html?id=" + data[i]._id}, aBear);

        let imgBear = document.createElement("img");
        imgBear.classList.add("mx-auto", "h-40", "w-40", "rounded-2xl", "xl:w-56", "xl:h-56", "object-cover");
        imgBear.setAttribute("src", data[i].imageUrl);
        imgBear.setAttribute("alt", "Photo de l'ours en peluche " + data[i].name);

        blockBear.appendChild(imgBear)

        let blockDetails = document.createElement("div");
        blockDetails.classList.add("space-y-2");

        blockBear.appendChild(blockDetails);

        let blockPriceName = document.createElement("div");
        blockPriceName.classList.add("text-lg", "leading-6", "space-y-1");

        blockDetails.appendChild(blockPriceName);

        let nameBear = document.createElement("H3");
        nameBear.classList.add("font-extrabold");
        nameBear.textContent = data[i].name;

        blockPriceName.appendChild(nameBear);

        let priceBear = document.createElement("p");
        priceBear.classList.add("text-indigo-400", "font-bold");
        priceBear.textContent = data[i].price / 100 + "€";

        blockPriceName.appendChild(priceBear);
    };
});