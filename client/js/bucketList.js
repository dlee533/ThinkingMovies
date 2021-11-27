const endPointRoot = 'https://andicloud32.com/API/v1';
// const domainRoot = 'https://andicloud32.com';
const bucketsContainer = document.getElementById("bucketLists");
const userResource="/users";
const bucketResource="/buckets";
const addBucketButton = document.getElementById("add-note");

const deleteBucket = (ev) => {
  ev.preventDefault();

  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${ev.target.value}`, true);
  xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
  xhttp.send();
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
          location.reload();
      } else if (xhttp.readyState == 4) {
          alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
      }
  };
}

const redirectToEditBucket = (ev) => {
  ev.preventDefault();

  window.location.href = `editBucketlist.html?bid=${ev.target.value}`;
}

const mountBucketComponent = (bucket) => {
  console.log(bucket);
  const bucketDiv = document.createElement('div');
  bucketDiv.className = "bucket-list";
  bucketDiv.setAttribute('id', bucket.bid);

  const bucketName = document.createElement('p');
  bucketName.innerHTML = bucket.bucketName;
  bucketName.style = "margin: 15px;";

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = "Remove bucket";
  removeBtn.onclick = deleteBucket;
  removeBtn.type = "button";
  removeBtn.setAttribute('value', bucket.bid);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = "Edit bucket";
  editBtn.onclick = redirectToEditBucket;
  editBtn.type = "button";
  editBtn.setAttribute('value', bucket.bid);

  bucketDiv.append(bucketName);
  bucketDiv.append(editBtn);
  bucketDiv.append(removeBtn);
  bucketsContainer.append(bucketDiv);

}

const onMount = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", endPointRoot + `${userResource}/${localStorage.getItem("uid")}${bucketResource}`, true);
  xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
  xhttp.send();
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          let buckets = JSON.parse(xhttp.responseText).buckets;
          buckets.forEach(bucket => {
            mountBucketComponent(bucket);
          })
      } else if (xhttp.readyState == 4) {
        alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
      }
  }
}

const createBucket = (ev) => {
  ev.preventDefault();

  const bucketName = prompt("Please enter bucket name", "");
  if (bucketName == null || bucketName == "") {
    alert('Invalid bucket name');
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", endPointRoot + `${userResource}/${localStorage.getItem("uid")}${bucketResource}`, true);
  xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
  xhttp.setRequestHeader('Content-Type',`application/json`);
  xhttp.send(JSON.stringify({ bucketName }));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
          location.reload();
      } else if (xhttp.readyState == 4) {
        alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
      }
  }
}

onMount();
addBucketButton.onclick = createBucket;

// /**
//  * Create bucketlist element (DOM) for the front end
//  * @param {*} id bucketlist_id
//  * @param {*} title bucketlist title
//  * @returns bucket element
//  */
//  const createBucketElement = (id, title) => {
//     const element = document.createElement("textarea");
//
//     element.classList.add("note");
//     element.value = title;
//     element.placeholder = "Enter a movie genre...";
//
//     element.addEventListener("change", () => {
//         updateBuckets(id, element.value);
//     });
//
//     element.addEventListener("dblclick", () => {
//         const doDelete = confirm(
//             "Are you sure you wish to delete this bucketlist?"
//         );
//
//         if (doDelete) {
//             deleteBuckets(id, element);
//             //todo: call delete in db
//         }
//     });
//     return element;
// }
//
// /**
//  * Dynamically render bucketlist
//  */
// getBuckets().forEach((obj) => {
//     const bucket = createBucketElement(obj.id, obj.title);
//     bucketsContainer.insertBefore(bucket, addBucketButton);
// });
//
// addBucketButton.addEventListener("click", () => {
//     addBuckets();
//     //postBucketlist();
// });
//
// saveBucketButton.addEventListener("click", () => {
//     postBucketlist();
// });
//
//
//
// /**
//  * testing in LS
//  * @returns
//  */
// function getBuckets() {
//     return JSON.parse(localStorage.getItem("bucketlist-title") || "[]");
// }
// /**
//  * Testing in LS
//  * @param {*} buckets
//  */
// function saveBuckets(buckets) {
//     localStorage.setItem("bucketlist-title", JSON.stringify(buckets));
// }
//
// /**
//  * Get bucketlists titles
//  */
//  const getBucketlist = () => {
//     xhttp.open("GET", endPointRoot, true);
//     xhttp.send();
//     xhttp.onreadystatechange = () => {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {
//             let info = JSON.parse(xhttp.responseText);
//             console.log(info);
//             // display bucketlist names
//             console.log(JSON.stringify(info));
//         }
//     }
// }
//
// /**
//  * Post bucketlist to DB
//  */
// const postBucketlist = () => {
//     const container = document.getElementById("container");
//     let allBucketTitles = container.querySelectorAll("textarea");
//     //console.log(allBucketTitles);
//     let bucketlists = [];
//     for (let i = 0; i < allBucketTitles.length; i++) {
//         console.log(allBucketTitles[i].value);
//         bucketlists.push( { 'name' : allBucketTitles[i].value } );
//     }
//     console.log(bucketlists);
//     xhttp.open("POST", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}`, true);
//     xhttp.setRequestHeader('Authorization',`Bearer ${window.localStorage.getItem("token")}`);
//     xhttp.setRequestHeader('Content-type', 'application/json');
//     xhttp.send(JSON.stringify(bucketlists));
//     console.log(JSON.stringify(bucketlists));
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log('inside readyState');
//             document.getElementById("msg").innerHTML = this.responseText;
//             console.log(this.responseText);
//         }
//     }
// }
//
// /**
//  * Add bucketlist element to the front end and save the bucketlist object into db
//  */
// const addBuckets = () => {
//     const buckets = getBuckets();
//     const bucketObj = {
//         id: bucket_id,
//         title: ""
//     };
//
//     bucket_id++;
//
//     const bucketElement = createBucketElement(bucketObj.id, bucketObj.title);
//     bucketsContainer.insertBefore(bucketElement, addBucketButton);
//
//     buckets.push(bucketObj);
//     saveBuckets(buckets);
//     postBucketlist();
// }
// /**
//  * Update bucketlist
//  * @param {*} id
//  * @param {*} newtitle
//  */
// const updateBuckets = (id, newTitle) => {
//     const buckets = getBuckets();
//     const bucketToUpdate = buckets.filter((obj) => obj.id == id)[0];
//
//     bucketToUpdate.title = newTitle;
//     saveBuckets(buckets);
// }
// /**
//  * Delete bucketlist
//  * @param {*} id
//  * @param {*} element
//  */
// const deleteBuckets = (id, element) => {
//     const buckets = getBuckets().filter((obj) => obj.id != id);
//
//     saveBuckets(buckets);
//     bucketsContainer.removeChild(element);
// }
//
// const deleteBucketfromDB = (event) => {
//   console.log(event);
// }
//
// window.onload = getBucketlist();
