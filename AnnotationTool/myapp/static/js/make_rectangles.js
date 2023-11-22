var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var image = document.getElementById('preview');
var tagInput = document.getElementById('tagInput');

let labels = [];
let tagsWithCoordinates = [];

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

  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  
  if (!firstPointClicked) {  
    rectPoints.x1 = mouseX;
    rectPoints.y1 = mouseY;
    firstPointClicked = true;
  } else {
    rectPoints.x2 = mouseX;
    rectPoints.y2 = mouseY;
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.rect(rectPoints.x1, rectPoints.y1, rectPoints.x2 - rectPoints.x1, rectPoints.y2 - rectPoints.y1);
    context.stroke();
    firstPointClicked = false;

    context.font = '30px Arial';
    context.fillStyle = 'red';
    var xBoxText = rectPoints.x1 < rectPoints.x2 ? rectPoints.x1 + 30 : rectPoints.x2 + 30;
    var yBoxText = rectPoints.y1 < rectPoints.y2 ? rectPoints.y1 + 30 : rectPoints.y2 + 30;
    var labelToAdd = {'text':tagInput.value, 'xPosition':xBoxText, 'yPosition':yBoxText};
    labels.push(labelToAdd);

    let taggerToAdd = {'tag':tagInput.value,'coordinates':[rectPoints.x1,rectPoints.y1,rectPoints.x2,rectPoints.y2]};
    tagsWithCoordinates.push(taggerToAdd);
  }

  for (var i = 0; i < labels.length; i++) {
    var currentObject = labels[i];
    var textValue = currentObject.text;
    var xPositionValue = currentObject.xPosition;
    var yPositionValue = currentObject.yPosition;
    context.fillText(textValue, xPositionValue, yPositionValue);
  }
  
});


function updateImage() {
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}