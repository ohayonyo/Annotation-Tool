const SCREEN_RATIO = 0.7;


function getTagsOfImage(image_index) {
  const loadImageTagsUrl = 'http://127.0.0.1:8000/myapp/get_image_tags_service/?image_index=' + image_index;

  return fetch(loadImageTagsUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const image_tags = data.image_tags;
      return image_tags;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error; 
    });
}

function renderUserImages(images) {
  const imageListContainer = document.getElementById('imageList');

  images.forEach(image => {
    const elementDiv = document.createElement('div');
    elementDiv.style.display = 'flex'; 
    elementDiv.style.alignItems = 'center'; 

    const imageListItem = document.createElement('div');
    imageListItem.classList.add('image-list-item');
    imageListItem.style.marginRight = '40px'; 


    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('canvas-container');
    imageListItem.appendChild(canvasContainer);

    const canvasElement = document.createElement('canvas');
    canvasContainer.appendChild(canvasElement);

    const imgElement = document.createElement('img');
    imgElement.src = 'data:image/png;base64,' + image.image;
    imgElement.classList.add('canvas-overlay');
    canvasContainer.appendChild(imgElement);

    elementDiv.appendChild(imageListItem); 

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
      </svg>
      Delete
    `;
    elementDiv.appendChild(deleteButton); 

    imageListContainer.appendChild(elementDiv);
    
      canvasElement.width = imgElement.width;
      canvasElement.height = imgElement.height;

      const ctx = canvasElement.getContext('2d');
      
      const borderWidth = 2; 
      ctx.strokeStyle = 'red';
      ctx.lineWidth = borderWidth;

      getTagsOfImage(image.image_index)
  .then(imageTags => {
    if (Array.isArray(imageTags)) {
      imageTags.forEach(tag => {
        const rectWidth = Math.abs(tag.x2_coordinate - tag.x1_coordinate)*SCREEN_RATIO;
        const rectHeight = Math.abs(tag.y2_coordinate - tag.y1_coordinate)*SCREEN_RATIO;
        const rectX = tag.x1_coordinate*SCREEN_RATIO; 
        const rectY = tag.y1_coordinate*SCREEN_RATIO; 
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

        ctx.font = '21px Arial';
        ctx.fillStyle = 'red';
        const xBoxText = tag.x1_coordinate < tag.x2_coordinate ? (tag.x1_coordinate + 30) * SCREEN_RATIO : (tag.x2_coordinate + 30) * SCREEN_RATIO;
        const yBoxText = tag.y1_coordinate < tag.y2_coordinate ? (tag.y1_coordinate + 30) * SCREEN_RATIO : (tag.y2_coordinate + 30) * SCREEN_RATIO;
        ctx.fillText(tag.tag_name, xBoxText, yBoxText);


      });
    } else {
      console.log('Error fetching image tags. The response is not an array.');
    }
  })
  .catch(error => {
    console.error('Error in the main function:', error);
  });

  });
}
const currentUrl2 = window.location.href;
const urlParts2 = currentUrl2.split('/');
const username = urlParts2[3];

const loadImagesUrl = 'http://127.0.0.1:8000/myapp/get_images_of_user_service/?username=' + username;

fetch(loadImagesUrl)
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
