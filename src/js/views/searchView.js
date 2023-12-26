import View from './View';

/*This class will not render anything it gets the data from the input Value */
class SearchView extends View {
  _parentElement = document.querySelector(`.search`);
  _clearInput() {
    this._parentElement.querySelector(`.search__field`).value = ``;
  }
  getQuery() {
    const query = this._parentElement.querySelector(`.search__field`).value;
    this._clearInput();
    return query;
  }
  //publisher handler is the function
  addHandlerSearch(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
