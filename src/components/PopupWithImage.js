import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});

    this._imageEl = this._popupElement.querySelector(".modal__image");
    this._titleEl = this._popupElement.querySelector(".modal__caption");
  }

  open(cardData) {
    this._imageEl.src = cardData.link;
    this._imageEl.alt = cardData.name;
    this._titleEl.textContent = cardData.name;

    super.open();
  }
}