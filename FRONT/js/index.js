fetch("http://localhost:3000/api/teddies").then(response => {
    if (response.ok) {
        return response.json();
    }
}).then(data => {
    console.log(data)

    const divOurs = document.getElementById("divOurs"); // récupération de la <div> contenant les ours

    // Création d'une boucle pour récupérer la totalité des peluches 

    for (let i = 0; i < data.length; i++) {

        let aBear = createHtml("div", {
            "class": "py-10 px-6 bg-red-200 text-center rounded-lg shadow-md"
        }, divOurs);

        let blockBear = createHtml("a", {
            "class": "space-y-10",
            "href": "produit.html?id=" + data[i]._id
        }, aBear);

        let imgBear = createHtml("img", {
            "class": "mx-auto h-40 w-40 rounded-2xl xl:w-56 xl:h-56 object-cover",
            "src": data[i].imageUrl,
            "alt": "Photo de l'ours en peluche " + data[i].name
        }, blockBear);

        let blockDetails = createHtml("div", {
            "class": "space-y-2"
        }, blockBear);

        let blockPriceName = createHtml("div", {
            "class": "text-lg space-y-1"
        }, blockDetails);

        let nameBear = createHtml("H3", {
            "class": "font-extrabold"
        }, blockPriceName);
        nameBear.textContent = data[i].name;

        let priceBear = createHtml("p", {
            "class": "text-indigo-400 font-bold"
        }, blockPriceName);
        priceBear.textContent = data[i].price / 100 + "€";

    };
});