const xhttp = new XMLHttpRequest();
const endPointRoot = 'http://localhost:8080/API/v1';
const userResource = "/users";
const bucketResource = "/bucketlist";
const domainRoot = 'https://andicloud32.com';
const TWO_SEC = 2000;
const notesContainer = document.getElementById("container");
// const addNoteBtn = notesContainer.querySelector(".add-note");
var bucketlist_id = 0;

function getBucketfromLocal() {
    return JSON.parse(localStorage.getItem("bucketlist") || "[]");
}

function saveBucketlist(content) {
    localStorage.setItem("bucketlist", JSON.stringify(content));
}

/**
 * Get bucketlists along with bucketitems
 * @todo @marooncandy have to grab bucketlist and iteams specific to userId
 */
const getBucketlist = () => {
    xhttp.open("GET", endPointRoot + bucketResource, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let info = JSON.parse(xhttp.responseText);
            console.log(info);
            info.forEach((obj, i) => {
                obj.forEach(e => {
                    document.getElementById('msg').innerHTML += `<li>${e.name}</li>`;
                })
            });
            console.log(JSON.stringify(info));
        }
    }
}

// getBucketlist().forEach(bucketlist => {
//     const bucketElement = AddBucketlistElement(bucketlist.id, bucketlist.content);
//     notesContainer.insertBefore(bucketElement, AddBucketlistElement);
// })
/**
 * Save bucketlist to bucketlist table in DB
 */
const postBucketlist = (id) => {
    const paramsJson = {
        bucketlist_id: id
    };
    console.log(content);
    xhttp.open("POST", `endPointRoot/uid/+bucketResource/${id}`, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(paramsJson));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("msg").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    }
}
/**
 * Dynamically add Bucketlist Element to Bucketlist page
 * @param {*} id bucketlist id
 * @param {*} content bucketlist name
 * @returns 
 */
const AddBucketlistElement = (id, name) => {
    let bucket = document.createElement('textarea');
    bucket.classList = note;
    bucket.id = id;
    bucket.value = name;

    bucket.addEventListener('change', () => {
        UpdateBucketElement(id, bucket.value);
    });

    Element.addEventListener('dblclick', () => {
        const deleteIt = confirm('Are you sure you wanna delete?');
        if (deleteIt) {
            deleteBucket(id, element);
        }
    })
    return bucket;
}

const addBucketlist = () => {
    const bucket = getBucketfromLocal();
    const bucketObj = {
        id: bucketlist_id,
        content: ""
    };
}

const UpdateBucketlist = (id, newContent) => {
    console.log('updating bucket...');

}

const deleteBucketlist = (id, content) => {
    console.log('deleting note');
}

window.onload = getBucketlist();