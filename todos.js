const TODOS_BY_ID = 'https://jsonplaceholder.typicode.com/todos';

/**
 * handleCompletedUiStatusForTodo
 *
 * Handles the toggling of the completed status for the todo list item for
 * display purposes
 *
 * @param {number} id
 * @return {void}
 */
const handleCompletedUiStatusForTodo = id => {
  const todoEl = window.document.getElementById(`todo-${id}`);

  // Find completed status from class name
  const isCompleted = !todoEl.getAttribute('class').includes('uncompleted');

  // Toggle the appropriate completed classes
  if (isCompleted) {
    todoEl.classList.remove('completed');
    todoEl.classList.add('uncompleted');
  } else {
    todoEl.classList.remove('uncompleted');
    todoEl.classList.add('completed');
  }
};

/**
 * resetCheckboxStatus
 *
 * In the event that we need the original checkbox completed status (such as in
 * the event of a response error), we reset it here
 *
 * @param {DOM Element} el
 * @returns {void}
 */
const resetCheckboxStatus = el => {
  if (el.checked) el.checked = false;
  else el.checked = true;
};

/**
 * removeTodo
 *
 * Remove a todo from the DOM
 *
 * @param {DOM Element} el
 * @return {void}
 */
const removeTodo = el => el.remove();

/**
 * addTodoClickEventHandlers
 *
 * Adds event handlers related to clicking on a todo todo checkbox
 *
 * @param {number} id
 * @param {boolean} status
 * @return {void}
 */
const addTodoClickEventHandlers = (id, status) => {
  const todoEl = window.document.getElementById(`todo-${id}`);
  let todoCheckboxEl = todoEl.getElementsByTagName('input')[0];
  todoCheckboxEl.addEventListener('click', e => {
    displayLoading();

    fetch(`${TODOS_BY_ID}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !status }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(res => res.json())
      .then(json => {
        handleCompletedUiStatusForTodo(json.id);
        removeLoading();
      })
      .catch(err => {
        displayError(err);
        resetCheckboxStatus(todoCheckboxEl);
        removeLoading();
      });
  });

  let deleteButtonEl = window.document.getElementById(`todo-${id}`).querySelector('.delete-btn');
  deleteButtonEl.addEventListener('click', e => {
    displayLoading();

    fetch(`${TODOS_BY_ID}/${id}`, { method: 'DELETE' })
      .then(res => {
        removeTodo(todoEl);
        removeLoading();
      })
      .catch(err => {
        displayError(err);
        removeLoading();
      });
  });
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
  const todoContainerHeader = '<h2>Todos:</h2>';
  let todoList;

  todoList = '<ul>';
  todos.forEach(todo => {
    let completedClass = todo.completed ? 'completed' : 'uncompleted';
    let checked = todo.completed ? 'checked' : '';

    todoList += `
      <li id="todo-${todo.id}" class="todo ${completedClass}">
        <div class="user-actions">
          <div>
            <input type="checkbox" ${checked} />
            ${todo.title}
          </div>
          <button class="icon-btn delete-btn"><i class="material-icons">delete</i></button>
        </div>
      </li>`
  });
  todoList += '</ul>';
  todosContainerEl.innerHTML = `${todoContainerHeader}${todoList}`;

  todos.forEach(todo => addTodoClickEventHandlers(todo.id, todo.completed));
};
