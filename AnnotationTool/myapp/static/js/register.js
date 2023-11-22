function register() {
  var username = document.getElementsByName("username")[0].value;
  var password = document.getElementsByName("password")[0].value;

  if (username.trim() === '' || password.trim() === '') {
    alert('Please enter both username and password');
    return;
  }

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  console.log('username',username)
  console.log('password',password)

  var csrfToken = getCookie('csrftoken');

  console.log('csrf',csrfToken)
  fetch('http://127.0.0.1:8000/myapp/register_user/', {
    method: 'POST',
    body: formData,
    headers: {
      'X-CSRFToken': csrfToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data saved:', data);
      window.location.href = "http://127.0.0.1:8000/login";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}