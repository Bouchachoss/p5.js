// var bgcolor;
//
// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.pos.add(this.vel);
  }
  this.render = function() {
    push();
    // bgcolor = getRandomColor();
    stroke(255);
    strokeWeight(6);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      console.log('Hit !');
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    } else {
      return false;
    }
  }
}
