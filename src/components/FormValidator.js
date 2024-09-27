class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(this._submitButtonSelectors);
  }

  _showInputError(inputEl) {
    const errorMessageElement = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageElement = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputEl.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    return (this._submitButton.disabled = true);
  }
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    return (this._submitButton.disabled = false);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      return this._disableButton();
    }
    return this._enableButton();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // this function is going to reset the forms, and hide the error message
  resetValidation() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._disableButton();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

}





export default FormValidator;