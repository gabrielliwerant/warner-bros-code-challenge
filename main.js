const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_BY_USER_ID_URL = 'https://jsonplaceholder.typicode.com/todos?userId';

/**
 * displayLoading
 *
 * Displays our loading indicator
 *
 * @param {DOM Element} el
 * @return {void}
 */
const displayLoading = el => {
  el.innerHTML = '<p>Loading...</p>';
};

/**
 * displayTodos
 *
 * Handles display of todo lists
 *
 * @param {array} todos
 * @return {void}
 */
const displayTodos = todos => {
  const todosContainerEl = window.document.querySelector('#todos-container');
  let todoList;

  displayLoading(todosContainerEl);

  todoList = '<ul>';
  todos.forEach(todo => todoList += `<li id="todo-${todo.id}">${todo.title}</li>`);
  todoList += '</ul>';
  todosContainerEl.innerHTML = todoList;
};

/**
 * displayUsers
 *
 * Handles display of user list, adding event handlers for each user to enable
 * display of todo information on click.
 *
 * @param {array} users
 * return {void}
 */
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

      fetch(`${TODOS_BY_USER_ID_URL}=${id}`)
        .then(res => res.json())
        .then(json => displayTodos(json))
        .catch(err => displayError(err))
    });
  });
};

/**
 * displayError
 *
 * Displays erron messages
 *
 * @param {string} msg
 * @param {void}
 */
const displayError = msg => {
  const errorsEl = window.document.querySelector('#error-container');

  errorsEl.innerHTML = `<p>${msg}</p>`;
};

/**
 * start
 *
 * Bootstrap application by loading any initial data/display itens
 *
 * @return {void}
 */
const start = () => {
  const usersContainerEl = window.document.querySelector('#users-container');

  displayLoading(usersContainerEl);

  fetch(USERS_URL)
    .then(res => res.json())
    .then(json => displayUsers(json))
    .catch(err => displayError(err));
};

start();
