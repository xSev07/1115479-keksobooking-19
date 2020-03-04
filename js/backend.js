'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL2 = "https://js.dump.academy/keksobooking";
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  function loadSimilarAd(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL);
    xhr.send();
  }

  function saveAd(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function() {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL2);
    xhr.send(data);

  }

  window.backend = {
    loadSimilarAd: loadSimilarAd,
    saveAd: saveAd
  };
})();
