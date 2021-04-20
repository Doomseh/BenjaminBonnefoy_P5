const request = new XMLHttpRequest();
const url = 'http://localhost:3000/api/teddies';
request.responseType = 'json';
request.onreadystatechange = () => {
    if (request.readyState == XMLHttpRequest.DONE && this.status == 200) {
        return request.response;
    }
};
request.open("GET", url);
request.send();