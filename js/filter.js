'use strict';

(function () {
  var ANY_TYPE = 'any';
  var filtersForm = document.querySelector('.map__filters');
  // var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var type = filtersForm.querySelector('#housing-type');
  var price = filtersForm.querySelector('#housing-price');
  var rooms = filtersForm.querySelector('#housing-rooms');
  var guests = filtersForm.querySelector('#housing-guests');

  function compare(selectedValue, offerValue) {
    return selectedValue === ANY_TYPE ? true : selectedValue === offerValue;
  }

  type.addEventListener('change', function () {
    var similarAds = window.backend.getSimilarAdArray()
      .filter(function (element) {
        return compare(type.value, element.offer.type);
      });
    window.control.redrawPins(similarAds);
  });

  price.addEventListener('change', function () {
    var similarAds = window.backend.getSimilarAdArray()
      .filter(function (element) {
        switch (price.value) {
          case 'low':
            return element.offer.price < 10000;
          break;
          case 'middle':
            return element.offer.price >= 10000 && element.offer.price < 50000;
          break;
          case 'high':
            return element.offer.price >= 50000;
          break;
        default:
          return true;
        }
      });
    window.control.redrawPins(similarAds);
  });

  rooms.addEventListener('change', function () {
    var similarAds = window.backend.getSimilarAdArray()
      .filter(function (element) {
        return compare(rooms.value, element.offer.rooms.toString());
      });
    window.control.redrawPins(similarAds);
  });

  guests.addEventListener('change', function () {
    var similarAds = window.backend.getSimilarAdArray()
      .filter(function (element) {
        return compare(guests.value, element.offer.guests.toString());
      });
    window.control.redrawPins(similarAds);
  });
})();
