import View from './View';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector(`.upload`);
  _window = document.querySelector(`.add-recipe-window`);
  _overlay = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);
  _message = `Recipe addded successfully 🌚🌚`;
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle(`hidden`);
    this._window.classList.toggle(`hidden`);
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener(`click`, this.toggleWindow.bind(this));
    this._overlay.addEventListener(`click`, this.toggleWindow.bind(this));
  }
  _addHandlerUpload(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      //FormData Api
      const dataarr = [...new FormData(this)];
      //Object.fromEntries() -> coverts array to objects
      const data = Object.fromEntries(dataarr);
      handler(data);
    });
  }
  _generateMarkeup() {}
}

export default new AddRecipeView();
