const bucketsResource ="/bucketlists";
const inputItem = document.getElementById("item-div");
const parent = document.getElementById("parent");
const bid = 1; // Update bid

let itemsArray = [];
let itemsArrayId = 0;

const ListItem = class {
    constructor(content) {
        if (!content) {
            this.content = "";
            this.bucketlistItemId = null;
        } else {
            this.content = content.film_title;
            this.bucketlistItemId = content.bucketitem_id;
        }
        this.id = itemsArrayId++;
        this.node = inputItem.cloneNode(true);
        this.node.getElementsByClassName("textbox")[0].value = this.content;
        this.node.getElementsByClassName("remove-btn")[0].value = this.id;
        this.node.style.display = "block";
        this.node.getElementsByClassName("textbox")[0].readOnly = true;
    }
}

const addItem = (content) => {
    const item = new ListItem(content);
    itemsArray.push(item);
    parent.appendChild(item.node);
}

const getSelectedBucketlistTitle = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${endPointRoot}${bucketsResource}/${bid}`, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = JSON.parse(xhttp.responseText);
            document.getElementById("bucketlistTitle").value = res[0].name;
        } else if (xhttp.readyState == 4) {
            alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
        }
    }
}

const getSelectedBucketlist = () => {
    getSelectedBucketlistTitle(bid);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}`, true);
    xhttp.setRequestHeader('Authorization',`Bearer ${window.localStorage.getItem("token")}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = JSON.parse(xhttp.responseText);
            itemsArray = [];
            for (i in res) {
                addItem(res[i]);
            }
        } else if (xhttp.readyState == 4) {
            alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
        }
    }
}

const updateBucketlistTitle = () => {
    if (bid) {
        let paramsJson = {'name': document.getElementById("bucketlistTitle").value, 'bucketlist_id': bid};
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `${endPointRoot}${bucketsResource}`, true);
        xhttp.setRequestHeader('Authorization',`Bearer ${window.localStorage.getItem("token")}`);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(paramsJson));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                const res = JSON.parse(xhttp.responseText);
            } else if (xhttp.readyState == 4) {
                alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
            }
        }
    }
}

const deleteBucketItem = () => {
    const element = event.target.parentElement;
    const nodeId = event.target.value;
    const itemId = itemsArray.filter(item => item.id == event.target.value)[0].bucketlistItemId;
    if (itemId) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `${endPointRoot}${bucketsResource}/${bid}/items/${itemId}`, true);
        xhttp.setRequestHeader('Authorization',`Bearer ${window.localStorage.getItem("token")}`);
        xhttp.send(null);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                const res = JSON.parse(xhttp.responseText);
                element.remove();
                itemsArray = itemsArray.filter(item => item.id != nodeId);
            } else if (xhttp.readyState == 4) {
                alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
            }
        }
    }
}

const goToMoviesPage = () => {
    window.location.href = "./movieList.html?bid=" + bid;
}

getSelectedBucketlist(bid);