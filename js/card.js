'use strict';

(function () {
  var typeDescriptionMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var openSimilarAd;

  var mapPins = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function renderFeatures(cardElement, ad) {
    var features = cardElement.querySelector('.popup__features');
    if (ad.offer.features.length === 0) {
      cardElement.removeChild(features);
    } else {
      var feature = features.querySelector('.popup__feature--wifi');
      feature.classList.remove('popup__feature--wifi');
      features.innerHTML = '';
      var fragment = document.createDocumentFragment();
      ad.offer.features.forEach(function (element) {
        var featureElement = feature.cloneNode();
        featureElement.classList.add(getFeatureClass(element));
        fragment.appendChild(featureElement);
      });
      features.appendChild(fragment);
    }
  }

  function renderPhotos(cardElement, ad) {
    var photos = cardElement.querySelector('.popup__photos');
    if (ad.offer.photos.length === 0) {
      cardElement.removeChild(photos);
    } else {
      var photo = cardElement.querySelector('.popup__photo');
      photos.innerHTML = '';
      var fragment = document.createDocumentFragment();
      ad.offer.photos.forEach(function (element) {
        var photoElement = photo.cloneNode();
        photoElement.src = element;
        fragment.appendChild(photoElement);
      });
      photos.appendChild(fragment);
    }
  }

  function getFeatureClass(feature) {
    return 'popup__feature--' + feature;
  }

  function renderCard(adIndex) {
    var similarAdArray = window.control.getDisplayedSimilarAds();
    var ad = similarAdArray[adIndex];
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeDescriptionMap[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    renderFeatures(cardElement, ad);
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    renderPhotos(cardElement, ad);
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    mapFiltersContainer.after(cardElement);
    return cardElement;
  }

  function closeSimilarAdCard() {
    if (openSimilarAd) {
      openSimilarAd.parentNode.removeChild(openSimilarAd);
      document.removeEventListener('keydown', onEscSimilarAdClick);
      openSimilarAd = null;
    }
  }

  function onEscSimilarAdClick(evt) {
    window.util.isEscEvent(evt, closeSimilarAdCard);
  }

  function openSimilarAdCard(adIndex) {
    if (openSimilarAd) {
      closeSimilarAdCard();
    }
    openSimilarAd = renderCard(adIndex);
    var popupClose = openSimilarAd.querySelector('.popup__close');
    popupClose.addEventListener('click', function (evt) {
      window.util.isMouseMainButtonEvent(evt, closeSimilarAdCard);
    });
    document.addEventListener('keydown', onEscSimilarAdClick);
  }

  function checkSimilarAdClickTarget(evt) {
    var targetElement = evt.target;
    if (evt.target.tagName === 'IMG') {
      targetElement = evt.target.offsetParent;
    }
    if (targetElement.className === 'map__pin') {
      var similarAdIndex = parseInt(targetElement.getAttribute('data-index'), 10);
      openSimilarAdCard(similarAdIndex);
    }
  }

  function onSimilarAdClick(evt) {
    window.util.isMouseMainButtonEvent(evt, checkSimilarAdClickTarget);
  }

  mapPins.addEventListener('click', onSimilarAdClick);

  window.card = {
    closeSimilarAdCard: closeSimilarAdCard
  };

})();
