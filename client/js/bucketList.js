const xhttp = new XMLHttpRequest();
const resource = '/v1/users/bucketlists';
const endPointRoot = 'http://localhost:8080';
const TWO_SEC = 2000;
const notesContainer = document.getElementById("container");
// const addNoteBtn = notesContainer.querySelector(".add-note");

/*
@todo @andi work on post/get of bucketlist functions
*/

function newItem(content) {
    if (content == null) {
        content = '';
    }
    let div = document.createElement('div');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    let textfield = document.createElement('input');
    textfield.setAttribute('type', 'text');
    let data = document.createTextNode(content);
    textfield.appendChild(data);

    let remove_button = document.createElement("button");
    let remove_button_name = document.createTextNode("Remove");
    remove_button.appendChild(remove_button_name);

    div.appendChild(checkbox);
    div.appendChild(textfield);
    div.appendChild(remove_button);

    let first_textbox = document.getElementById("parent");
    first_textbox.appendChild(div);

    remove_button.addEventListener("click", function () {
        div.remove(); //remove div from DOM
    });
}

function addItem() {
    newItem(null);
}

function saveNotes(notes) {

}

function updateNote(id, newContent) {

}

function deleteNote(id, element) {

}

// function post() {
//     let paramsJson = {'username': 'andi', 'email': '123@gmail.com'};
//     xhttp.open("POST", endPointRoot+resource, true);
//     xhttp.setRequestHeader('Content-type', 'application/json');
//     xhttp.send(JSON.stringify(paramsJson)); //sending data
//     xhttp.onreadystatechange = () => {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("msg").innerHTML = this.responseText;
//             console.log(this.responseText);
//         }
//     };
// }

function getBuckets() {
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText);
            // info.forEach(obj => {
            //     document.getElementById('msg').innerHTML += `<li style="list-style-type: none;">Bucket List No.${obj.id} Name: ${obj.name}</li>`;
            // })
            document.getElementById('msg').innerHTML = JSON.stringify(info);
            console.log(info);
        };
    }
}

window.onload = getBuckets();