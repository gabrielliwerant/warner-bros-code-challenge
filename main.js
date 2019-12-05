const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_BY_USER_ID_URL = 'https://jsonplaceholder.typicode.com/todos?userId';

/**
 * start
 *
 * Bootstrap application by loading any initial data/display itens
 *
 * @return {void}
 */
const start = () => {
  displayLoading();

  fetch(USERS_URL)
    .then(res => res.json())
    .then(json => {
      displayUsers(json);
      removeLoading();
    })
    .catch(err => {
      displayError(err);
      removeLoading();
    });
};

start();
