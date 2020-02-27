'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;
  var MAP_BORDER = {
    top: window.const.MAP_START_Y - Math.round(MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    right: window.const.MAP_FINISH_X - Math.round(MAIN_PIN_WIDTH / 2),
    bottom: window.const.MAP_FINISH_Y - Math.round(MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    left: window.const.MAP_START_X - Math.round(MAIN_PIN_WIDTH / 2)
  };

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
      window.pin.createSimilarAds();
    }
  }

  function checkMapBorder(position, axis) {
    var checkedPosition = axis === 'x' ? MAP_BORDER.left : MAP_BORDER.top;
    if (position < checkedPosition) {
      position = checkedPosition;
    }
    checkedPosition = axis === 'x' ? MAP_BORDER.right : MAP_BORDER.bottom;
    if (position > checkedPosition) {
      position = checkedPosition;
    }
    return position;
  }

  function setMouseDrag(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = mapPinMain.offsetTop - shift.y;
      mapPinMain.style.top = checkMapBorder(currentY, 'y') + 'px';
      var currentX = mapPinMain.offsetLeft - shift.x;
      mapPinMain.style.left = checkMapBorder(currentX, 'x') + 'px';

      setActiveAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    setActiveAddress();
  }

  function onMainMouseDown(evt) {
    setFirstActive();
    setMouseDrag(evt);
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMouseMainButtonEvent(evt, onMainMouseDown);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setFirstActive);
  });

  setInactive();
  setInactiveAddress();
})();
