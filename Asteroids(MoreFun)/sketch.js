var ship; // Défini la variable du vaisseau
var asteroids = [];
var lasers = [];
var pause = false;
var info = '';


function setup() {
  createCanvas(windowWidth, windowHeight-5);
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  if(pause) {
    noLoop();
  }

  background(0);

  if (keyIsDown(RIGHT_ARROW)) {
    ship.setRotation(0.1);
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.setRotation(-0.1);
  }

  if (keyIsDown(UP_ARROW)) {
    ship.boosting(true);
  }

  if (keyIsDown('32')) {
    lasers.push(new Laser(ship.pos, ship.heading));
  }


  for (var i = lasers.length-1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length-1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  textSize(16);
  fill(255, 0, 0);
  text(info, 10, 30);

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      pause = true;
      ship.destroy()
      info = 'GAME OVER, PRESS R TO RESTART';
      console.log('ooops !');
      asteroids= [];
      break;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

// function keyPressed() {
//   if (key == ' '){
//     lasers.push(new Laser(ship.pos, ship.heading));
//   }
// }


function keyTyped() {
  if ((key === 'R' || key === 'r')  &&  pause == true) {
    pause = false;
    ship = new Ship();
    asteroids = [];
    for (var i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }
    info = '';
    loop();
  }
}
