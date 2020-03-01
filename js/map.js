'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;
  var MAIN_PIN_POINTER_COORDINATES = {
    x: Math.round(MAIN_PIN_WIDTH / 2),
    y: Math.round(MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    yCenter: MAIN_PIN_HEIGHT / 2
  };
  var MAP_BORDER = {
    top: window.const.MAP_START_Y - MAIN_PIN_POINTER_COORDINATES.y,
    right: window.const.MAP_FINISH_X - MAIN_PIN_POINTER_COORDINATES.x,
    bottom: window.const.MAP_FINISH_Y - MAIN_PIN_POINTER_COORDINATES.y,
    left: window.const.MAP_START_X - MAIN_PIN_POINTER_COORDINATES.x
  };

  var mapFirstInteraction = false;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');

  function calculateInactiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_POINTER_COORDINATES.x),
      y: Math.round(mapPinMain.offsetTop + MAIN_PIN_POINTER_COORDINATES.yCenter)
    };
  }

  function setInactiveAddress() {
    var location = calculateInactiveMainPinCoordinates();
    addressInput.value = location.x + ', ' + location.y;
  }

  function calculateActiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_POINTER_COORDINATES.x),
      y: Math.round(mapPinMain.offsetTop + MAIN_PIN_POINTER_COORDINATES.y)
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

  function onSuccess(similarAdArray) {
    mapFirstInteraction = true;
    setActive();
    window.pin.createSimilarAds(similarAdArray);
  }

  function onError(errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__message').textContent = errorMessage;

    function errorClose() {
      main.removeChild(errorElement);
      document.removeEventListener('keydown', onPopupEscPress);
    }

    function onPopupEscPress(evt) {
      window.util.isEscEvent(evt, errorClose);
    }

    errorButton.addEventListener('click', function (evt) {
      window.util.isMouseMainButtonEvent(evt, errorClose);
    });

    errorElement.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'DIV') {
        window.util.isMouseMainButtonEvent(evt, errorClose);
      }
    });

    document.addEventListener('keydown', onPopupEscPress);

    main.insertAdjacentElement('afterbegin', errorElement);

  }

  function setFirstActive() {
    if (!mapFirstInteraction) {
      window.backend.loadSimilarAd(onSuccess, onError);
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
