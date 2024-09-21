import './index.css';

// import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards, selectors} from "../components/constants.js";
import { openPopUp, closePopUp, closeModalOnEvent } from '../components/utils.js';

// create instances of all the classes
const cardSection = new Section({
  renderer: (item) => {
    const cardEl = new Card(item, selectors.cardTemplate);
    cardSection.addItems(cardEl.getView());
  },
  selector: selectors.cardSelection,
});



//initialize all  instances
cardSection.renderItems(initialCards);



// all the rest
