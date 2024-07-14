
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


// Elements
const profileEditBtn = document.querySelector('#profile-edit-button');
const profileEditmodal = document.querySelector('#profile-edit-modal');
const cardAddModal = document.querySelector('#card-add-modal');

const profileEditModalCloseBtn = profileEditmodal.querySelector('#profile-edit-modal-close')
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// form data input elements
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const cardTitleInput = cardAddModal.querySelector('#card-title-input');
const cardUrlInput = cardAddModal.querySelector('#card-url-input');

const profileEditForm = profileEditmodal.querySelector('#profile-edit-form');
const cardAddForm = cardAddModal.querySelector('#card-add-form');
const cardListEl = document.querySelector('.cards__list');

const cardTemplate =
  document.querySelector('#card-template').content.firstElementChild;

const addNewCardBtn = document.querySelector('.profile__add-button');
const closeNewCardBtn = document.querySelector('#profile-add-modal-close');


//Function
function closePopUp(modal) {
  // profileEditmodal.classList.toggle('modal_opened');
  modal.classList.toggle('modal_opened');
}
function openPopUp(modal) {
  // profileEditmodal.classList.toggle('modal_opened');
  modal.classList.add('modal_opened');
}
function renderCard (cardData, wrapper){
  const cardElement = getCardElement(cardData);
  // cardListEl.prepend(cardElement);
  wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditmodal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({name, link}, cardListEl);
  // return console.log('card url value:' + line);
  // const cardElement = getCardElement({name, link});
  closePopUp(cardAddModal);
}



//Event Listeners
profileEditBtn.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  // profileEditmodal.classList.add('modal_opened');
  openPopUp(profileEditmodal);
})
profileEditModalCloseBtn.addEventListener('click', () => closePopUp(profileEditmodal));

profileEditForm.addEventListener('submit', handleProfileEditSubmit);
cardAddForm.addEventListener('submit', handleAddCardSubmit);

addNewCardBtn.addEventListener('click', () => openPopUp(cardAddModal));
closeNewCardBtn.addEventListener('click', () => closePopUp(cardAddModal));



function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');

  // Set image and title
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

// Append cards to the card list element in the dom
// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   cardListEl.append(cardElement);
// });

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));


