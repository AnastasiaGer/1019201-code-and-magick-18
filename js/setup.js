'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var showUserDialog = function () {
  var userDialogElement = document.querySelector('.setup');
  userDialogElement.classList.remove('hidden');
};

var showSetupSimilar = function () {
  var userSetupElement = document.querySelector('.setup-similar');
  userSetupElement.classList.remove('hidden');
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArrayElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

var getSimilarWizard = function () {
  var wizardFirstName = getRandomArrayElement(NAMES);
  var wizardLastName = getRandomArrayElement(SURNAMES);
  return {
    name: wizardFirstName + ' ' + wizardLastName,
    coatColor: getRandomArrayElement(COAT_COLORS),
    eyesColor: getRandomArrayElement(EYES_COLORS)
  };
};

var getSimilarWizards = function (wizardsCount) {
  var wizardsArray = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizardsArray.push(getSimilarWizard());
  }
  return wizardsArray;
};

var renderSimilarWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderSimilarWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderSimilarWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderSimilarWizards(getSimilarWizards(WIZARDS_COUNT));

var init = function () {
  showUserDialog();
  showSetupSimilar();
  var wizards = getSimilarWizards();
  renderSimilarWizards(wizards);
};

init();
