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
  const usersNavEl = window.document.querySelector('#users-container nav');
  let usersList;
  let informationIcon;

  usersList = '<ul>';
  users.forEach(user => usersList += `
    <li class="user inactive" id="user-${user.id}">
      <div class="user-actions">
        ${user.username}
        <button class="icon-btn info-btn"><i class="material-icons">info</i></button>
      </div>
      <ul class="user-info inactive">
        <li>Name: ${user.name}</li>
        <li>Email: ${user.email}</li>
        <li>Phone: ${user.phone}</li>
        <li>Website: ${user.website}</li>
      </ul>
    </li>`
  );
  usersList += '</ul>';
  usersNavEl.innerHTML = usersList;

  var userEl;
  let infoButtonEl;

  users.forEach(user => {
    userEl = window.document.getElementById(`user-${user.id}`);
    infoButtonEl = userEl.querySelector('.info-btn');

    userEl.addEventListener('click', e => {
      const className = e.target.className;

      // Only continue if we're clicking on the main li or actions container
      if (className !== 'user-actions' && !className.includes('user')) return;

      // Finding the id depends on which element was clicked
      const id = className === 'user-actions' ? e.target.parentElement.id.split('-')[1] : e.target.id.split('-')[1];

      fetch(`${TODOS_BY_USER_ID_URL}=${id}`)
        .then(res => res.json())
        .then(json => {
          displayTodos(json);

          const userEl = window.document.getElementById(`user-${user.id}`);
          const isActive = !userEl.getAttribute('class').includes('inactive');

          if (!isActive) {
            let newUserEl;
            users.forEach(user => {
              newUserEl = window.document.getElementById(`user-${user.id}`);
              newUserEl.classList.remove('active');
              if (!newUserEl.getAttribute('class').includes('inactive')) newUserEl.classList.add('inactive');
            });
            userEl.classList.remove('inactive');
            userEl.classList.add('active');
          }
        })
        .catch(err => displayError(err))
    });

    infoButtonEl.addEventListener('click', e => {
      userEl = window.document.getElementById(`user-${user.id}`);

      const isActive = !userEl.querySelector('ul').getAttribute('class').includes('inactive');

      if (isActive) {
        userEl.querySelector('ul').classList.remove('active');
        userEl.querySelector('ul').classList.add('inactive');
      } else {
        userEl.querySelector('ul').classList.remove('inactive');
        userEl.querySelector('ul').classList.add('active');
      }
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
  const usersNavEl = window.document.querySelector('#users-container nav');

  displayLoading(usersNavEl);

  fetch(USERS_URL)
    .then(res => res.json())
    .then(json => displayUsers(json))
    .catch(err => displayError(err));
};

start();
