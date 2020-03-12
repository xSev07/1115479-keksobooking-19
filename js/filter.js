'use strict';

(function () {
  var ANY_TYPE = 'any';
  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var filtersForm = document.querySelector('.map__filters');
  var type = filtersForm.querySelector('#housing-type');
  var price = filtersForm.querySelector('#housing-price');
  var rooms = filtersForm.querySelector('#housing-rooms');
  var guests = filtersForm.querySelector('#housing-guests');
  var features = filtersForm.querySelectorAll('.map__checkbox');

  function compareFields(selectedValue, offerValue) {
    return selectedValue === ANY_TYPE ? true : selectedValue === offerValue;
  }

  function comparePrice(offerValue) {
    switch (price.value) {
      case PriceType.LOW:
        return offerValue < 10000;
      case PriceType.MIDDLE:
        return offerValue >= 10000 && offerValue < 50000;
      case PriceType.HIGH:
        return offerValue >= 50000;
      default:
        return true;
    }
  }

  function compareFeatures(elementFeatures) {
    var result = true;
    for (var i = 0; i < features.length; i++) {
      result = features[i].checked ? elementFeatures.indexOf(features[i].value) !== -1 : true;
      if (!result) {
        break;
      }
    }
    return result;
  }

  function filterAd() {
    var filteredAds = window.backend.getSimilarAdArray()
      .filter(function (element) {
        return compareFields(type.value, element.offer.type)
          && compareFields(rooms.value, element.offer.rooms.toString())
          && compareFields(guests.value, element.offer.guests.toString())
          && comparePrice(element.offer.price)
          && compareFeatures(element.offer.features);
      });
    window.pin.redrawPins(filteredAds);
  }

  filtersForm.addEventListener('change', function () {
    window.debounce(filterAd);
  });
})();
