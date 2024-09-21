export default class Popup {
  constructor({ popupSelector}) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('modal_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.toggle('modal_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._modalElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

}