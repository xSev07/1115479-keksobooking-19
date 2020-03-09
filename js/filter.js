'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var type = filtersForm.querySelector('#housing-type');

  type.addEventListener('change', function () {
    var similarAdArray = window.control.getSimilarAdArray()
      // .slice()
      .filter(function (element) {
        console.log(element.offer.type, type.value, element.offer.type === type.value);
        if (element.offer.type === type.value) console.dir(element);
        return element.offer.type === type.value;
      });
    window.card.closeSimilarAdCard();
    window.pin.deleteSimilarAds();
    window.pin.createSimilarAds(similarAdArray);
  });
})();
