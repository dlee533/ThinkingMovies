/**
 * Add a new bucket item when Add button is pressed
 */
function addItem() {
    newItem(null);
}
/**
 * Render bucket item element dynamically
 * @param {*} content 
 */
function newItem( content) {
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

/**
 * Grab user input and save bucket ITEM into bucketItem table
 * @param {*} item items in bucketlist
 */
 function saveBucketItems(bucketlistId) {
    let item_name = document.getElementById('name').value;
    //let bucketlistid = document.getElementById('bucketlist_id').value;
    if (validate(item_name, bucketlistId)) {
        let paramsJson = {'name': item_name, 'bucketlist_id': bucketlistId};
        xhttp.open("POST", endPointRoot + resource + '/buckets/:bucket_id/items', true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(paramsJson)); //sending data
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("msg").innerHTML = this.responseText;
                console.log(this.responseText);
                // document.getElementById('name').value='';
                // document.getElementById('score').value='';
            }
        };
    }
}

/**
 * Update bucket ITEM in the DB
 * @param {*} id 
 * @param {*} newContent 
 */
 function updateBucketItem(id, newContent) {

}

/**
 * Delete bucket ITEM from bucketItem table
 * @param {*} id 
 * @param {*} element 
 */
 function deleteBucketItem(id, element) {

}

