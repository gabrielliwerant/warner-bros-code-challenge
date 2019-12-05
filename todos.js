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
  todos.forEach(todo => {
    let completedClass = todo.completed ? 'completed' : 'uncompleted';
    let checked = todo.completed ? 'checked' : '';

    todoList += `
      <li id="todo-${todo.id}" class="todo ${completedClass}">
        <input type="checkbox" ${checked} />
        ${todo.title}
      </li>`
  });
  todoList += '</ul>';
  todosContainerEl.innerHTML = todoList;
};
