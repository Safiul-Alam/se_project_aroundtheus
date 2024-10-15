import "./index.css";

// import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  selectors,
  validationSettings,
  cardAddForm,
  profileEditForm,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { PopupWithConfirmation } from "../components/popupWithConfirmation.js";
import util from "../utils/utils.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "13ca465c-2480-4978-b0a0-252ae6127405",
    "Content-Type": "application/json",
  },
});

//userInfo
const profileName = ".profile__title";
const profileDescription = ".profile__description";
// Create user info instance
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
  avatarSelector: ".profile__image",
});

api
  .getUserInfo()
  .then((res) => {
    // console.log(res);
    userInfo.setUserInfo({ modalTitle: res.name, description: res.about });
    userInfo.setAvatarImage(res.avatar);
  })
  .catch((err) => alert(err));

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openPreviewModal,
    handleCardDelete,
    handleCardLike
  );
  return card.getView();
}

function handleCardDelete(card) {
  confirmPopup.open();
  confirmPopup.setSubmit(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.remove();
        confirmPopup.close();
      })
      .catch((err) => alert(`Error: ${err}`));
  });
}

function handleCardLike(card) {
  const method = card.isLiked ? "DELETE" : "PUT";

  api
    .updateCardLike(card._id, method)
    .then((res) => {
      // console.log(res);
      card.setIsLiked(res.isLiked);
    })
    .catch((err) => alert(`Error: ${err}`));
}

const cardSection = new Section({
  renderer: (item) => {
    const cardEl = createCard(item);
    cardSection.addItem(cardEl);
  },
  selector: selectors.cardSelection,
});
// cardSection.renderItems(initialCards);

api
  .getInitialCards()
  .then((res) => {
    // console.log(res)
    cardSection.renderItems(res);
  })
  .catch((err) => alert(err));

//----------------------------------------------------------------
// Image Modal
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

//----------------------------------------------------------------
// Add Card Modal

//cardAddModal validation
const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

// Function to handle form submission and add a new card
function handleAddCardSubmit({ title, url }) {
  newCardModal.handleLoad(true, "Saving...");
  const newCardData = { name: title, link: url };

  // Add new card through API
  api
    .uploadCard(newCardData)
    .then((card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard); // Add the new card to the section
      newCardModal.close(); // Close the modal after adding the card
      cardAddFormValidator.disableButton(); // Disable the form submission button
      cardAddForm.reset();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      newCardModal.handleLoad(false); // Reset the button text
    });
}

// Instance of PopupWithForm for adding a new card
const newCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);
newCardModal.setEventListeners();

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

//----------------------------------------------------------------
// Profile edit Modal

//Profile Modal validation
const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editProfileFormValidator.enableValidation();

// Function to handle form submission and update the profile
function handleProfileFormSubmit(input) {
  profileModal.handleLoad(true, "Saving...");
  // userInfo.setUserInfo(input);
  // profileModal.close();

  api
    .setUserInfo(input)
    .then(() => {
      userInfo.setUserInfo(input);
      profileModal.close();
      profileEditForm.reset();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    })
    .finally(() => {
      profileModal.handleLoad(false); // Reset the button text
    });
}

// create an instance of PopupWithForm for the profile modal
const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profileModal.setEventListeners();

// open the profile modal on button click
const openProfileModalButton = document.querySelector(".profile__edit-button");
openProfileModalButton.addEventListener("click", () => {
  const input = userInfo.getUserInfo();
  profileModal.setInputValues(input);
  editProfileFormValidator.resetValidation();
  profileModal.open();
});

// Card delete confirm Modal ------------------------------------------

// const deleteConfirmationModal = new PopupWithConfirmation ('.confirm-modal', handleCardDelete );

const confirmPopup = new PopupWithConfirmation(
  "#modal-confirm",
  (cardData, evt) => {
    evt.preventDefault();
    api
      .deleteCard(cardData.cardId)
      .then(() => {
        cardData.cardEl.remove();
        cardData.cardEl = null;
        confirmPopup.close();
      })
      .catch((err) => alert(err))
      .finally(() => confirmPopup.resetButtonText());
  }
);
confirmPopup.setEventListeners();

// Avatar --------------------------------------------

const profileImageForm = document.querySelector("#edit-avatar-form");
const editAvaterFormValidator = new FormValidator(
  validationSettings,
  profileImageForm
);
editAvaterFormValidator.enableValidation();

const newProfileImageModal = new PopupWithForm(
  "#edit-avatar-modal",
  handleProfileImageFormSubmit
);
newProfileImageModal.setEventListeners();

function handleProfileImageFormSubmit(data) {
  newProfileImageModal.handleLoad(true, "Saving...");
  api
    .setUserAvatar(data.avatar)
    .then(() => {
      userInfo.setAvatarImage(data.avatar);
      newProfileImageModal.close();
      profileImageForm.reset();
      // profileImageForm.close();
      editAvaterFormValidator.disableButton();
      profileImageForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newProfileImageModal.handleLoad(false);
    });
}

const profileImageCover = document.querySelector(".profile__edit-image");
profileImageCover.addEventListener("click", function () {
  newProfileImageModal.open();
});
