const xhttp = new XMLHttpRequest();
const resource = '/v1/users/bucketlists/';
const endPointRoot = 'http://localhost:3306';

// http://localhost:3306/API/v1/bucketlist

const notesContainer = document.getElementById("container");
const addNoteBtn = notesContainer.querySelector(".add-note");
/*
@todo @andi work on post/get of bucketlist functions
*/
function saveNotes(notes) {

}

function createNoteElement(id, content) {

}

function addNote() {

}

function updateNote(id, newContent) {

}

function deleteNote(id, element) {
    
}

function post() {
    let paramsJson = {'username': 'andi', 'email': '123@gmail.com'};
    xhttp.open("POST", endPointRoot+resource, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(paramsJson)); //sending data
    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("msg").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };
}

function getNotes() {
    xhttp.open("GET", endPointRoot+resource, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if(this.readyState == 4 && this.status == 200) {
            let bucketList = JSON.parse(this.responseText); 
            bucketList.forEach(obj => {
                document.getElementById('msg').innerHTML += `<li style="list-style-type: none;">${obj.id}:${obj.name}</li>`;
            })
        }
    };
}
window.onload = get();
// window.onload = post();