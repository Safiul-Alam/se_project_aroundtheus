export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick; // store the function
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardEl;
  }

  _handleLikeButton() {
    // this._cardElement.querySelector(".card__like_button")
    //   .classList.toggle("card__like_button_active");
    this._likeButton.classList.toggle("card__like_button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  renderLikeIcon() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like_button_active");
    } else {
      this._likeButton.classList.remove("card__like_button_active");
    }
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked; // this allows to change the value of isLiked
    renderLikeIcon(); // this will update the icon visually
  }

  _setEventListeners() {
    // this._cardElement.querySelector(".card__like_button").addEventListener("click", () => {
    //   this._handleLikeButton();
    // });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(); // ?
      this._handleLikeClick(this);
    });

    this._cardElement
      .querySelector(".card__delete_button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  remove() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like_button");
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
