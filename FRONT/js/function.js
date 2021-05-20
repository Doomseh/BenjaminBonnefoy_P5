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

function validEmail(inputEmail) {

    const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    let testEmail = emailRegex.test(inputEmail.value);
    console.log(testEmail);

    if (testEmail) {
        email.classList.remove("border-black", "border-red-500");
        email.classList.add("border-green-400", "border-4");
        return true;
    } else {
        email.classList.remove("border-black", "border-green-400");
        email.classList.add("border-red-500", "border-4");
        return false;
    }
};

function validName(inputName) {

    const nameRegex = /^[A-Za-zÀ-ÿ -']+$/
    let testName = nameRegex.test(inputName.value);
    console.log(testName);

    if (testName) {
        inputName.classList.remove("border-black", "border-red-500");
        inputName.classList.add("border-green-400", "border-4");
        return true;
    } else {
        inputName.classList.remove("border-black", "border-green-400");
        inputName.classList.add("border-red-500", "border-4");
        return false;
    }
};

function validAddress(inputAddress) {

    const addressRegex = /^[0-9A-Za-zÀ-ÿ -]+$/
    let testAddress = addressRegex.test(inputAddress.value);
    console.log(testAddress);

    if (testAddress) {
        inputAddress.classList.remove("border-black", "border-red-500");
        inputAddress.classList.add("border-green-400", "border-4");
        return true;
    } else {
        inputAddress.classList.remove("border-black", "border-green-400");
        inputAddress.classList.add("border-red-500", "border-4");
        return false;
    }
};

function validCP(inputCP) {

    const cpRegex = /^[0-9]{5}$/
    let testCP = cpRegex.test(inputCP.value);
    console.log(testCP);

    if (testCP) {
        inputCP.classList.remove("border-black", "border-red-500");
        inputCP.classList.add("border-green-400", "border-4");
        return true;
    } else {
        inputCP.classList.remove("border-black", "border-green-400");
        inputCP.classList.add("border-red-500", "border-4");
        return false;
    }
};