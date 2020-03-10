'use strict';

(function () {
  var URLS = {
    similarAdsDownload: 'https://js.dump.academy/keksobooking/data',
    adUpload: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };
  var similarAdArray = [];

  function getSimilarAdArray() {
    return similarAdArray;
  }

  function setSimilarAdArray(array) {
    similarAdArray = array;
  }

  function createXHR(onSuccess, onError) {
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
    return xhr;
  }

  function loadSimilarAd(onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', URLS.similarAdsDownload);
    xhr.send();
  }

  function saveAd(data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', URLS.adUpload);
    xhr.send(data);

  }

  window.backend = {
    loadSimilarAd: loadSimilarAd,
    setSimilarAdArray: setSimilarAdArray,
    getSimilarAdArray: getSimilarAdArray,
    saveAd: saveAd
  };
})();
