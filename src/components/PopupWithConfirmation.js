import Popup from "./Popup";

export class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleConfirmDelete) {
    super({ popupSelector });
    this._popupButton = this._popupElement.querySelector(".modal__button");
  }

  setSubmit(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {

    super.setEventListeners();
    this._popupButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    this._handleSubmitCallback();
    });
  }



}