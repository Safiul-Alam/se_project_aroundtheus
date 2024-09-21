export default class Section {
  constructor({renderer, selector}) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(data) {
    items.forEach((item) => this._renderer(item));
  }

  addItems(item){
    this._element.append(item); //prepend
  }
}