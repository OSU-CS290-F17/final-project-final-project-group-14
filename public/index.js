function login () {
  var username = document.getElementById('username').value.trim();

  if(!username) {
    alert("Enter a username."); //Maybe make a better error message?
  } else {
    var getRequest = new XMLHttpRequest();
    var getURL = "/accountPage/" + username;
    getRequest.open('GET', getURL);

    //add error handleing

    getRequest.send();
  }
}

function signUp() {
  var username = document.getElementById('username').value.trim();
  var address = document.getElementById('address').value.trim();

  if(!username || !address) {
    alert("Enter all fields");
  } else {
    var request = new XMLHttpRequest();
    var postURL = "/newAccount/" + username;
    request.open('POST', postURL);

    //this object will be changed to correspond with the database
    var userObj = {
      username: username,
      address: address
    };
    var requestBody = JSON.stringify(userObj);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function(event) {
      if(event.target.status !== 200) {
        alert("Error storing photo in database:\n\n\n" + event.target.response);
      } else {
        var getURL = "/signIn";
        request.open('GET', getURL);
        request.send();
      }
    });

    request.send();
  }
}

document.addEventListener('DOMContentLoaded', function () {

  var loginButton = document.getElementById('login');
  if(loginButton) {loginButton.addEventListener('click', login); }

  var signUpButton = document.getElementById('sign-up');
  if(signUpButton) { signUpButton.addEventListener('click', signUp) }

});
