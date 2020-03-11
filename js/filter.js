'use strict';

(function () {
  var ANY_TYPE = 'any';
  var filtersForm = document.querySelector('.map__filters');
  // var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var type = filtersForm.querySelector('#housing-type');

  type.addEventListener('change', function () {
    var similarAds = window.backend.getSimilarAdArray()
    .filter(function (element) {
      // return type.value !== ANY_TYPE ? element.offer.type === type.value : true;
      //
      // ////////////
      //
      // var result = true;
      // if (type.value !== ANY_TYPE) {
      //   result = element.offer.type === type.value;
      // }
      // return result;
      //
      // ////////
      if (type.value !== ANY_TYPE) {
        return element.offer.type === type.value;
      } else {
        return true;
      }
    });
    window.card.closeSimilarAdCard();
    window.pin.deleteSimilarAds();
    window.control.setDisplayedSimilarAd(similarAds);
    window.pin.createSimilarAds();
  });
})();
