function noPreview() {
    $('#preview-img').attr('src', 'image/user.png');
  }
  
  function selectImage(e) {
    $('#file').css("color", "green");
    $('#image-preview-div').css("display", "block");
    $('#preview-img').attr('src', e.target.result);
    $('#preview-img').css('max-width', '200px');
  }
  
  $(document).ready(function (e) {
  
    var maxsize = 500 * 1024; // 500 KB
    $('#upload-image-form').on('submit', function(e) {
  
      e.preventDefault();
  
      $('#message').empty();
  
      $.ajax({
        url: "upload-image.php",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data)
        {
          $('#loading').hide();
          $('#message').html(data);
        }
      });
  
    });
  
    $('#profPic').change(function() {
  
      $('#message').empty();
  
      var file = this.files[0];
      var match = ["image/jpeg", "image/png", "image/jpg"];
  
      if ( !( (file.type == match[0]) || (file.type == match[1]) || (file.type == match[2]) ) )
      {
        noPreview();
  
        $('#message').html('<div class="text-danger">Invalid image format. Allowed formats: JPG, JPEG, PNG.</div>');
  
        return false;
      }
  
      if ( file.size > maxsize )
      {
        noPreview();
  
        $('#message').html('<div>The size of image you are attempting to upload is ' + (file.size/1024).toFixed(2) + ' KB, maximum size allowed is ' + (maxsize/1024).toFixed(2) + ' KB</div>');
  
        return false;
      }
  
      var reader = new FileReader();
      reader.onload = selectImage;
      reader.readAsDataURL(this.files[0]);
  
    });
  
  });