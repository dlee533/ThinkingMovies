const xhttp = new XMLHttpRequest();
const resource = '/v1/users';
const endPointRoot = 'http://localhost:8080';
const TWO_SEC = 2000;
const notesContainer = document.getElementById("container");
// const addNoteBtn = notesContainer.querySelector(".add-note");
var bucketlist_id = 0;

getBuckets().forEach(bucketlist => {
    const bucketElement = AddBucketElement(bucketlist.id, bucketlist.content);
    notesContainer.insertBefore(bucketElement, AddBucketElement);
})

/**
 * Get bucketlists along with bucketitems
 * @todo @marooncandy have to grab bucketlist and iteams specific to userId
 */
function getBuckets() {
    xhttp.open("GET", endPointRoot + resource+'/buckets', true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText);
            let container = document.getElementById('msg');
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

function AddBucketElement(id, content) {
    let bucket = document.createElement('textarea');
    bucket.classList = note;
    bucket.id = id;
    bucket.value = content;

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

function UpdateBucketElement(id, newContent) {
    console.log('updating bucket...');

}

function deleteBucket(id, content) {
    console.log('deleting note');
}
window.onload = getBuckets();
