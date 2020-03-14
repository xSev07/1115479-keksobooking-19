'use strict';

(function () {
  var RoomCapacity = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    HUNDRED: 100
  };
  var ErrorMessage = {
    ONLY_NOT_FOR_GUESTS: 'Для выбранного количества комнат можно выбрать только "не для гостей"',
    NOT_FOR_GUESTS: 'Выбранное количество комнат не может быть "не для гостей"',
    TOO_MANY_GUESTS: 'Количество гостей не может быть больше количества комнат'
  };

  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('#address');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var typeInput = adForm.querySelector('#type');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  function validateRoomsAndCapacity() {
    var selectedRooms = parseInt(roomNumberInput.value, 10);
    var selectedCapacity = parseInt(capacityInput.value, 10);
    var errorMessage = '';
    switch (selectedRooms) {
      case RoomCapacity.HUNDRED:
        if (selectedCapacity > 0) {
          errorMessage = ErrorMessage.ONLY_NOT_FOR_GUESTS;
        }
        break;
      case RoomCapacity.ONE:
      case RoomCapacity.TWO:
      case RoomCapacity.THREE:
      default:
        if (selectedCapacity === 0) {
          errorMessage = ErrorMessage.NOT_FOR_GUESTS;
        } else if (selectedRooms < selectedCapacity) {
          errorMessage = ErrorMessage.TOO_MANY_GUESTS;
        }
    }
    capacityInput.setCustomValidity(errorMessage);
  }

  function validateForm() {
    validateRoomsAndCapacity();
  }

  function onSuccess() {
    var successElement = successTemplate.cloneNode(true);
    window.control.setInactive();
    window.control.showMessage(successElement);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    addressInput.removeAttribute('disabled');
    window.backend.saveAd(new FormData(adForm), onSuccess, window.control.onError);
    addressInput.setAttribute('disabled', 'true');
  }

  function onFormReset(evt) {
    evt.preventDefault();
    window.control.setInactive();
  }

  typeInput.addEventListener('change', function () {
    window.control.setMinPrice();
  });

  timeInInput.addEventListener('change', function () {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', function () {
    timeInInput.value = timeOutInput.value;
  });

  adFormSubmit.addEventListener('click', function () {
    validateForm();
  });

  adForm.addEventListener('submit', onFormSubmit);
  adFormReset.addEventListener('click', function (evt) {
    window.util.isMouseMainButtonEvent(evt, onFormReset);
  });
})();
