const endPointRoot = 'https://andicloud32.com/API/v1';
// const domainRoot = 'https://andicloud32.com';
const userResource="/users";
const bucketResource="/buckets";
const itemResource = "/items";

const bid = (new URLSearchParams(window.location.search)).get('bid');

const browseBtn = document.getElementById('browse');
const updateBtn = document.getElementById('update');
const bucketTitle = document.getElementById('bucketTitle');
const itemsDiv = document.getElementById('movieList');
const removeBtn = document.getElementById('remove');

const moviesToDelete = [];

const onClickHandler = (movieId) => {
  return () => {
    if (moviesToDelete.includes(movieId)) {
      document.getElementById(movieId).className = "movieItem";
      moviesToDelete = moviesToDelete.filter((val) => val!=movieId);
    } else {
      document.getElementById(movieId).className = "movieItem clicked";
      moviesToDelete.push(movieId);
    }
  }
}

const onMount = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}`, true);
  xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send();
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        const bucket = JSON.parse(xhttp.responseText).bucket;
        bucketTitle.value = bucket.bucketName;
        if (bucket.items[0].id === null) {
          return;
        }

        bucket.items.forEach(item => {
          const mItem = document.createElement('div');
          mItem.className = "movieItem";
          mItem.setAttribute("id", item.id);
          mItem.onclick = onClickHandler(item.id);

          const mImg = document.createElement('img');
          mImg.className = "movieImage";
          mImg.src = item.image;

          const overlay = document.createElement('div');
          overlay.className = "overlay";

          const overlayText = document.createElement('div');
          overlayText.className = "overlayText";
          overlayText.innerHTML = `${item.title} ${item.year}`;

          overlay.appendChild(overlayText);
          mItem.appendChild(mImg);
          mItem.appendChild(overlay);
          itemsDiv.appendChild(mItem);

        })
      } else if (xhttp.readyState == 4) {
          alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
      }
  };
}

const redirectToMovieList = (ev) => {
  ev.preventDefault();

  window.location.href = `movieList.html?bid=${bid}`;
}

const updateBucketName = (ev) => {
  ev.preventDefault();

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}`, true);
  xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ bucketName: bucketTitle.value }));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          alert(`Bucket title successfully updated`);
      } else if (xhttp.readyState == 4) {
          alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
      }
  };
}

const removeMovies = (ev) => {
  ev.preventDefault();
  console.log(moviesToDelete);

  moviesToDelete.forEach(iid => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}${itemResource}/${iid}`, true);
    xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(`Bucket item successfully deleted`);
            document.getElementById(iid).remove();
        } else if (xhttp.readyState == 4) {
            alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
        }
    };
  })

}

updateBtn.onclick = updateBucketName;
browseBtn.onclick = redirectToMovieList;
removeBtn.onclick = removeMovies;
onMount();
