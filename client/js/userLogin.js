const xhttp = new XMLHttpRequest();
const endPointRoot = 'http://localhost:8080/API/v1';
const resource="/userlogin";

const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');

const loginHandler = (e) => {
  e.preventDefault();
  const paramsJson = {'email': email.value, 'password': password.value};

  xhttp.open("POST", endPointRoot+resource, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(paramsJson));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          const res = JSON.parse(xhttp.responseText);
          window.localStorage.setItem("uid", res.id);
          window.localStorage.setItem("token", res.token);
          alert(`${res.message}`);
          window.location.href = './bucketlist.html'; // TODO: redirect to landing page
      } else if (xhttp.readyState == 4) {
          message.textContent  = `Error: ${JSON.parse(xhttp.responseText).message}`;
      }
  };
}

const form = document.getElementById('form');
form.addEventListener('submit', loginHandler);
