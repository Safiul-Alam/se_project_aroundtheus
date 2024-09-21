export default class Popup {
  constructor({ popupSelector}) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    //open the popup
  }

  close() {
    this._popupElement.classList.toggle('modal_opened');
  }

  _handleEscClose() {
    // listen for esc button
  }

  setEventListeners(evt) {
    //sets event listeners
  }
}