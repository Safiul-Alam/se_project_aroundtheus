





export const closeModalOnEvent = (event) =>{
  if (event.key === "Escape" && event.type === "keydown") { //"keyup"
    const openedPopup = document.querySelector(".modal_opened");
    closePopUp(openedPopup);
  }

  if (event.type === "click") {
    if (event.target.classList.contains("modal")) {
      closePopUp(event.target);
    }
  }
}

export const openPopUp = (modal) => {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalOnEvent);
  document.addEventListener('click', closeModalOnEvent);
}

export const closePopUp = (modal) => {
  modal.classList.toggle('modal_opened');
  document.removeEventListener('keydown', closeModalOnEvent);
  document.removeEventListener('click', closeModalOnEvent);
}

// export function closePopUp(modal) {
//   modal.classList.remove('modal_opened');
//   document.removeEventListener('keydown', closeModalOnEvent);
//   document.removeEventListener('click', closeModalOnEvent);
// }