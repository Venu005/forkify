/* this class will reender the search results */
/* Very much similar to recipieView so let's create  aprent class and resultsView and recipeView will be children */
import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector(`.results`);
  _errorMessage = `Let's cook something else 🌚🌚`;

  _generateMarkeup() {
    console.log(this._data);
    return this._data.map(res => previewView.render(res, false)).join(' ');
  }
}

export default new ResultsView();
