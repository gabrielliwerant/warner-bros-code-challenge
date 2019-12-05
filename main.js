const fetch = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  return xhr;
};

const getXhrResponseData = xhr => {
  const parseData = data => JSON.parse(data);

  xhr.onreadystatechange = () => {
    const DONE = 4;
    const OK = 200;

    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        return { hasError: false, isFinished: true, data: parseData(xhr.responseText) };
      } else {
        return { hasError: true, isFinished: true, data: xhr.status };
      }
    } else {
      return { hasError: undefined, isFinished: false, data: undefined };
    }
  };

  return xhr.onreadystatechange();
};

const displayUsers = users => {
  const usersEl = window.document.querySelector('#users-container');

  usersEl.innerHTML = '<ul>';
  users.forEach(user => usersEl.innerHTML += `<li>${user.username}</li>`);
  usersEl.innerHTML += '</ul>';
};

const start = () => {
  const usersEl = window.document.querySelector('#users-container');
  const usersXhr = fetch('https://jsonplaceholder.typicode.com/users');
  const interval = window.setInterval(
    () => {
      const users = getXhrResponseData(usersXhr);

      if (users.isFinished) {
        window.clearInterval(interval);

        if (users.hasError === false) displayUsers(users.data);
        else usersEl.innerHTML = '<p>Error!</p>';
      }
    },
    1100,
    usersXhr
  );

  usersEl.innerHTML = '<p>Loading...</p>';
};

start();
