'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo img');
  var avatarDefault = avatarPreview.src;
  var photoDefault = photoPreview.src;

  function setDefaultImages() {
    avatarPreview.src = avatarDefault;
    photoPreview.src = photoDefault;
  }

  function addImage(file, preview) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  avatarChooser.addEventListener('change', function () {
    addImage(avatarChooser.files[0], avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    addImage(photoChooser.files[0], photoPreview);
  });

  window.photo = {
    setDefaultImages: setDefaultImages
  };
})();
