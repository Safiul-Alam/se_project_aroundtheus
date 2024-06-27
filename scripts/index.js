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


// Elements
const profileEditBtn = document.querySelector('#profile-edit-button');
const profileEditModel = document.querySelector('#profile-edit-model');
const profileModelCloseBtn = document.querySelector('#model-close')
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const profileEditForm = profileEditModel.querySelector('.model__form');


//Function
function closePopUp() {
  profileEditModel.classList.toggle('model_opened');
}

//Event handlers
function handleProfileEditSubmit(e){
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent =  profileDescriptionInput.value;
  closePopUp();
};


//Event Listeners
profileEditBtn.addEventListener('click', () => { //arrow function
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModel.classList.add('model_opened');
})

// profileModelCloseBtn.addEventListener('click', () => {
//   // profileEditModel.classList.remove('model_opened');
//   // profileEditModel.classList.toggle('model_opened');
//   closePopUp();
// })
profileModelCloseBtn.addEventListener('click', closePopUp )

// profileEditForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent =  profileDescriptionInput.value;
//   closePopUp();
// });

profileEditForm.addEventListener('submit', handleProfileEditSubmit);
