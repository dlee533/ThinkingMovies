const endPointRoot = 'http://localhost:8080/API/v1';
const movieResource="/movies";
const userResource="/users";
const bucketResource="/buckets";

const movieList = document.getElementById('movieList');
const addBtn = document.getElementById('add');
const resetBtn = document.getElementById('reset');
const backBtn = document.getElementById('back');

const bid = (new URLSearchParams(window.location.search)).get('bid');

let moviesToAdd = [];

const reset = () => {
  location.reload();
}

const redirectToPrev = () => {
  window.location.href = `editBucketlist.html?bid=${bid}`;
}

const addHandler = () => {
  moviesToAdd.forEach(fid => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}`, true);
    xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({ fid }));
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = JSON.parse(xhttp.responseText);
        } else if (xhttp.readyState == 4) {
            alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
        }
    };
  })

  window.location.href = `editBucketlist.html?bid=${bid}`;
}

const onClickHandler = (movieId) => {
  return () => {
    if (moviesToAdd.includes(movieId)) {
      document.getElementById(movieId).className = "movieItem";
      moviesToAdd = moviesToAdd.filter((val) => val!=movieId);
    } else {
      document.getElementById(movieId).className = "movieItem clicked";
      moviesToAdd.push(movieId);
    }
  }
}

const onMount = () => {

  const promise = new Promise((res, rej) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}`, true);
    xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("apiKey")}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let items = JSON.parse(xhttp.responseText).bucket.items;
          for (let i = 0; i < items.length; i++) {
            items[i] = items[i].id;
          }
          res(items);
        } else if (xhttp.readyState == 4) {
            // alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
            rej(xhttp.responseText);
        }
    };
  })

  const populateList = (items) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot+movieResource, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const movies = JSON.parse(xhttp.responseText).movies;

            for (let i = 0; i < movies.length; i++) {
              if (items.includes(movies[i].id)) {
                continue;
              }

              const mItem = document.createElement('div');
              mItem.className = "movieItem";
              mItem.setAttribute("id", movies[i].id);
              mItem.onclick = onClickHandler(movies[i].id);

              const mImg = document.createElement('img');
              mImg.className = "movieImage"
              mImg.src = movies[i].image;

              const overlay = document.createElement('div');
              overlay.className = "overlay";

              const overlayText = document.createElement('div');
              overlayText.className = "overlayText";
              overlayText.innerHTML = `${movies[i].title} ${movies[i].year}`;

              overlay.appendChild(overlayText);
              mItem.appendChild(mImg);
              mItem.appendChild(overlay);
              movieList.appendChild(mItem);
            }
        } else if (xhttp.readyState == 4) {
            alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
        }
    };
  }

  promise.then(populateList)
         .catch(err => alert(`Error: ${err.message}`))

}


onMount();
addBtn.onclick = addHandler;
resetBtn.onclick = reset;
backBtn.onclick = redirectToPrev;
