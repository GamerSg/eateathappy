function noPreview() {
  $('#preview-img').attr('src', 'image/user.png');
}

function selectImage(e) {
  $('#file').css("color", "green");
  $('#image-preview-div').css("display", "block");
  $('#preview-img').attr('src', e.target.result);
  $('#preview-img').css('max-width', '200px');
}

function doLogin() {
  $.post("login", $('#loginForm').serialize())
    .fail(function () {
      $('#msg').show();
      $('#msg').html("Login failed");
    })
    .done(function (data) {
      if (data === 'invalid') {
        $('#msg').show();
        $('#msg').html("Invalid Username/Password");
      }
      else if(data === 'success')
      {
        location.href = 'index.html';
      }
    });

  return false;
}

function submitRegister() {
  if ($('#pwd').val() != $('#pwd2').val()) {
    $('#pwd').trigger('focus');
    $('#msg').show();
    $('#msg').html("Passwords do not match!");
    return false;
  }
  $.post("register", $('#registerForm').serialize())
    .fail(function () {
      $('#msg').show();
      $('#msg').html("Registration failed");
    })
    .done(function () {
      $('#registerForm').hide();
      $('#msg').hide();
      $('#msg2').show();
      $('#msg2').html("Registration Successful, You can <a href='login.html'>Login here</a> now");
    });

  return false;
}

$(document).ready(function (e) {

  var maxsize = 500 * 1024; // 500 KB
  $('#upload-image-form').on('submit', function (e) {

    e.preventDefault();

    $('#message').empty();

  });

  $('#profPic').on("change", function () {

    $('#message').empty();

    var file = this.files[0];
    var match = ["image/jpeg", "image/png", "image/jpg"];

    if (!((file.type == match[0]) || (file.type == match[1]) || (file.type == match[2]))) {
      noPreview();

      $('#message').html('<div class="text-danger">Invalid image format. Allowed formats: JPG, JPEG, PNG.</div>');

      return false;
    }

    if (file.size > maxsize) {
      noPreview();

      $('#message').html('<div>The size of image you are attempting to upload is ' + (file.size / 1024).toFixed(2) + ' KB, maximum size allowed is ' + (maxsize / 1024).toFixed(2) + ' KB</div>');

      return false;
    }

    var reader = new FileReader();
    reader.onload = selectImage;
    reader.readAsDataURL(this.files[0]);

  });

});