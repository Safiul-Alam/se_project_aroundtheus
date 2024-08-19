class FormValidator {
  constructor(options, formEl) {
    this._options = options;
    this._formEl = formEl;
    this._inputEls = [...this._formEl.querySelectorAll(this._options.inputSelector)];
    this._submitButton = this._formEl.querySelector(this._options.submitButtonSelector);
  }

  _showInputError(inputEl) {
    const errorMessageElement = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._options.inputErrorClass);
    errorMessageElement.textContent = inputEl.validationMessage;
    errorMessageElement.classList.add(this._options.errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageElement = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._options.inputErrorClass);
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(this._options.errorClass);
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
    this._submitButton.classList.add(this._options.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _enableButton() {
    this._submitButton.classList.remove(this._options.inactiveButtonClass);
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
    this._formEl.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState(); // Ensure initial button state is set
  }
}





export default FormValidator;