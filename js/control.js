'use strict';

(function () {
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAX_DISPLAYED_AD = 5;

  var displayedSimilarAd = [];
  var mapFirstInteraction = false;

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var filters = Array.from(filtersForm.children);
  var adForm = document.querySelector('.ad-form');
  var fieldsets = Array.from(document.querySelectorAll('fieldset'));
  var addressInput = adForm.querySelector('#address');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  function getDisplayedSimilarAd() {
    return displayedSimilarAd;
  }

  function setDisplayedSimilarAd(array) {
    displayedSimilarAd = [];
    var displayedAd = Math.min(array.length, MAX_DISPLAYED_AD);
    for (var i = 0; i < displayedAd; i++) {
      displayedSimilarAd.push(array[i]);
    }
  }

  function getMapFirstInteraction() {
    return mapFirstInteraction;
  }

  function calculateInactiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + window.const.MAIN_PIN_POINTER_COORDINATES.x),
      y: Math.round(mapPinMain.offsetTop + window.const.MAIN_PIN_POINTER_COORDINATES.yCenter)
    };
  }

  function calculateActiveMainPinCoordinates() {
    return {
      x: Math.round(mapPinMain.offsetLeft + window.const.MAIN_PIN_POINTER_COORDINATES.x),
      y: Math.round(mapPinMain.offsetTop + window.const.MAIN_PIN_POINTER_COORDINATES.y)
    };
  }

  function resetMainPin() {
    mapPinMain.style.left = MAIN_PIN_START_X + 'px';
    mapPinMain.style.top = MAIN_PIN_START_Y + 'px';
    if (mapFirstInteraction) {
      calculateInactiveMainPinCoordinates();
    } else {
      calculateActiveMainPinCoordinates();
    }
  }

  function setArrayDisabled(array, value) {
    array.forEach(function (element) {
      element.disabled = value;
    });
  }

  function setActiveFilters() {
    setArrayDisabled(filters, false);
  }

  function setInactiveFilters() {
    setArrayDisabled(filters, true);
  }

  function setInactiveAddress() {
    var location = calculateInactiveMainPinCoordinates();
    addressInput.value = location.x + ', ' + location.y;
  }

  function setActive() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setArrayDisabled(fieldsets, false);
    mapFirstInteraction = true;
  }

  function setInactive() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setArrayDisabled(fieldsets, true);
    setArrayDisabled(filters, true);
    mapFirstInteraction = false;
    adForm.reset();
    filtersForm.reset();
    window.pin.deleteSimilarAds();
    window.card.closeSimilarAdCard();
    resetMainPin();
    setInactiveAddress();
    setInactiveFilters();
  }

  function showMessage(element, elementButton, message) {
    if (message) {
      element.querySelector('p[class$="__message"]').textContent = message;
    }

    function messageClose() {
      main.removeChild(element);
      document.removeEventListener('keydown', onPopupEscPress);
    }

    function onPopupEscPress(evt) {
      window.util.isEscEvent(evt, messageClose);
    }

    if (elementButton) {
      elementButton.addEventListener('click', function (evt) {
        window.util.isMouseMainButtonEvent(evt, messageClose);
      });
    }

    element.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'DIV') {
        window.util.isMouseMainButtonEvent(evt, messageClose);
      }
    });

    document.addEventListener('keydown', onPopupEscPress);

    main.insertAdjacentElement('afterbegin', element);
  }

  function onError(errorMessage) {
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('.error__button');
    showMessage(error, errorButton, errorMessage);
  }

  window.control = {
    setActive: setActive,
    setInactive: setInactive,
    setActiveFilters: setActiveFilters,
    getMapFirstInteraction: getMapFirstInteraction,
    getDisplayedSimilarAd: getDisplayedSimilarAd,
    setDisplayedSimilarAd: setDisplayedSimilarAd,
    onError: onError,
    showMessage: showMessage
  };
})();
