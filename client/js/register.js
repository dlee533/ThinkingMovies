const resource="/register";
const endPointRoot = 'https://mygarlicboy.com/API/v1';

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');

const loginHandler = (e) => {
  e.preventDefault();

  const xhttp = new XMLHttpRequest();

  const paramsJson = {
    'username': username.value,
    'email': email.value,
    'password': password.value
  };

  xhttp.open("POST", endPointRoot+resource, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(paramsJson));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          alert("Successfully registered");
          window.location.href = "./userLogin.html";
      } else if (xhttp.readyState == 4) {
          message.textContent = `Error: ${JSON.parse(xhttp.responseText).message}`;
      }
  };
}

const form = document.getElementById('form');
form.addEventListener('submit', loginHandler);
