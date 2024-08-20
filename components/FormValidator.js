class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputEls = [...this._formElement.querySelectorAll(this._settings.inputSelector)];
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputEl) {
    const errorMessageElement = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorMessageElement.textContent = inputEl.validationMessage;
    errorMessageElement.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageElement = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(this._settings.errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }
  _disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _enableButton() {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
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