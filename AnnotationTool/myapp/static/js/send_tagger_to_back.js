function sendDataToBackend() {
  console.log('in send data function');
  const imageInput = document.getElementById('imageInput');
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
  } else {
      console.error('No file selected.');
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}