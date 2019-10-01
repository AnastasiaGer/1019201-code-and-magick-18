'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MIN_USER_NAME = 2;
var WIZARDS_COUNT = 4;

var HIDDEN_CLASS = 'hidden';

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = document.querySelector('.setup-close');

var setupFormElement = setupElement.querySelector('.setup-wizard-form');
var userNameFieldElement = setupElement.querySelector('.setup-user-name');
var setupSubmitElement = setupElement.querySelector('.setup-submit');

var dialogHandlerElement = setupElement.querySelector('.upload');
var userSetupElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupPlayerElement = setupElement.querySelector('.setup-player');
var setupWizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
var setupWizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArrayElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

// Открытие и закрытие popup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== userNameFieldElement) {
    closePopup();
  }
};

var openPopup = function () {
  setupElement.classList.remove(HIDDEN_CLASS);
  document.addEventListener('keydown', onPopupEscPress);
  dialogHandlerElement.addEventListener('mousedown', dialogHandlerElement);
  userNameFieldElement.addEventListener('invalid', onUserNameFieldInvalid);
  userNameFieldElement.addEventListener('input', onUserNameFieldInput);
  setupPlayerElement.addEventListener('click', onSetupPlayerClick);
  setupSubmitElement.addEventListener('click', onSetupSubmitClick);
};

var closePopup = function () {
  setupElement.classList.add(HIDDEN_CLASS);
  setupElement.style.top = null;
  setupElement.style.left = null;
  document.removeEventListener('keydown', onPopupEscPress);
  dialogHandlerElement.addEventListener('mousedown', dialogHandlerElement);
  userNameFieldElement.removeEventListener('invalid', onUserNameFieldInvalid);
  userNameFieldElement.removeEventListener('input', onUserNameFieldInput);
  setupPlayerElement.removeEventListener('click', onSetupPlayerClick);
  setupSubmitElement.removeEventListener('click', onSetupSubmitClick);
};

setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    closePopup();
  }
});

var onSetupSubmitClick = function () {
  if (userNameFieldElement.checkValidity()) {
    setupFormElement.submit();
  }
};

var hideSetupElement = function () {
  userSetupElement.classList.remove(HIDDEN_CLASS);
};

// Валидация длины текста в поле Имени персонажа
var onUserNameFieldInvalid = function () {
  if (userNameFieldElement.validity.tooShort) {
    userNameFieldElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameFieldElement.validity.tooLong) {
    userNameFieldElement.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameFieldElement.validity.valueMissing) {
    userNameFieldElement.setCustomValidity('Обязательное поле');
  } else {
    userNameFieldElement.setCustomValidity('');
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

// Перетаскивание окна настроек
dialogHandlerElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
    setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandlerElement.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandlerElement.addEventListener('click', onClickPreventDefault);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// присвоение цветов при клике на элементы персонажа
var onSetupPlayerClick = function (evt) {
  var targetElement = evt.target;
  if (targetElement === setupWizardCoatElement) {
    targetElement.style.fill = getRandomArrayElement(COAT_COLORS);
  } else if (targetElement === setupWizardEyesElement) {
    targetElement.style.fill = getRandomArrayElement(EYES_COLORS);
  } else if (targetElement === setupFireballElement) {
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
