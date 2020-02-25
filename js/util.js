'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MOUSE_MAIN_BUTTON = 0;
  var TAG_INPUT = 'INPUT';

  function isEscEvent(evt, action) {
    if (evt.key === ESC_KEY & evt.target.tagName !== TAG_INPUT) {
      action(evt);
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.key === ENTER_KEY) {
      action(evt);
    }
  }

  function isMouseMainButtonEvent(evt, action) {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      action(evt);
    }
  }

  function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (+max - +min) + +min);
  }

  function getArrayRandomElement(array) {
    var randomIndex = getRandomNumberInRange(0, array.length);
    return array[randomIndex];
  }

  function cutArrayElement(array) {
    var element = window.util.getArrayRandomElement(array);
    var index = array.indexOf(element);
    array.splice(index, 1);
    return element;
  }

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isMouseMainButtonEvent: isMouseMainButtonEvent,
    getRandomNumberInRange: getRandomNumberInRange,
    getArrayRandomElement: getArrayRandomElement,
    cutArrayElement: cutArrayElement
  };
})();
