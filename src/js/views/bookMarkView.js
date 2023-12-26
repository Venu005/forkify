/* this class will reender the search results */
/* Very much similar to recipieView so let's create  aprent class and resultsView and recipeView will be children */
import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';
class BookMarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `No bookmarks yet,find a recipe and bookmark it`;
  _message = ' ';

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }
  _generateMarkeup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarksView();
