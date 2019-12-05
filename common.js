/**
 * displayLoading
 *
 * Displays our loading indicator
 *
 * @return {void}
 */
const displayLoading = () => window.document.querySelector('#loading-overlay').innerHTML = '<p>Loading...</p>';

/**
 * removeLoading
 *
 * Removed our loading indicator
 *
 * @return {void}
 */
const removeLoading = () => window.document.querySelector('#loading-overlay').innerHTML = '';

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
