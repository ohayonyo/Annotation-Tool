const SCREEN_RATIO = 0.7;

function convertPointToTheNewScreen(newScreenWidth, newScreenHeight,x,y){
  return [(newScreenWidth/uploadImageScreen_width)*x,(newScreenHeight/uploadImageScreen_height)*y];
}


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
      throw error; // Re-throw the error to maintain consistency in error handling.
    });
}

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
      imgElement.classList.add('canvas-overlay');
      canvasContainer.appendChild(imgElement);
      imageListContainer.appendChild(imageListItem);

      // Set canvas size to match the image size
      canvasElement.width = imgElement.width;
      canvasElement.height = imgElement.height;

      const ctx = canvasElement.getContext('2d');
      
      const borderWidth = 2; // Set the width of the red border

      // Draw an empty rectangle with red border on the canvas
      ctx.strokeStyle = 'red';
      ctx.lineWidth = borderWidth;
      // ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);


      getTagsOfImage(image.image_index)
  .then(imageTags => {
    if (Array.isArray(imageTags)) {
      console.log('imageTags',imageTags)
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

    
      // const loadImageTagsUrl = 'http://127.0.0.1:8000/myapp/get_image_tags_service/?image_index=' + image.image_index;

      // console.log('image_index:', image.image_index);

  });
}
const currentUrl = window.location.href;
const urlParts = currentUrl.split('/');
const username = urlParts[3];

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


  