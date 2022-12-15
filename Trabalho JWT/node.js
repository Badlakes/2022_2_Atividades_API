const jwt = require("jsonwebtoken");
const restify = require('restify');


const servinho = restify.createServer({
    name : 'api_jwt' ,
    version : '1.0.0'
});

servinho.listen(8002, function(){
  console.log("%s executando em %s", servidor.name, servidor.url);
} );



// Set the secret key for signing the JWT
var JWT_SECRET = "my-secret-key";

// Get references to the data and JWT forms
var dataForm = document.getElementById("data-form");
var jwtForm = document.getElementById("jwt-form");

// Handle the data form submit event
dataForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // Get the data from the form
  var username = dataForm.username.value;
  var email = dataForm.email.value;

  // Construct the data object to encode in the JWT
  var data = {
    username: username,
    email: email
  };

  // Encode the data into a JWT and display it
  var jwt = encodeJWT(data, JWT_SECRET);
  var divconvert = document.getElementById("convert");
  divconvert.innerHTML = "Your JWT is: " + jwt;
});

// Handle the JWT form submit event
jwtForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // Get the JWT from the form
  var jwt = jwtForm.jwt.value;

  // Decode the JWT and display the data it contains
  var data = decodeJWT(jwt, JWT_SECRET);
  var divrevert = document.getElementById("revert");
  divrevert.innerHTML = "Your data is: " + JSON.stringify(data);
});