let currentUrl = window.location.href;
let urlParts = currentUrl.split('/');
let url = 'http://127.0.0.1:8000/'+urlParts[3];

function changeUserUrlPage(userPath){
  console.log('in changeUserUrlPage');
  url = url + userPath;
  console.log('url=',url);
  window.location.href = url;
}

var homeButton = document.getElementById('homeButton');
var aboutButton = document.getElementById('aboutButton');
if(homeButton && aboutButton){
  homeButton.setAttribute('href' , url+'/home');
  aboutButton.setAttribute('href' , url+'/home');
}


console.log('hello there!')