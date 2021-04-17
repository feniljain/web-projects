//console.log("Kaisan Ho!");
var h3=document.querySelector("h3");
var c1=document.querySelector(".color1");
var c2=document.querySelector(".color2");
var button=document.querySelector("button");

document.body.style.background="linear-gradient(to right, "+c1.value+", "+c2.value +")";
h3.textContent=document.body.style.background+";";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function randomGenerator()
 {
     var co1=getRandomColor();
     var co2=getRandomColor();
     document.body.style.background="linear-gradient(to right, "+co1+", "+co2 +")";
     h3.textContent=document.body.style.background+";";
 }

function colorChange()
 {
    document.body.style.background="linear-gradient(to right, "+c1.value+", "+c2.value +")";
    h3.textContent=document.body.style.background+";";
 }

button.addEventListener('click',randomGenerator);
c1.addEventListener('input', colorChange);
c2.addEventListener('input', colorChange);

