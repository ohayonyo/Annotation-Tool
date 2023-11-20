      function previewImage(event) {
        var input = event.target;
        var preview = document.getElementById('preview');
        var previewContainer = document.getElementById('imagePreview');

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                previewContainer.style.display = 'block';
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            preview.src = '';
            previewContainer.style.display = 'none';
        }
    }
