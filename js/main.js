var app = app || {};

app.init = function(){
  console.log("init to quit");
}

window.onload = app.init  //no jQuery so we jsut use vanilla
