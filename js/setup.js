'use strict';

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARDS_COUNT = 4;

var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';

var setupElement = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupPlayerElement = setupElement.querySelector('.setup-player');
var setupWizardForm = setupElement.querySelector('.setup-wizard-form');
var setupWizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
var setupWizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball');

var renderSimilarWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
  return wizardElement;
};

var renderSimilarWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderSimilarWizard(wizards[i]));
  }
  return fragment;
};

// Изменение цвета глаз при клике
var onWizardEyesClick = function () {
  var eyesColor = window.util.getRandomItemFromArray(EYES_COLORS);
  setupWizardEyesElement.style.fill = eyesColor;
  setupWizardForm.querySelector('input[name=eyes-color]').value = eyesColor;
};
// Изменение цвета fireball при клике
var onFireballClick = function () {
  var fireballColor = window.util.getRandomItemFromArray(FIREBALL_COLORS);
  setupFireballElement.style.backgroundColor = fireballColor;
  setupFireballElement.querySelector('input').value = fireballColor;
};
// Изменение цвета плаща при клике
var onWizardCoatClick = function () {
  var coatColor = window.util.getRandomItemFromArray(COAT_COLORS);
  setupWizardCoatElement.style.fill = coatColor;
  setupWizardForm.querySelector('input[name=coat-color]').value = coatColor;
};

var onLoad = function (wizards) {
  var wizardsArray = window.util.getItemsFromArray(wizards, WIZARDS_COUNT);
  similarListElement.append(renderSimilarWizards(wizardsArray));
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var onRequestError = function (errorMessage) {
  var node = document.createElement('div');
  node.classList.add('error-node');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
  node.addEventListener('submit', removeOnRequestError);
};

var removeOnRequestError = function (evt) {
  document.body.removeChild(evt.target);
  evt.target.removeEventListener('submit', removeOnRequestError);
};

window.backend.load(onLoad, onRequestError, LOAD_URL);

window.setup = {
  onWizardEyesClick: onWizardEyesClick,
  onFireballClick: onFireballClick,
  onWizardCoatClick: onWizardCoatClick,
  setupWizardForm: setupWizardForm,
  onRequestError: onRequestError
};
