import './index.css';

// import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards, selectors, validationSettings, cardAddForm, profileEditForm}
      from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";
import { PopupWithConfirmation } from '../components/popupWithConfirmation.js';



const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "13ca465c-2480-4978-b0a0-252ae6127405",
    "Content-Type": "application/json"
  }
});




function createCard(data) {
  const card = new Card(data, '#card-template', openPreviewModal, handleCardDelete);
  return card.getView();
};

const cardSection = new Section({
  renderer: (item) => {
    const cardEl = createCard(item);
    cardSection.addItem(cardEl);
  },
  selector: selectors.cardSelection,
});
// cardSection.renderItems(initialCards);
api.getInitialCards()
  .then((res) => {
    // console.log(res)
    cardSection.renderItems(res)})
  .catch((err) => alert(err));


//----------------------------------------------------------------
// Image Modal
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
};



//----------------------------------------------------------------
// Add Card Modal

//cardAddModal validation
const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

// Function to handle form submission and add a new card
function handleAddCardSubmit({ title, url }) {
  const newCardData = { Title: title, Link: url };

  // Add new card through API
  api.uploadCard(newCardData)
    .then(card => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);  // Add the new card to the section
      newCardModal.close();          // Close the modal after adding the card
      cardAddFormValidator.disableButton(); // Disable the form submission button
    })
    .catch(error => {
      console.error('Error adding card:', error);
    });
};


// Instance of PopupWithForm for adding a new card
const newCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);
newCardModal.setEventListeners();

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener("click", () => {
  newCardModal.open();
});




//----------------------------------------------------------------
// Profile edit Modal

//Profile Modal validation
const editProfileFormValidator = new FormValidator(validationSettings, profileEditForm);
editProfileFormValidator.enableValidation();

//userInfo
const profileName = ".profile__title";
const profileDescription = ".profile__description";
// Create user info instance
const userInfo = new UserInfo({ userName: profileName, userJob: profileDescription});

// Function to handle form submission and update the profile
function handleProfileFormSubmit(input) {
  // userInfo.setUserInfo(input);
  // profileModal.close();

  api.setUserInfo(input)
  .then(() => {
    userInfo.setUserInfo(input);
    profileModal.close();
  })
  .catch(error => {
    console.error('Error updating profile:', error);
  });
}

// create an instance of PopupWithForm for the profile modal
const profileModal = new PopupWithForm( "#profile-edit-modal" , handleProfileFormSubmit);
profileModal.setEventListeners();

// open the profile modal on button click
const openProfileModalButton = document.querySelector('.profile__edit-button');
openProfileModalButton.addEventListener("click", () => {
  const input = userInfo.getUserInfo();
  profileModal.setInputValues(input);
  editProfileFormValidator.resetValidation();
  profileModal.open();
});




function handleCardDelete(card) {
  confirmPopup.open();
  confirmPopup.setSubmit(() => {
    api.deleteCard(card._id).then(() => {
      card.remove();
      confirmPopup.close();
    });
  });
}



// Profile delete confirm Modal

// const deleteConfirmationModal = new PopupWithConfirmation ('.confirm-modal', handleCardDelete );

const confirmPopup = new PopupWithConfirmation("#modal-confirm", (cardData, evt) => {
  evt.preventDefault();
  api.deleteCard(cardData.cardId)
    .then(() => {
      cardData.cardEl.remove();
      cardData.cardEl = null;
      confirmPopup.close();
    })
    .catch((err) => alert(err))
    .finally(() => confirmPopup.resetButtonText());
});
confirmPopup.setEventListeners();



// Avatar update
const avatarEditForm = document.querySelector('#edit-avatar-modal');
avatarEditForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const avatarUrl = document.querySelector('#avatar-url-input').value;
  // Call API to update avatar
  api.setUserAvatar({ avatar: avatarUrl })
    .then((data) => {
      document.querySelector('.profile__image').src = data.avatar; // Assuming this is the correct selector for the image
      avatarEditPopup.close(); // Adjust if your popup method differs
    })
    .catch((error) => {
      console.error('Error updating avatar:', error);
    });
});
