'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;

  var mapFirstInteraction = false;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');

  function calculateInactiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2),
      y: Math.round(mapPinMain.offsetTop + MAIN_PIN_HEIGHT / 2)
    };
  }

  function setInactiveAddress() {
    var location = calculateInactiveMainPinCoordinates();
    addressInput.value = location.x + ', ' + location.y;
  }

  function calculateActiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2),
      y: Math.round(mapPinMain.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL)
    };
  }

  function setActiveAddress() {
    var location = calculateActiveMainPinCoordinates();
    addressInput.value = location.x + ', ' + location.y;
  }

  function setActive() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsets.forEach(function (item) {
      item.disabled = false;
    });
  }

  function setInactive() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    fieldsets.forEach(function (item) {
      item.disabled = true;
    });
  }

  function setFirstActive() {
    if (!mapFirstInteraction) {
      mapFirstInteraction = true;
      setActive();
      // setActiveAddress();
      window.pin.createSimilarAds();
    }
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMouseMainButtonEvent(evt, setFirstActive);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setFirstActive);
  });

  ///////////////////////
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    function onMouseMove(moveEvt) {
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

      var currentX = mapPinMain.offsetLeft - shift.x;
      var left = window.const.MAP_START_X - Math.round(MAIN_PIN_WIDTH / 2);
      if (currentX < left) {
        currentX = left;
      }
      var right = window.const.MAP_FINISH_X - Math.round(MAIN_PIN_WIDTH / 2);
      if (currentX > right) {
        currentX = right;
      }

      var currentY = mapPinMain.offsetTop - shift.y;
      var top = window.const.MAP_START_Y - Math.round(MAIN_PIN_HEIGHT + MAIN_PIN_TAIL);
      if (currentY < top) {
        currentY = top;
      }
      var bottom = window.const.MAP_FINISH_Y - Math.round(MAIN_PIN_HEIGHT + MAIN_PIN_TAIL);
      if (currentY > bottom) {
        currentY = bottom;
      }

      mapPinMain.style.top = currentY + 'px';
      mapPinMain.style.left = currentX + 'px';
      // mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      // mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      setActiveAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      function onClickPreventDefault(clickEvt) {
        clickEvt.preventDefault();
        mapPinMain.removeEventListener('click', onClickPreventDefault);
      }

      if (dragged) {
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    }

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    setActiveAddress();
  });
  ///////////
  setInactive();
  setInactiveAddress();
})();
