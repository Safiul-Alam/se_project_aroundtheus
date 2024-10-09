import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
      super({popupSelector});
      this._popupForm = this._popupElement.querySelector('.modal__form');
      this._inputList = [...this._popupForm.querySelectorAll('.modal__input')];
      this._handleFormSubmit = handleFormSubmit;
      // this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    // this._inputList = this._element.querySelectorAll(".form__input");
      this._formValues = {};
      this._inputList.forEach((input) => {
          this._formValues[input.name] = input.value;
      });
      return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  resetButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }



  closeAfterSubmit() {
    this._popupForm.reset();
    this.open();
    this.close();
  }

  setEventListeners() {
      this._popupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
          this._popupForm.reset();
      });
      super.setEventListeners();
  }

}