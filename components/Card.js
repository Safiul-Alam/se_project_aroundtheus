export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector).content
      .querySelector('.card').cloneNode(true);
    return cardEl;
  }


  _handleLikeButton() {
    this._cardElement.querySelector(".card__like_button")
      .classList.toggle("card__like_button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }


  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like_button");
    likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    const cardDelete = this._cardElement.querySelector(".card__delete_button");
    cardDelete.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleImageClick({name: this._name, link: this._link});
    });
  }


  getView() {
    this._cardElement = this._getTemplate();

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }



}