const xhttp = new XMLHttpRequest();
const endPointRoot = 'http://localhost:8080/API/v1';
const resource="/adminLogin";
const verifyResource = "/admins/verify";

const username = document.getElementById('username');
const password = document.getElementById('password');
const message = document.getElementById('message');

const redirectToAdminPageIfLoggedIn = () => {
  if (!window.localStorage.getItem("adminAPIKey")) return;

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", endPointRoot+verifyResource, true);
  xhttp.setRequestHeader('Authorization',`Basic ${window.localStorage.getItem("adminAPIKey")}`);
  xhttp.send();
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          window.location.href = "./admin.html";
      }
  };
}

const loginHandler = (e) => {
  e.preventDefault();

  const xhttp = new XMLHttpRequest();
  const paramsJson = {'username': username.value, 'password': password.value};

  xhttp.open("POST", endPointRoot+resource, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(paramsJson));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          const res = JSON.parse(xhttp.responseText);
          console.log(res);
          window.localStorage.setItem("adminAPIKey", res.apiKey);
          alert(`${res.message}`);
          window.location.href = "./admin.html";
      } else if (xhttp.readyState == 4) {
          message.textContent  = `Error: ${JSON.parse(xhttp.responseText).message}`;
      }
  };
}

redirectToAdminPageIfLoggedIn();
const form = document.getElementById('form');
form.addEventListener('submit', loginHandler);
