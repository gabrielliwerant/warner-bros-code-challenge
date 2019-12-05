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
