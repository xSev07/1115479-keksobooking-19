'use strict';

(function () {
  var map = document.querySelector('.map');
  var COUNT_SIMILAR_AD = 8;
  var MAP_START_X = 0;
  var MAP_FINISH_X = map.clientWidth;
  var MAP_START_Y = 130;
  var MAP_FINISH_Y = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;
  var MAIN_PIN_POINTER_COORDINATES = {
    x: Math.round(MAIN_PIN_WIDTH / 2),
    y: Math.round(MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    yCenter: MAIN_PIN_HEIGHT / 2
  };

  window.const = {
    COUNT_SIMILAR_AD: COUNT_SIMILAR_AD,
    MAP_START_X: MAP_START_X,
    MAP_FINISH_X: MAP_FINISH_X,
    MAP_START_Y: MAP_START_Y,
    MAP_FINISH_Y: MAP_FINISH_Y,
    MAIN_PIN_POINTER_COORDINATES: MAIN_PIN_POINTER_COORDINATES
  };
})();
