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


// Image Modal
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();
function openPreviewModal(cardData) {
  imageModal.open(cardData);
}


// Add Card Modal
// Function to handle form submission and add a new card
function handleAddCardSubmit(formValues) {
  const { title, url } = formValues;
  const newCardData = { name: title, link: url };

  const newCard = new Card(newCardData, selectors.cardTemplate, handlePreviewModal);
  const newCardElement = newCard.getView();
  cardSection.addItem(newCardElement);

  newCardModal.close();
}

// Instance of Section for existing cards
// const cardSection = new Section({
//   renderer: (item) => {
//       const cardEl = new Card(item, selectors.cardTemplate, handlePreviewModal);
//       cardSection.addItem(cardEl.getView());
//   },
//   selector: selectors.cardSection,
// });
// cardSection.renderItems(initialCards);

// Instance of PopupWithForm for adding a new card
const newCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);
newCardModal.setEventListeners();


// Profile Modal
function handleProfileFormSubmit(values){
  console.log(values);
}
const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profileModal.setEventListeners();








//Profile Modal validation
const editProfileFormValidator = new FormValidator(config, profileEditForm);
editProfileFormValidator.enableValidation();

//cardAddModal validation
const cardAddFormValidator = new FormValidator(config, cardAddForm);
cardAddFormValidator.enableValidation();
