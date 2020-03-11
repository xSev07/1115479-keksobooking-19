'use strict';

(function () {
  var ANY_TYPE = 'any';
  var filtersForm = document.querySelector('.map__filters');
  // var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var type = filtersForm.querySelector('#housing-type');

  type.addEventListener('change', function () {
    var similarAds = window.backend.getSimilarAdArray()
    .filter(function (element) {
      return type.value === ANY_TYPE ? true : element.offer.type === type.value;
    });
    window.card.closeSimilarAdCard();
    window.pin.deleteSimilarAds();
    window.control.setDisplayedSimilarAd(similarAds);
    window.pin.createSimilarAds();
  });
})();
