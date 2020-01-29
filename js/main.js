var map = document.querySelector('.map');

var COUNT_SIMILAR_AD = 8;
var MAP_START_X = 0;
var MAP_FINISH_X = map.clientWidth;
var MAP_START_Y = 130;
var MAP_FINISH_Y = 630;
var avatars = [];

function createSimilarAd() {
  var address = generateAddress();
  return {
    author: {
      avatar: getAvatar()
    },
    offer: {
      title: 'заголовок',
      address: address.x + ', ' + address.y,
      price: 0,
      type: 'palace',
      rooms: 1,
      guests: 1,
      checkin: '12:00',
      checkout: '12:00',
      features: [],
      description: '',
      photos: []
    },
    location: {
      x: address.x,
      y: address.y
    }
  };
}

function getAvatar() {
  var src = getArrayRandomElement(avatars);
  var index = avatars.indexOf(src);
  avatars.splice(index, 1);
  return address;
}

function generateAddress() {
  return {
    x: getRandomNumberInRange(MAP_START_X, MAP_FINISH_X),
    y: getRandomNumberInRange(MAP_START_Y, MAP_FINISH_Y)
  }
}

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (+max - +min) + +min);
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

fillAvatars();
var test = createSimilarAd();
console.dir(test);
debugger;
