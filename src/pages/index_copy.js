 import Card from "../components/Card.js";
 import FormValidator from "../components/FormValidator.js";
 import './index.css'

 const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }
];



const cardListEl = document.querySelector('.cards__list');
const profileEditBtn = document.querySelector('#profile-edit-button');
const profileEditmodal = document.querySelector('#profile-edit-modal');
const cardAddModal = document.querySelector('#card-add-modal');

const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');

const cardTitleInput = cardAddModal.querySelector('#card-title-input');
const cardUrlInput = cardAddModal.querySelector('#card-url-input');

const previewImageModal = document.querySelector("#image-preview-modal");
const previewModalImage = document.querySelector(".modal__image");
const previewCaption = document.querySelector(".modal__caption");

const profileEditForm = document.forms['profile-edit-form'];

// Profile section
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');




//Function ----------------------------------------------------------------
function closePopUp(modal) {
  modal.classList.toggle('modal_opened');
  document.removeEventListener('keydown', closeModalOnEvent);
  document.removeEventListener('click', closeModalOnEvent);
}
function openPopUp(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalOnEvent);
  document.addEventListener('click', closeModalOnEvent);
}

function closeModalOnEvent(event) {
  if (event.key === "Escape" && event.type === "keydown") { //"keyup"
    const openedPopup = document.querySelector(".modal_opened");
    closePopUp(openedPopup);
  }

  if (event.type === "click") {
    if (event.target.classList.contains("modal")) {
      closePopUp(event.target);
    }
  }
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditmodal);
}


profileEditForm.addEventListener('submit', handleProfileEditSubmit);


// Add card section
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({name, link}, cardListEl);
  closePopUp(cardAddModal);

  cardAddForm.reset();
}


profileEditBtn.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditmodal);
})

const cardAddForm = document.forms['card-add-form'];
cardAddForm.addEventListener('submit', handleAddCardSubmit);

const addNewCardBtn = document.querySelector('.profile__add-button');
addNewCardBtn.addEventListener('click', () => openPopUp(cardAddModal));


// Find all close buttons
const closeButtons = document.querySelectorAll('.modal__close');
closeButtons.forEach((button) => {
  // Find the closest popup only once and set listeners
  const popUp = button.closest('.modal');
  button.addEventListener('click', () => closePopUp(popUp));
});


function handlePreviewModal(data){
  previewModalImage.src = data.link;
  previewModalImage.alt = data.name;
  previewCaption.textContent = data.name;
  openPopUp(previewImageModal);
}

function createCard(data) {
  const card = new Card(data, '#card-template', handlePreviewModal);
  return card.getView();
}

function renderCard(cardData, cardListWrapper) {
  const cardElement = createCard(cardData);
  cardListWrapper.prepend(cardElement);
}

//Loops ----------------------------------------------------------------
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));



//Profile Modal validation
const editProfileFormValidator = new FormValidator(config, profileEditForm);
editProfileFormValidator.enableValidation();

//cardAddModal validation
const cardAddFormValidator = new FormValidator(config, cardAddForm);
cardAddFormValidator.enableValidation();


// FormValidation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",

  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};