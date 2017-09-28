var width = window.innerWidth;
var height = window.innerHeight;
var dots = [];

var colours = ['rgba(109,224,242,1)', 'rgba(221,204,168,1)', 'rgba(249,168,54,1)','rgba(255,114,196,1)','rgba(139,64,169,1)'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setup() {
  createCanvas( window.innerWidth , window.innerHeight);
  for (var x = 0; x < width; x += 50){
    for (var y = 0; y < height; y += 50){
      var dotColour = colours[getRandomInt(0,4)];

      dots.push({x,y,dotColour});
      beginShape();
      ellipse(x, y, 4, 4);
      noStroke();
      endShape();
    }
  }
}


function draw() {
  var counter = 0;
  for (var x = 0; x < width; x += 50){
    for (var y = 0; y < height; y += 50){
      beginShape();
      fill( dots[counter].dotColour );
      noStroke();
      ellipse(x, y, 4, 4);
      endShape();
      counter++;
    }
  }
}

setTimeout(function(){
  console.log(dots[20]);
},5000);

document.addEventListener("mousemove", reDraw);

function reDraw(e){
 clear();
 beginShape();

  for (var i=0; i < dots.length; i++ ){
    if ( Math.sqrt((e.pageX-dots[i].x)*(e.pageX-dots[i].x) + (e.pageY-dots[i].y)*(e.pageY-dots[i].y)) < 85 ){
   stroke(dots[i].dotColour); line(dots[i].x,dots[i].y,e.pageX,e.pageY);
    }
  }
  endShape();
}
