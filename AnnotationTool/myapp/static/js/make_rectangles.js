var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var image = document.getElementById('preview');
var rectPoints = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
};
var firstPointClicked = false;


canvas.addEventListener('click', function(event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  if (!firstPointClicked) {  
    context.clearRect(0, 0, canvas.width, canvas.height); 
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    rectPoints.x1 = mouseX;
    rectPoints.y1 = mouseY;
    firstPointClicked = true;
  } else {
    rectPoints.x2 = mouseX;
    rectPoints.y2 = mouseY;
    context.clearRect(0, 0, canvas.width, canvas.height); 
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.rect(rectPoints.x1, rectPoints.y1, rectPoints.x2 - rectPoints.x1, rectPoints.y2 - rectPoints.y1);
    context.stroke();
    firstPointClicked = false;
  }
});


function updateImage() {
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}