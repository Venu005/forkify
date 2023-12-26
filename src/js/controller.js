/*  TO FUTURE ME- control.js IS THE MAIN THING, IT IS LIKE <App/>  */
import 'core-js/stable';
import 'regenerator-runtime/runtime'; //async
import * as model from './model.js';
import recipeView from './views/recipeView.js'; //importing the obj diresctly instead of es6 class
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //renderspinner
    recipeView.renderSpinner();
    // updating
    resultsView.update(model.getSearchResults());
    //3.  updating bookmarks
    bookMarkView.update(model.state.bookmarks);
    //1. loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state; // temporary storage
    //2. rendering recipe
    recipeView.render(model.state.recipe);
    //debugger;

    // //TEST newServings
    // controlServings();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //spinner
    resultsView.renderSpinner(); //inheritance🌚🌚
    //getting search data -- calling loadSearchResults
    const query = searchView.getQuery();
    // console.log(query);
    if (!query) return;
    // load search results
    await model.loadSearchResults(query);

    //render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResults(1));

    // render pagination buttons
    // console.log(model.state.search);
    paginationView.render(model.state.search);
    // console.log(resultsView);
  } catch (err) {
    console.log(err);
  }
};

const controlBtn = function (goToPage) {
  // usind dataset attributes
  // console.log(goToPage);
  // render overrides the previous mark up this._clear()
  resultsView.render(model.getSearchResults(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe servings (underlying data)
  model.updateServings(newServings);
  // updating recipeView
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.delBookmark(model.state.recipe.id);
  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // rendering
  bookMarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookMarkView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    recipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookMarkView.render(model.state.bookmarks);

    // changing id using histroy api
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
/*DON'T WONDER HOW THIS IS WORKING WITHOUT FUNCTION CALLS OPEN THE init() below.You can see that function call occurs
 but Publisher-Subscriber design principle */
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlBtn);
  bookMarkView.addHandlerRender(controlBookmarks);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  //console.log(`init logged once`);
})();

// window.addEventListener(`hashchange`, controlRecipe());
// window.addEventListener(`load`, controlRecipe());
