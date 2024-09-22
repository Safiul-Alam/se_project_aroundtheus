import './index.css';

// import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards, selectors, config, cardAddForm, profileEditForm}  from "../components/constants.js";
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
function handleAddCardFormSubmit(values){
  console.log(values);
}
const newCardModal = new PopupWithForm(
  "#card-add-modal",
  handleAddCardFormSubmit
);
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
