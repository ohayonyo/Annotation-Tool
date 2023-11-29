function renderUserImages(images) {
  const imageListContainer = document.getElementById('imageList');

  images.forEach(image => {
      const imageListItem = document.createElement('div');
      imageListItem.className = 'image-list-item';

      const imgElement = document.createElement('img');
      imgElement.src = 'data:image/png;base64,' + image.image;  

      imageListItem.appendChild(imgElement);
      imageListContainer.appendChild(imageListItem);
  });
}

const username = 'yoad';
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