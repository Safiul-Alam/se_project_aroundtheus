function showInputError(formEl,inputEl,{ inputErrorClass, errorClass }) {
  const errorMessageElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputEl.validationMessage;
  errorMessageElement.classList.add(errorClass);
}
function hideInputEror(formEl,inputEl,{ inputErrorClass, errorClass }) {
  const errorMessageElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(errorClass);
}
function checkInputValidity(formEl, inputEl, options) {
  if(!inputEl.validity.valid) {
    return  showInputError(formEl, inputEl, options);
  }
  hideInputEror(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function enableButtton(submitButton, config) {
  const { inactiveButtonClass } = config;
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
  return;
}
function disableButtton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
  return;
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
  if (hasInvalidInput(inputEls)) {
    enableButtton(submitButton, config);
  }
  disableButtton(submitButton, config);

}

function setEventListeners(formEl, options) {
  const {inputSelector} = options; // object de-structuring. same as above
  const inputEls = [...formEl.querySelectorAll(inputSelector)]; // spreed operator
  const submitButton = formEl.querySelector('.modal__button');
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener('input', (e) => { // run with every typing
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
};


function enableValidation (options) {
  const formEls = [...document.querySelectorAll(options.formSelector)]; // spreed operator
  formEls.forEach((formEl) => {
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
      });
      setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

enableValidation(config);