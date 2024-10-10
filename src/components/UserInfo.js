export default class UserInfo {
  constructor({ userName, userJob , avatarSelector}) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      modalTitle: this.userName.textContent,
      description: this.userJob.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ modalTitle, description }) {
    this.userName.textContent = modalTitle;
    this.userJob.textContent = description;
  }

  setAvatarImage(link){
    this.avatar.src = link;
  }
}