'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupElement = document.querySelector('.setup');

  var setupPlayerElement = setupElement.querySelector('.setup-player');

  var setupWizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
  var setupWizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
  var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball');

  // Для того чтобы фильтровать данные, нам нужно после загрузки сохранить их, чтобы не пришлось загружать их каждый раз.
  var wizards = [];

  // При смене цвета куртки или цвета глаз, надо запоминать текущий выбранный цвет.
  var coatColor;
  var eyesColor;

  // Для того чтобы понять, какой из магов весомее, нам надо внедрить систему «отличности» одного мага от другого getRank.
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };
  // Изменение цвета плаща при клике
  setupWizardCoatElement.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    setupWizardCoatElement.style.fill = newColor;
    coatColor = newColor;
    updateWizards();
  });

  // Изменение цвета глаз при клике
  setupWizardEyesElement.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    setupWizardEyesElement.style.fill = newColor;
    eyesColor = newColor;
    updateWizards();
  });

  // Изменение цвета fireball при клике
  setupFireballElement.addEventListener('click', function () {
    var newColor = getRandomElement(FIREBALL_COLORS);
    setupFireballElement.style.backgroundColor = newColor;
  });

  // При загрузке данных и смене цвета нам нужно фильтровать имеющиеся у нас данные. Для этого заведём отдельную функцию updateWizards, которую мы будем вызывать из всех мест, которые должны реагировать на изменения.
  var updateWizards = function () {
    window.renderSimilarWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  window.backend.load(onLoad, window.backend.onRequestError, LOAD_URL);
})();
