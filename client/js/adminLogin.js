const xhttp = new XMLHttpRequest();
const endPointRoot = 'http://localhost:8080';
const resource="/adminLogin";

const username = document.getElementById('username');
const password = document.getElementById('password');
const message = document.getElementById('message');

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
          window.localStorage.setItem("adminToken", res.token);
          alert(`${res.message}`);
          // window.location.href = ""; // TODO: redirect to landing page
      } else if (xhttp.readyState == 4) {
          message.textContent  = `Error: ${JSON.parse(xhttp.responseText).message}`;
      }
  };
}

const form = document.getElementById('form');
form.addEventListener('submit', loginHandler);
