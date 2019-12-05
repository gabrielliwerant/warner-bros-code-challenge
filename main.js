const displayLoading = el => {
  el.innerHTML = '<p>Loading...</p>';
};

const displayTodos = todos => {
  const todosContainerEl = window.document.querySelector('#todos-container');
  let todoList;

  displayLoading(todosContainerEl);

  todoList = '<ul>';
  todos.forEach(todo => todoList += `<li>${todo.id}</li>`);
  todoList += '</ul>';
  todosContainerEl.innerHTML = todoList;
};

const displayUsers = users => {
  const usersContainerEl = window.document.querySelector('#users-container');
  let usersList;

  usersList = '<ul>';
  users.forEach(user => usersList += `<li><button id="user-${user.id}">${user.username}</button></li>`);
  usersList += '</ul>';
  usersContainerEl.innerHTML = usersList;

  let buttonEl;

  users.forEach(user => {
    buttonEl = window.document.getElementById(`user-${user.id}`);
    buttonEl.addEventListener('click', e => {
      const id = e.target.id.split('-')[1];

      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
        .then(res => res.json())
        .then(json => displayTodos(json))
        .catch(err => displayError(err))
    });
  });
};

const displayError = msg => {
  const errorsEl = window.document.querySelector('#error-container');

  errorsEl.innerHTML = `<p>${msg}</p>`;
};

const start = () => {
  const usersContainerEl = window.document.querySelector('#users-container');

  displayLoading(usersContainerEl);

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => displayUsers(json))
    .catch(err => displayError(err));
};

start();
