'use strict';

(function () {
  var MapBorder = {
    TOP: window.const.MAP_START_Y - window.const.MAIN_PIN_POINTER_COORDINATES.y,
    RIGHT: window.const.MAP_FINISH_X - window.const.MAIN_PIN_POINTER_COORDINATES.x,
    BOTTOM: window.const.MAP_FINISH_Y - window.const.MAIN_PIN_POINTER_COORDINATES.y,
    LEFT: window.const.MAP_START_X - window.const.MAIN_PIN_POINTER_COORDINATES.x
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function calculateInactiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + window.const.MAIN_PIN_POINTER_COORDINATES.x),
      y: Math.round(mapPinMain.offsetTop + window.const.MAIN_PIN_POINTER_COORDINATES.yCenter)
    };
  }

  function setInactiveAddress() {
    var location = calculateInactiveMainPinCoordinates();
    addressInput.value = location.x + ', ' + location.y;
  }

  function calculateActiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + window.const.MAIN_PIN_POINTER_COORDINATES.x),
      y: Math.round(mapPinMain.offsetTop + window.const.MAIN_PIN_POINTER_COORDINATES.y)
    };
  }

  function setActiveAddress() {
    var location = calculateActiveMainPinCoordinates();
    addressInput.value = location.x + ', ' + location.y;
  }

  function onSuccess(similarAdArray) {
    window.backend.setSimilarAdArray(similarAdArray);
    window.control.setDisplayedSimilarAds(similarAdArray);
    window.pin.createSimilarAds(similarAdArray);
    window.control.setDisabledFilters(false);
  }

  function setFirstActive() {
    if (!window.control.getMapFirstInteraction()) {
      window.control.setActive();
      window.backend.loadSimilarAd(onSuccess, window.control.onError);
    }
  }

  function checkMapBorder(position, axis) {
    var checkedPosition = axis === 'x' ? MapBorder.LEFT : MapBorder.TOP;
    if (position < checkedPosition) {
      position = checkedPosition;
    }
    checkedPosition = axis === 'x' ? MapBorder.RIGHT : MapBorder.BOTTOM;
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

  window.control.setInactive();
  setInactiveAddress();
})();
