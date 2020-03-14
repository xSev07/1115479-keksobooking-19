'use strict';

(function () {
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAX_DISPLAYED_AD = 5;

  var minPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var displayedSimilarAds = [];
  var mapFirstInteraction = false;

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var filters = Array.from(filtersForm.children);
  var adForm = document.querySelector('.ad-form');
  var fieldsets = Array.from(document.querySelectorAll('fieldset'));
  var addressInput = adForm.querySelector('#address');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  function getDisplayedSimilarAds() {
    return displayedSimilarAds;
  }

  function setDisplayedSimilarAds(array) {
    displayedSimilarAds = [];
    var displayedAd = Math.min(array.length, MAX_DISPLAYED_AD);
    for (var i = 0; i < displayedAd; i++) {
      displayedSimilarAds.push(array[i]);
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

  function setDisabledFilters(value) {
    setArrayDisabled(filters, value);
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

  function setMinPrice() {
    var minValue = minPriceMap[typeInput.value];
    priceInput.setAttribute('min', minValue);
    priceInput.setAttribute('placeholder', minValue);
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
    setDisabledFilters(true);
    setMinPrice();
    window.photo.setDefaultImages();
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
    setDisabledFilters: setDisabledFilters,
    getMapFirstInteraction: getMapFirstInteraction,
    getDisplayedSimilarAds: getDisplayedSimilarAds,
    setDisplayedSimilarAds: setDisplayedSimilarAds,
    setMinPrice: setMinPrice,
    onError: onError,
    showMessage: showMessage
  };
})();
