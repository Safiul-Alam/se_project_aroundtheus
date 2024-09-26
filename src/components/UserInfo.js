export default class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
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
}