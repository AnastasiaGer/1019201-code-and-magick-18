'use strict';
(function () {
  var MIN_USER_NAME = 2;
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupUploadElement = setupElement.querySelector('.upload');

  var userNameFieldElement = setupElement.querySelector('.setup-user-name');
  var setupSubmitElement = setupElement.querySelector('.setup-submit');

  var setupPlayerElement = setupElement.querySelector('.setup-player');

  var setupFormElement = setupElement.querySelector('.setup-wizard-form');

  var userSetupElement = document.querySelector('.setup-similar');

  // Открытие и закрытие popup
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.isEscEvent && evt.target !== userNameFieldElement) {
      closePopup();
    }
  };

  // Перетаскивание окна настроек
  var onSetupUploadMousedown = function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
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

    var onMouseUp = function () {

      if (dragged) {
        var onSetupUploadClick = function (clickEvt) {
          clickEvt.preventDefault();
          setupUploadElement.removeEventListener('click', onSetupUploadClick);
        };
        setupUploadElement.addEventListener('click', onSetupUploadClick);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupUploadElement.addEventListener('mousedown', onSetupUploadMousedown);
    userNameFieldElement.addEventListener('invalid', onUserNameFieldInvalid);
    userNameFieldElement.addEventListener('input', onUserNameFieldInput);
    setupPlayerElement.addEventListener('click', window.onSetupPlayerClick);
    setupSubmitElement.addEventListener('click', onSetupSubmitClick);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupUploadElement.addEventListener('mousedown', onSetupUploadMousedown);
    userNameFieldElement.removeEventListener('invalid', onUserNameFieldInvalid);
    userNameFieldElement.removeEventListener('input', onUserNameFieldInput);
    setupPlayerElement.removeEventListener('click', window.onSetupPlayerClick);
    setupSubmitElement.removeEventListener('click', onSetupSubmitClick);
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.isEnterEvent) {
      openPopup();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.isEnterEvent) {
      closePopup();
    }
  });

  var onSetupSubmitClick = function () {
    if (userNameFieldElement.checkValidity()) {
      setupFormElement.submit();
    }
  };

  var hideSetupElement = function () {
    userSetupElement.classList.remove('hidden');
  };

  hideSetupElement();

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
})();
