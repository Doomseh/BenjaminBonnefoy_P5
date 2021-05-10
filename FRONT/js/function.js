function createHtml(tag, attributes, parent) {

    let test = document.createElement(tag);
    Object.entries(attributes).forEach((value) => { 
        test.setAttribute(value[0], value[1]);
    });
    
    parent.appendChild(test);

    return test;
};