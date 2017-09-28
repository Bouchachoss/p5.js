var screenW = window.innerWidth,
    screenH = window.innerHeight;
var ball = undefined;
var diameter = 6;
var maxSnowBalls = 260;
var GRAVITY = 1;
var balls = [];


/*----------------------------------- Ball -----------------------------------*/
//Constructor()
/**
 * Ball constructor
 *
 * @param posX {number} the X position in the view
 * @param posY {Number} the Y position in the view
 * @param diameter {Number} Ball diameter
 *
 */
function Ball(posX, posY, dimater){
  this.posX = posX;
  this.posY = posY;
  this.dimaterX = dimater;
  this.dimaterY = dimater;
  this.force = Math.random().toFixed(3)*2;
  this.angle = 0;
  //this.breakLine = screenH / Math.random()*11;
}

Ball.prototype = {

  //show the element
  show: function(){
    ellipse(this.posX, this.posY, this.dimaterX,this.dimaterY);
  },

  //gravity force
  gravity: function(){
    var yForce = (this.force * GRAVITY);
    if (yForce<1){yForce = 1;}

    this.posY += yForce;

    if (this.posY > (screenW/3)) {
      this.dimaterY += .01;
      this.diameterX += this.angle;
      this.force += .02;
    }
  },

  //simulate wind with the angle
  wind: function(){
    this.posX += this.angle;
  }

};

/**
 * Check one by one snowballs are out of the canvas then remove it from the array
 * and create a new snowball
 */
function isFallen(checkBall, arrPos){
  if (
    (checkBall.posY > screenH) ||
    (checkBall.posX > screenW) ||
    (checkBall.posX < 0)
  ) {
    balls.splice(arrPos, 1);
    ball = new Ball(
      (Math.random()*screenW),
      0,
      (Math.random()*diameter)
    );
    ball.angle = angle();
    balls.push(ball);
  }
}

/**
 * Assing the falling angle of the snowball
 *
 * @return {Number} angle of falling
 */
function angle(){
  var angle = (Math.random().toFixed(2)*8) /10;
  var isNegative = Math.random().toFixed(1);

  if (isNegative > .5) {
    angle = -angle;
  }

  return angle;
}

/*----------------------------------- Setup ----------------------------------*/
function setup(){
  createCanvas(screenW,screenH, '2d');
  frameRate(40);
  for(var i = 0; i < maxSnowBalls; i++){
    ball = new Ball(
      (Math.random()*screenW),
      (Math.random()*screenH),
      (Math.random()*diameter)
    );
    ball.angle = angle();
    balls.push(ball);
  }
} 

/*----------------------------------- Draw -----------------------------------*/
function draw() {
  background(0);

  for(var i = 0; i < balls.length; i++){
    balls[i].gravity();
    balls[i].wind();
    isFallen(balls[i], i);
  }

  fill(200, 200, 200);
  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
  }

}
