'use strict';

(function () {
  var MIN_PRICE = 3000;
  var MAX_PRICE = 10000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 4;
  var MIN_FEATURES = 0;
  var MIN_PHOTOS = 0;
  var MAX_PHOTOS = 3;
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

  var similarAdArray = [];
  var avatars = [];

  function generateAddress() {
    return {
      x: window.util.getRandomNumberInRange(window.const.MAP_START_X, window.const.MAP_FINISH_X),
      y: window.util.getRandomNumberInRange(window.const.MAP_START_Y, window.const.MAP_FINISH_Y)
    };
  }

  function getAvatar() {
    return window.util.cutArrayElement(avatars);
  }

  function createFeaturesArray() {
    var countFeatures = window.util.getRandomNumberInRange(MIN_FEATURES, ENUM_FEATURES.length);
    var features = [];
    var copyEnumFeatures = ENUM_FEATURES.slice();
    for (var i = 0; i < countFeatures; i++) {
      features.push(window.util.cutArrayElement(copyEnumFeatures));
    }
    return features;
  }

  function generatePhotosArray() {
    var photos = [];
    var countPhotos = window.util.getRandomNumberInRange(MIN_PHOTOS, MAX_PHOTOS);
    for (var i = 1; i <= countPhotos; i++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
    }
    return photos;
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
        price: window.util.getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
        type: window.util.getArrayRandomElement(ENUM_TYPES),
        rooms: window.util.getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
        guests: window.util.getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
        checkin: window.util.getArrayRandomElement(ENUM_TIMES),
        checkout: window.util.getArrayRandomElement(ENUM_TIMES),
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

  function fillAvatars() {
    for (var i = 1; i <= window.const.COUNT_SIMILAR_AD; i++) {
      avatars.push('img/avatars/user' + (i < 10 ? '0' : '') + i + '.png');
    }
  }

  function generateSimilarAdArray() {
    fillAvatars();
    similarAdArray = [];
    for (var i = 0; i < window.const.COUNT_SIMILAR_AD; i++) {
      similarAdArray.push(createSimilarAd());
    }
    return similarAdArray;
  }

  function getSimilarAdArray() {
    return similarAdArray;
  }

  window.data = {
    generateSimilarAdArray: generateSimilarAdArray,
    getSimilarAdArray: getSimilarAdArray
  };
})();
