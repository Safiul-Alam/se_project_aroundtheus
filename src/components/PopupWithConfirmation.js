import Popup from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, onConfirm) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._onConfirm = onConfirm;
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmit(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
