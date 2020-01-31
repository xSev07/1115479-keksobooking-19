'use strict';

var map = document.querySelector('.map');

var COUNT_SIMILAR_AD = 8;
var MAP_START_X = 0;
var MAP_FINISH_X = map.clientWidth;
var MAP_START_Y = 130;
var MAP_FINISH_Y = 630;
var MIN_PRICE = 3000;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 4;
var MIN_FEATURES = 0;
var MIN_PHOTOS = 0;
var MAX_PHOTOS = 3;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ENUM_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var ENUM_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var ENUM_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var avatars = [];

var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

function generateSimilarAdArray() {
  var similarAdArray = [];
  for (var i = 0; i < COUNT_SIMILAR_AD; i++) {
    similarAdArray.push(createSimilarAd());
  }
  return similarAdArray;
}

function createSimilarAd() {
  var address = generateAddress();
  return {
    author: {
      avatar: getAvatar()
    },
    offer: {
      title: 'Не сдам, просто хвастаюсь',
      address: address.x + ', ' + address.y,
      price: getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
      type: getArrayRandomElement(ENUM_TYPES),
      rooms: getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
      checkin: getArrayRandomElement(ENUM_TIMES),
      checkout: getArrayRandomElement(ENUM_TIMES),
      features: createFeaturesArray(),
      description: 'просто решил похвастаться какой я молодец :3',
      photos: generatePhotosArray()
    },
    location: {
      x: address.x,
      y: address.y
    }
  };
}

function getAvatar() {
  return cutArrayElement(avatars);
}

function generateAddress() {
  return {
    x: getRandomNumberInRange(MAP_START_X, MAP_FINISH_X),
    y: getRandomNumberInRange(MAP_START_Y, MAP_FINISH_Y)
  };
}

function generatePhotosArray() {
  var photos = [];
  var countPhotos = getRandomNumberInRange(MIN_PHOTOS, MAX_PHOTOS);
  for (var i = 1; i <= countPhotos; i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return photos;
}

function createFeaturesArray() {
  var countFeatures = getRandomNumberInRange(MIN_FEATURES, ENUM_FEATURES.length);
  var features = [];
  var copyEnumFeatures = ENUM_FEATURES.slice();
  for (var i = 0; i < countFeatures; i++) {
    features.push(cutArrayElement(copyEnumFeatures));
  }
  return features;
}

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (+max - +min) + +min);
}

function cutArrayElement(array) {
  var element = getArrayRandomElement(array);
  var index = array.indexOf(element);
  array.splice(index, 1);
  return element;
}

function getArrayRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function fillAvatars() {
  for (var i = 1; i <= COUNT_SIMILAR_AD; i++) {
    avatars.push('img/avatars/user' + (i < 10 ? '0' : '') + i + '.png');
  }
}

function createSimilarAdFragment(ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(ads[i]));
  }
  return fragment;
}

function renderAd(ad) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinCoordinates = calculatePinCoordinates(ad.location);
  pinElement.style = 'left: ' + pinCoordinates.x + 'px; top: ' + pinCoordinates.y + 'px';
  var pinImage = pinElement.querySelector('img');
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;
  return pinElement;
}

function calculatePinCoordinates(location) {
  return {
    x: location.x - PIN_WIDTH / 2,
    y: location.y - PIN_HEIGHT
  };
}

function getTypeDescription(type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
      // break;
    case 'flat':
      return 'Квартира';
      // break;
    case 'house':
      return 'Дом';
      // break;
    case 'bungalo':
      return 'Бунгало';
      // break;
    default:
      return 'Не указано';
  }
}

function renderPhotos(cardElement, ad) {
  var photos = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__photo');
  var fragment = document.createDocumentFragment();
  photos.innerHTML = '';
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photoElement = photo.cloneNode();
    photoElement.src = ad.offer.photos[i];
    fragment.appendChild(photoElement);
  }
  photos.appendChild(fragment);
}

function renderCard(ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getTypeDescription(ad.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  // cardElement.querySelector('.popup__features').textContent = getTypeDescription(ad.offer.type);
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  renderPhotos(cardElement, ad);
  // cardElement.querySelector('.popup__photo').src = ad.offer.photos[0];


  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  mapFiltersContainer.after(cardElement);
}

fillAvatars();
var similarAdArray = generateSimilarAdArray();
mapPins.appendChild(createSimilarAdFragment(similarAdArray));
renderCard(similarAdArray[0]);
map.classList.remove('map--faded');
