'use strict';

(function () {
  var MAP_BORDER = {
    top: window.const.MAP_START_Y - window.const.MAIN_PIN_POINTER_COORDINATES.y,
    right: window.const.MAP_FINISH_X - window.const.MAIN_PIN_POINTER_COORDINATES.x,
    bottom: window.const.MAP_FINISH_Y - window.const.MAIN_PIN_POINTER_COORDINATES.y,
    left: window.const.MAP_START_X - window.const.MAIN_PIN_POINTER_COORDINATES.x
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
    debugger;
    window.control.setActive();
    window.control.setSimilarAdArray(similarAdArray);
    window.pin.createSimilarAds(similarAdArray);
  }

  function setFirstActive() {
    if (!window.control.getMapFirstInteraction()) {
      window.backend.loadSimilarAd(onSuccess, window.control.onError);
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

  window.control.setInactive();
  setInactiveAddress();
})();
