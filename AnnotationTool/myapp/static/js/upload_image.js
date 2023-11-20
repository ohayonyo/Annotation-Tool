function previewImage(event) {
    var input = event.target;
    var reader = new FileReader();
  
    reader.onload = function(){
      image.src = reader.result;
    };
    image.onload = function() {
      context.clearRect(0, 0, canvas.width, canvas.height); 
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
  
      if (firstPointClicked) {
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.rect(rectPoints.x1, rectPoints.y1, rectPoints.x2 - rectPoints.x1, rectPoints.y2 - rectPoints.y1);
        context.stroke();
      }
    };
  
  
    reader.readAsDataURL(input.files[0]);
    document.getElementById('imagePreview').style.display = 'block';
  }

