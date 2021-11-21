const endPointRoot = 'https://mygarlicboy.com/API/v1';
const movieResource="/movies";
const userResource="/users";
const bucketResource="/bucketlist";

const movieList = document.getElementById('movieList');
const addBtn = document.getElementById('add');
const bid = (new URLSearchParams(window.location.search)).get('bid');

let moviesToAdd = [];

const addHandler = () => {
  const body = { movies: moviesToAdd }
  console.log(body);
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", `${endPointRoot}${userResource}/${window.localStorage.getItem("uid")}${bucketResource}/${bid}`, true);
  xhttp.setRequestHeader('Authorization',`Bearer ${window.localStorage.getItem("token")}`);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(body));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          const res = JSON.parse(xhttp.responseText);
          window.location.href = "editBucketlist.html";
      } else if (xhttp.readyState == 4) {
          alert(`Error: ${JSON.parse(xhttp.responseText).message}`);
      }
  };
}

const onClickHandler = (movieId) => {
  return () => {
    if (moviesToAdd.includes(movieId)) {
      moviesToAdd = moviesToAdd.filter((val) => val!=movieId);
    } else {
      moviesToAdd.push(movieId);
    }
  }
}

const onMount = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", endPointRoot+movieResource, true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          const movies = JSON.parse(xhttp.responseText).movies;

          for (let i = 0; i < movies.length; i++) {
            const mItem = document.createElement('div');
            mItem.className = "movieItem";
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

onMount();
addBtn.onclick = addHandler;
