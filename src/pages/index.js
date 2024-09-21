import './index.css';

// import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards, selectors} from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";


// create instances of all the classes
const cardSection = new Section({
  renderer: (item) => {
    const cardEl = new Card(item, selectors.cardTemplate);
    cardSection.addItems(cardEl.getView());
  },
  selector: selectors.cardSelection,
});
cardSection.renderItems(initialCards);


const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();


//index.js
// const newCardPopup = new PopupWithForm('card-add-modal', () => {});
// newCardPopup.open();
// newCardPopup.close();
