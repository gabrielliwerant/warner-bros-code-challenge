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
