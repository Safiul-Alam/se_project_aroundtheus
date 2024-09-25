export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this.profileJob = document.querySelector(profileJob);
    this.profileName = document.querySelector(profileName);
  }

  getUserInfo() {
    // returns object with user info
    return {
      name: this.profileName.textContent,
      job: this.profileJob.textContent,
    };
  }

  setUserInfo(data) {
    // takes new user data and adds to page
    // use after successful profile form submission
    this.profileName.textContent = data.name;
    this.profileJob.textContent = data.job;
  }
}