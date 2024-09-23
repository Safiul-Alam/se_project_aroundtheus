import './index.css';

// import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards, selectors, config, cardAddForm, profileEditForm, cardListEl}  from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";


// create instances of all the classes
const cardSection = new Section({
  renderer: (item) => {
    const cardEl = new Card(item, selectors.cardTemplate, openPreviewModal);
    cardSection.addItems(cardEl.getView());
  },
  selector: selectors.cardSelection,
});
cardSection.renderItems(initialCards);




//----------------------------------------------------------------
// Image Modal
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();
function openPreviewModal(cardData) {
  imageModal.open(cardData);
}



//----------------------------------------------------------------
// Add Card Modal

// Function to handle form submission and add a new card
function handleAddCardSubmit({ title, url }) {
  // const { title, url } = formValues;
  const newCardData = { name: title, link: url };

  const newCard = new Card(newCardData, selectors.cardTemplate, openPreviewModal);
  cardSection.addItems(newCard.getView());

  newCardModal.close();
}


// Instance of PopupWithForm for adding a new card
const newCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);
newCardModal.setEventListeners();

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener("click", () => {
  newCardModal.open();
});


//----------------------------------------------------------------
// Profile Modal
function handleProfileFormSubmit(formValues) {
  const { name, description } = formValues;
  console.log('Profile Data:', { name, description });
}

// create an instance of PopupWithForm for the profile modal
const profileModal = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileFormSubmit
);
profileModal.setEventListeners();

// open the profile modal on button click
const openProfileModalButton = document.querySelector('.profile__edit-button');
openProfileModalButton.addEventListener("click", () => {
  profileModal.open();
});







//----------------------------------------------------------------
//Profile Modal validation
const editProfileFormValidator = new FormValidator(config, profileEditForm);
editProfileFormValidator.enableValidation();

//cardAddModal validation
const cardAddFormValidator = new FormValidator(config, cardAddForm);
cardAddFormValidator.enableValidation();
