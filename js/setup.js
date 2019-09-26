'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MIN_USER_NAME = 2;
var WIZARDS_COUNT = 4;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

var setupForm = setup.querySelector('.setup-wizard-form');
var userNameField = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');


var userSetupElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupPlayer = setup.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
var setupFireball = setupPlayer.querySelector('.setup-fireball');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArrayElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

// Открытие и закрытие popup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameField) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  userNameField.addEventListener('invalid', onUserNameFieldInvalid);
  userNameField.addEventListener('input', onUserNameFieldInput);
  setupPlayer.addEventListener('click', onSetupPlayerClick);
  setupSubmit.addEventListener('click', onSetupSubmitClick);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userNameField.removeEventListener('invalid', onUserNameFieldInvalid);
  userNameField.removeEventListener('input', onUserNameFieldInput);
  setupPlayer.removeEventListener('click', onSetupPlayerClick);
  setupSubmit.removeEventListener('click', onSetupSubmitClick);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var onSetupSubmitClick = function () {
  if (userNameField.checkValidity()) {
    setupForm.submit();
  }
};

var hideSetupElement = function () {
  userSetupElement.classList.remove('hidden');
};

// Валидация длины текста в поле Имени персонажа
var onUserNameFieldInvalid = function () {
  if (userNameField.validity.tooShort) {
    userNameField.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameField.validity.tooLong) {
    userNameField.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameField.validity.valueMissing) {
    userNameField.setCustomValidity('Обязательное поле');
  } else {
    userNameField.setCustomValidity('');
  }
};

// Валидация мин.длины текста в поле Имени персонажа для Edge
var onUserNameFieldInput = function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_USER_NAME) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
};

// присвоение цветов при клике на элементы персонажа
var onSetupPlayerClick = function (evt) {
  var targetElement = evt.target;
  if (targetElement === setupWizardCoat) {
    targetElement.style.fill = getRandomArrayElement(COAT_COLORS);
  } else if (targetElement === setupWizardEyes) {
    targetElement.style.fill = getRandomArrayElement(EYES_COLORS);
  } else if (targetElement === setupFireball) {
    targetElement.parentNode.style.background = getRandomArrayElement(FIREBALL_COLORS);
  }
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

var init = function () {
  var wizards = getSimilarWizards(WIZARDS_COUNT);
  renderSimilarWizards(wizards);
  hideSetupElement();
};

init();
