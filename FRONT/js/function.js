/**
 * createHtml - créé une div et ses attributs et l'ajoute à un parent
 * @param {string} tag le tag html à créé
 * @param {object} attributes un objet représentant les proprétés html à ajouter, par exemple :  {"class": "py-16"}
 * @param {HTMLElement} parent l'élément html auquel ajouter le nouvel élément
 * @returns Le nouvel élément
 */
function createHtml(tag, attributes, parent) {

    let test = document.createElement(tag);
    Object.entries(attributes).forEach((value) => {
        test.setAttribute(value[0], value[1]);
    });

    parent.appendChild(test);

    return test;
};

// Fonction de vérifications des champs input grâce aux regex

function valid(input) {

    let inputName = input.attributes.name.value
    console.log(inputName)

    switch (inputName) {
        case "lastName":
        case "firstName":
        case "userCity":
            const nameRegex = /^[A-Za-zÀ-ÿ -']+$/;
            let testName = nameRegex.test(input.value);
            updateInputStyle(testName, input)
            console.log(testName);
            break;
        case "userEmail":
            const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
            let testEmail = emailRegex.test(input.value);
            updateInputStyle(testEmail, input)
            console.log(testEmail);
            break;
        case "userAddress":
            const addressRegex = /^[0-9A-Za-zÀ-ÿ -]+$/
            let testAddress = addressRegex.test(input.value);
            updateInputStyle(testAddress, input)
            console.log(testAddress);
            break;
        case "userCP":
            const cpRegex = /^[0-9]{5}$/
            let testCP = cpRegex.test(input.value);
            updateInputStyle(testCP, input)
            console.log(testCP);
            break;
    };
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