'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var ERROR_MESSAGE_ONLY_NOT_FOR_GUESTS = 'Для выбранного количества комнат можно выбрать только "не для гостей"';
  var ERROR_MESSAGE_NOT_FOR_GUESTS = 'Выбранное количество комнат не может быть "не для гостей"';
  var ERROR_MESSAGE_TOO_MANY_GUESTS = 'Количество гостей не может быть больше количества комнат';

  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var addressInput = adForm.querySelector('#address');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  function validateRoomsAndCapacity() {
    var selectedRooms = parseInt(roomNumberInput.value, 10);
    var selectedCapacity = parseInt(capacityInput.value, 10);
    var errorMessage = '';
    switch (selectedRooms) {
      case 100:
        if (selectedCapacity > 0) {
          errorMessage = ERROR_MESSAGE_ONLY_NOT_FOR_GUESTS;
        }
        break;
      case 1:
      case 2:
      case 3:
      default:
        if (selectedCapacity === 0) {
          errorMessage = ERROR_MESSAGE_NOT_FOR_GUESTS;
        } else if (selectedRooms < selectedCapacity) {
          errorMessage = ERROR_MESSAGE_TOO_MANY_GUESTS;
        }
    }
    capacityInput.setCustomValidity(errorMessage);
  }

  function formValidation() {
    validateRoomsAndCapacity();
  }

  typeInput.addEventListener('change', function () {
    var minValue = MIN_PRICE_BUNGALO;
    switch (typeInput.value) {
      case 'flat':
        minValue = MIN_PRICE_FLAT;
        break;
      case 'house':
        minValue = MIN_PRICE_HOUSE;
        break;
      case 'palace':
        minValue = MIN_PRICE_PALACE;
        break;
    }
    priceInput.setAttribute('min', minValue);
    priceInput.setAttribute('placeholder', minValue);
  });

  timeInInput.addEventListener('change', function () {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', function () {
    timeInInput.value = timeOutInput.value;
  });

  adFormSubmit.addEventListener('click', function () {
    formValidation();
  });

  adForm.addEventListener('submit', function () {
    addressInput.removeAttribute('disabled');
  });
})();
