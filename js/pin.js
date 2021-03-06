'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  function calculatePinCoordinates(location) {
    return {
      x: location.x - PIN_WIDTH / 2,
      y: location.y - PIN_HEIGHT
    };
  }

  function renderAd(ad, index) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('data-index', index);
    var pinCoordinates = calculatePinCoordinates(ad.location);
    pinElement.style = 'left: ' + pinCoordinates.x + 'px; top: ' + pinCoordinates.y + 'px';
    var pinImage = pinElement.querySelector('img');
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    return pinElement;
  }

  function createSimilarAdFragment(ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (element, i) {
      fragment.appendChild(renderAd(element, i));
    });
    return fragment;
  }

  function createSimilarAds() {
    var similarAdArray = window.control.getDisplayedSimilarAds();
    var fragment = createSimilarAdFragment(similarAdArray);
    mapPins.appendChild(fragment);
  }

  function deleteSimilarAds() {
    var pins = Array.from(mapPins.querySelectorAll('.map__pin'));
    pins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        mapPins.removeChild(element);
      }
    });
  }

  function redrawPins(similarAds) {
    window.card.closeSimilarAdCard();
    deleteSimilarAds();
    window.control.setDisplayedSimilarAds(similarAds);
    createSimilarAds();
  }

  window.pin = {
    createSimilarAds: createSimilarAds,
    deleteSimilarAds: deleteSimilarAds,
    redrawPins: redrawPins
  };
})();
