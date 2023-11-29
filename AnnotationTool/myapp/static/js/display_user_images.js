// function renderUserImages2(images) {
//   const imageListContainer = document.getElementById('imageList');

//   images.forEach(image => {
//       const imageListItem = document.createElement('div');
//       imageListItem.className = 'image-list-item';

//       const imgElement = document.createElement('img');
//       imgElement.src = 'data:image/png;base64,' + image.image;  

//       imageListItem.appendChild(imgElement);
//       imageListContainer.appendChild(imageListItem);
//   });
// }

function renderUserImages(images) {
  const imageListContainer = document.getElementById('imageList');

  images.forEach(image => {
      const imageListItem = document.createElement('div');
      imageListItem.classList.add('image-list-item');

      const canvasContainer = document.createElement('div');
      canvasContainer.classList.add('canvas-container');
      imageListItem.appendChild(canvasContainer);

      const canvasElement = document.createElement('canvas');
      canvasContainer.appendChild(canvasElement);

      const imgElement = document.createElement('img');
      imgElement.src = 'data:image/png;base64,' + image.image;  
      imgElement.classList.add('canvas-overlay')
      canvasContainer.appendChild(imgElement);
      imageListContainer.appendChild(imageListItem);
  });
}

const currentUrl = window.location.href;
const urlParts = currentUrl.split('/');
const username = urlParts[3];

const apiUrl = 'http://127.0.0.1:8000/myapp/get_images_of_user_service/?username=' + username;

fetch(apiUrl)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      const images = data.images;
      renderUserImages(images);
  })
  .catch(error => {
      console.error('Error fetching images:', error);
  });


  