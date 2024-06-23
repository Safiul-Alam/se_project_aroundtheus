cardData1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
cardData2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};
cardData3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpghttps://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};
cardData4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};
cardData5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};
cardData6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};
const initialCards = [
  cardData1, cardData2, cardData3, cardData4, cardData5, cardData6
];
// console.log(initialCards);

const profileEditBtn = document.querySelector('#profile-edit-button');
// console.log(profileEditBtn);
const profileEditModel = document.querySelector('#profile-edit-model');
const profileModelCloseBtn = document.querySelector('#model-close')

profileEditBtn.addEventListener('click', () => { //arrow function
  // console.log('button clicked');
  profileEditModel.classList.add('model_opened');
})


profileModelCloseBtn.addEventListener('click', () => {
  profileEditModel.classList.remove('model_opened');
})
