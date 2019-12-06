/**
 * displayLoading
 *
 * Displays our loading indicator
 *
 * @return {void}
 */
const displayLoading = () => window.document.querySelector('#loading-container').innerHTML = '<div id="loading-overlay"><p class="loading-msg">Loading...</p></div>';

/**
 * removeLoading
 *
 * Removed our loading indicator
 *
 * @return {void}
 */
const removeLoading = () => window.document.querySelector('#loading-container').innerHTML = '';

/**
 * displayError
 *
 * Displays erron messages
 *
 * @param {string} msg
 * @return {void}
 */
const displayError = msg => {
  const errorsEl = window.document.querySelector('#error-container');

  errorsEl.innerHTML = `<p>${msg}</p>`;
};
