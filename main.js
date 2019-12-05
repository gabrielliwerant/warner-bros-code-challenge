const displayUsers = users => {
  const usersEl = window.document.querySelector('#users-container');

  usersEl.innerHTML = '<ul>';
  users.forEach(user => usersEl.innerHTML += `<li>${user.username}</li>`);
  usersEl.innerHTML += '</ul>';
};

const displayError = msg => {
  const errorsEl = window.document.querySelector('#error-container');

  errorsEl.innerHTML = `<p>${msg}</p>`;
};

const start = () => {
  const usersEl = window.document.querySelector('#users-container');
  usersEl.innerHTML = '<p>Loading...</p>';
  users = fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => displayUsers(json))
    .catch(err => displayError(err));
};

start();
