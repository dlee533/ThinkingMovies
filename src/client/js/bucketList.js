const xhttp = new XMLHttpRequest();
const resource = '/API/v1/bucketlist';
const endPointRoot = 'http://localhost:8080';

const xhttp = new XMLHttpRequest();
const domainRoot = 'https://andicloud32.com';
const resource = '/API/V1/';

function post() {
    let paramsJson = {'username': 'andi', 'email': '123@gmail.com'};
    xhttp.open("POST", endPointRoot+resource, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(paramsJson)); //sending data
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("msg").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };
}

function get() {
    xhttp.open("GET", endPointRoot+resource, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText); 
            info.forEach(obj => {
                document.getElementById('msg').innerHTML = this.responseText;
            })
        }
    };
}
window.onload = get();
window.onload = post();