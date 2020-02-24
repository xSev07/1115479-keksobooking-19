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
      setActiveAddress();
      window.pin.createSimilarAds();
    }
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMouseMainButtonEvent(evt, setFirstActive);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setFirstActive);
  });

  setInactive();
  setInactiveAddress();
})();
