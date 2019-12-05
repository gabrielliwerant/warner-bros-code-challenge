const expected0 = `
    <li id="todo-0" class="todo uncompleted">
      <div class="user-actions">
        <div>
          <input type="checkbox"  />
          foo
        </div>
        <button class="icon-btn delete-btn"><i class="material-icons">delete</i></button>
      </div>
    </li>`;

const expected1 = `
    <li id="todo-0" class="todo completed">
      <div class="user-actions">
        <div>
          <input type="checkbox" checked />
          foo
        </div>
        <button class="icon-btn delete-btn"><i class="material-icons">delete</i></button>
      </div>
    </li>`;

const stub2 = [
  {
    userId: 0,
    id: 0,
    title: 'foo',
    completed: false
  },
  {
    userId: 0,
    id: 1,
    title: 'bar',
    completed: false
  }
];

const expected2 = [
  {
    userId: 0,
    id: 1,
    title: 'bar',
    completed: false
  }
];

const stub3 = [
  {
    userId: 0,
    id: 0,
    title: 'foo',
    completed: false
  },
  {
    userId: 0,
    id: 1,
    title: 'bar',
    completed: false
  }
];

const expected3 = [
  {
    userId: 0,
    id: 2,
    title: 'baz',
    completed: true
  },
  {
    userId: 0,
    id: 0,
    title: 'foo',
    completed: false
  },
  {
    userId: 0,
    id: 1,
    title: 'bar',
    completed: false
  }
];

console.log('=====BEGIN TESTS=====');
console.log('');

console.log('---------------------');

if (getNewTodo(0, 'foo', false) === expected0) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('getNewTodo should return the proper new todo string if completed is falsy');
console.log('ACTUAL: ', getNewTodo(0, 'foo', false));
console.log('EXPECTED: ', expected0);

console.log('---------------------');

if (getNewTodo(0, 'foo', true) === expected1) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('getNewTodo should return the proper new todo string if completed is truthy');
console.log('ACTUAL: ', getNewTodo(0, 'foo', true));
console.log('EXPECTED: ', expected1);

console.log('---------------------');

removeTodo(stub2, 0, undefined);
if (JSON.stringify(stub2) === JSON.stringify(expected2)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('removeTodo should remove the correct todo from the todo list data model');
console.log('ACTUAL: ', JSON.stringify(stub2));
console.log('EXPECTED: ', JSON.stringify(expected2));

console.log('---------------------');

addTodo(stub3, 0, 2, 'baz', true);
if (JSON.stringify(stub3) === JSON.stringify(expected3)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('addTodo should add new todo to todos array');
console.log('ACTUAL: ', JSON.stringify(stub3));
console.log('EXPECTED: ', JSON.stringify(expected3));

console.log('---------------------');

console.log('');
console.log('=====END TESTS=====');
