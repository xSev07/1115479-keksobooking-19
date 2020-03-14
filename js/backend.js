'use strict';

(function () {
  var URLS = {
    similarAdsDownload: 'https://js.dump.academy/keksobooking/data',
    adUpload: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT_IN_MS = 10000;
  var SendMethod = {
    GET: 'GET',
    POST: 'POST'
  }
  var StatusCode = {
    OK: 200
  };

  var similarAdsArray = [];

  function getSimilarAdsArray() {
    return similarAdsArray;
  }

  function setSimilarAdArray(array) {
    similarAdsArray = array;
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
    xhr.open(SendMethod.GET, URLS.similarAdsDownload);
    xhr.send();
  }

  function saveAd(data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open(SendMethod.POST, URLS.adUpload);
    xhr.send(data);

  }

  window.backend = {
    loadSimilarAd: loadSimilarAd,
    setSimilarAdArray: setSimilarAdArray,
    getSimilarAdsArray: getSimilarAdsArray,
    saveAd: saveAd
  };
})();
