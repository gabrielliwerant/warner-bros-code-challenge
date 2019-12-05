const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

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
 * Remove a todo from the DOM and data model
 *
 * @param {array} todos
 * @param {number} id
 * @param {DOM Element} el
 * @return {void}
 */
const removeTodo = (todos, id, el) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  todos.splice(todoIndex, 1);

  el.remove()
};

/**
 * addTodo
 *
 * Add new todo to the todos data model
 *
 * @param {array} todos
 * @param {number} userId
 * @param {title} title
 * @param {boolean} completed
 * @return {boid}
 */
const addTodo = (todos, userId, title, completed) => {
  // KLUDGE: Normally we would use the returned id from the POST response, but
  // the API returns the same stubbed response every time, so we need to create
  // new ids
  const id = Math.floor(Math.random() * Math.floor(100000));

  // Add new todo to the front of the list
  todos.unshift({ userId, id, title, completed });
};

/**
 * updateTodoStatus
 *
 * Modify the status of the todo in the data model
 *
 * @param {array} todos
 * @param {number} id
 * @param {boolean} status
 * @return {void}
 */
const updateTodoStatus = (todos, id, status) => todos.find(todo => todo.id === id).completed = status;

/**
 * addTodoClickEventHandlers
 *
 * Adds event handlers related to clicking on a todo todo checkbox
 *
 * @param {number} id
 * @param {boolean} status
 * @param {array} todos
 * @return {void}
 */
const addTodoClickEventHandlers = (id, status, todos) => {
  const todoEl = window.document.getElementById(`todo-${id}`);
  const todoCheckboxEl = todoEl.getElementsByTagName('input')[0];
  const newStatus = !status;

  todoCheckboxEl.addEventListener('click', e => {
    displayLoading();

    fetch(`${TODOS_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: newStatus }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(res => res.json())
      .then(json => {
        updateTodoStatus(todos, id, newStatus);
        handleCompletedUiStatusForTodo(id);
        removeLoading();
      })
      .catch(err => {
        displayError(err);
        resetCheckboxStatus(todoCheckboxEl);
        removeLoading();
      });
  });

  const deleteButtonEl = window.document.getElementById(`todo-${id}`).querySelector('.delete-btn');
  deleteButtonEl.addEventListener('click', e => {
    if (window.confirm('Are you sure you wish to delete this todo item?')) {
      displayLoading();

      fetch(`${TODOS_URL}/${id}`, { method: 'DELETE' })
        .then(res => {
          removeTodo(todos, id, todoEl);
          removeLoading();
        })
        .catch(err => {
          displayError(err);
          removeLoading();
        });
    }
  });
};

/**
 * getNewTodo
 *
 * Create new todo for display use and DOM data modeling
 *
 * @param {number} id
 * @param {string} title
 * @param {boolean} completed
 * @returns {string}
 */
const getNewTodo = (id, title, completed) => {
  const completedClass = completed ? 'completed' : 'uncompleted';
  const checked = completed ? 'checked' : '';

  return `
    <li id="todo-${id}" class="todo ${completedClass}">
      <div class="user-actions">
        <div>
          <input type="checkbox" ${checked} />
          ${title}
        </div>
        <button class="icon-btn delete-btn"><i class="material-icons">delete</i></button>
      </div>
    </li>`;
};

/**
 * addEventHandlerForCreatingTodos
 *
 * Add the event handles necessary to allow creation of new todo items
 *
 * @param {number} userId
 * @param {array} todos
 * @return {void}
 */
const addEventHandlerForCreatingTodos = (userId, todos) => {
  const addButtonEl = window.document.getElementById('todo-add-container').querySelector('.add-btn');
  const inputTodoEl = window.document.getElementById('todo-add');

  addButtonEl.addEventListener('click', e => {
    displayLoading();

    fetch(`${TODOS_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        title: inputTodoEl.value,
        completed: false,
        userId
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(res => res.json())
      .then(todo => {
        addTodo(todos, userId, todo.title, todo.completed)
        displayTodos(todos);
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
  const todoAdder = `
    <div id="todo-add-container">
      <button class="icon-btn add-btn"><i class="material-icons">add</i></button>
      <input id="todo-add" class="todo-add-input" type="text" placeholder="Enter new todo here!" />
    </div>`;
  let todoList;

  todoList = '<ul>';
  todos.forEach(todo => todoList += getNewTodo(todo.id, todo.title, todo.completed));
  todoList += '</ul>';
  todosContainerEl.innerHTML = `${todoContainerHeader}${todoAdder}${todoList}`;

  todos.forEach(todo => addTodoClickEventHandlers(todo.id, todo.completed, todos));
  addEventHandlerForCreatingTodos(todos[0].userId, todos);
};
