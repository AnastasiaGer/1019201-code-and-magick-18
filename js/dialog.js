'use strict';
(function () {
  var MIN_USER_NAME = 2;
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var dialogHandlerElement = setupElement.querySelector('.upload');

  var userNameFieldElement = setupElement.querySelector('.setup-user-name');

  var setupPlayerElement = setupElement.querySelector('.setup-player');
  var setupWizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
  var setupWizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
  var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball');

  var HIDDEN_CLASS = 'hidden';

  var SAVE_URL = 'https://js.dump.academy/code-and-magick';

  // Открытие и закрытие popup
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== userNameFieldElement) {
      closePopup();
    }
  };

  var resetFormElement = function () {
    window.setup.setupWizardForm.reset();
  };

  var openPopup = function () {
    setupElement.classList.remove(HIDDEN_CLASS);
    document.addEventListener('keydown', onPopupEscPress);
    dialogHandlerElement.addEventListener('mousedown', dialogHandlerElement);
    userNameFieldElement.addEventListener('invalid', onUserNameFieldInvalid);
    userNameFieldElement.addEventListener('input', onUserNameFieldInput);
    setupWizardEyesElement.addEventListener('click', window.setup.onWizardEyesClick);
    setupFireballElement.addEventListener('click', window.setup.onFireballClick);
    setupWizardCoatElement.addEventListener('click', window.setup.onWizardCoatClick);
  };

  var closePopup = function () {
    setupElement.classList.add(HIDDEN_CLASS);
    setupElement.style.top = null;
    setupElement.style.left = null;
    document.removeEventListener('keydown', onPopupEscPress);
    dialogHandlerElement.addEventListener('mousedown', dialogHandlerElement);
    userNameFieldElement.removeEventListener('invalid', onUserNameFieldInvalid);
    userNameFieldElement.removeEventListener('input', onUserNameFieldInput);
    setupWizardEyesElement.removeEventListener('click', window.setup.onWizardEyesClick);
    setupFireballElement.removeEventListener('click', window.setup.onFireballClick);
    setupWizardCoatElement.removeEventListener('click', window.setup.onWizardCoatClick);
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
    resetFormElement();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
      resetFormElement();
    }
  });

  var onSuccess = function () {
    setupElement.classList.add('hidden');
    closePopup();
  };

  window.setup.setupWizardForm.addEventListener('submit', function (evt) {
    if (userNameFieldElement.checkValidity()) {
      window.backend.save(new FormData(window.setup.setupWizardForm), onSuccess, window.setup.onRequestError, SAVE_URL);
      evt.preventDefault();
    }
  });

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

})();
