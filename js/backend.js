'use strict';

(function () {
  var makeXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
    xhr.timeout = 10000;

    return xhr;
  };

  var onRequestError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-node');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    document.body.addEventListener('click', function () {
      document.body.removeChild(node);
    });
  };

  window.backend = {
    load: function (onSuccess, onError, url) {
      var xhr = makeXHR(onSuccess, onError);
      xhr.open('GET', url);
      xhr.send();
    },
    save: function (data, onSuccess, onError, url) {
      var xhr = makeXHR(onSuccess, onError, url);
      xhr.open('POST', url);
      xhr.send(data);
    },
    onRequestError: onRequestError
  };
})();
