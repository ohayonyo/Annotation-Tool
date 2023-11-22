function sendDataToBackend() {
  console.log('in send data function');
  const imageInput = document.getElementById('imageInput');
  const tagInput = document.getElementById('tagInput');
  const file = imageInput.files[0];

  if (file) {
      const points = {
        point1: { x: rectPoints.x1, y: rectPoints.y1 },
        point2: { x: rectPoints.x2, y: rectPoints.y2 }
      };

      const formData = new FormData();
      const blob = new Blob([file], { type: file.type }); 

      formData.append('image', blob);
      formData.append('points', JSON.stringify(points));
      formData.append('tagged', tagInput.value);
      formData.append('tagsWithCoordinates', JSON.stringify(tagsWithCoordinates));
  
      const csrfToken = getCookie('csrftoken');

      fetch('http://127.0.0.1:8000/myapp/save_image_tagger/', {
          method: 'POST',
          body: formData,
          headers: {
              'X-CSRFToken': csrfToken,
          },
      })
      .then(response => response.json())
      .then(data => {
          console.log('Data saved:', data);
         
      })
      .catch(error => {
          console.error('Error:', error);
      });
      clearCanvas();
      tagInput.value='';
  } else {
      console.error('No file selected.');
  }
}

function resetInputValue(inputId) {
  var inputElement = document.getElementById(inputId);
  if (inputElement) {
      inputElement.value = '';
  } 
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function clearCanvas() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  resetFileInput();
}

function resetFileInput() {
  var originalInput = document.getElementById('imageInput');
  var newInput = document.createElement('input');

  Array.from(originalInput.attributes).forEach(attr => {
    newInput.setAttribute(attr.name, attr.value);
  });
  originalInput.parentNode.replaceChild(newInput, originalInput);
}