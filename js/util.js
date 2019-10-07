'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomItemFromArray = function (array) {
    var randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
  };

  var getItemsFromArray = function (array, itemsCount) {
    var newArray = [];
    var clone = array.slice();// this is how to make a copy

    for (var i = 0; i < itemsCount; i++) {
      var index = Math.floor(Math.random() * clone.length);
      var element = clone.splice(index, 1)[0];// inserts replaces
      newArray.push(element);
    }

    return newArray;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomItemFromArray: getRandomItemFromArray,
    getItemsFromArray: getItemsFromArray,
  };
})();
