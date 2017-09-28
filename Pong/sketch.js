// global variables our entire game needs
var player;
var enemy;
var ball;
var playerScore;
var enemyScore;

/*
* setup() is called at start ONCE.
*
* We can set up our global variables to be the values
* we need them to be at the start of the game.
*/
function setup() {
    createCanvas(window.innerWidth, 500);

    enemy = new Enemy();
    player = new Player();
    ball = new Ball();

    playerScore = 0;
    enemyScore = 0;
}

/*
* draw() is called each frame. Use it to update each object then draw each object.
*/
function draw() {
    clear(); // erases prevouis drawing
    background(0);

    ball.update();
    player.update();
    enemy.update();

    player.draw();
    enemy.draw();
    ball.draw();

    // displaying score
    textSize(32);
    fill(255);
    text(playerScore, (width / 2) - 80, 50);
    text(enemyScore, (width / 2) + 80, 50);
}

/*
* Ball() creates a new ball object.
*/
function Ball() {
    this.size = 20;
    this.x = (width / 2) - 10;
    this.y = (height / 2) - 10;
    this.moving = false;
    this.gameInPlay = true;
    this.xVel = 4;
    this.yVel = 4;

    /*
    * Ball.update() updates the ball by moving it, bouncing it
    * or giving score.
    */
    this.update = function() {
        /*
        * the ball is not moving by default. this lets us choose a
        * random direction for the ball to move at the start.
        */
        if (!this.moving) {
            var outcome = random();
            if (outcome > 0.5) {
                this.xVel = -this.xVel;
            }
            outcome = random();
            if (outcome > 0.5) {
                this.yVel = -this.yVel;
            }

            this.moving = true;
        }

        if (this.gameInPlay) {
            /*
            * Collisions with each side of the game canvas.
            */
            if (this.y > height - 10) {
                this.y = height - 10;
                this.yVel = -this.yVel;
            }
            if (this.y < 0) {
                this.y = 0;
                this.yVel = -this.yVel;
            }
            if (this.x > width - 10) {
                this.x = width - 10;
                this.gameInPlay = false;
                playerScore++;
            }
            if (this.x < 0) {
                this.x = (width / 2) - 10;
                this.gameInPlay = false;
                enemyScore++;
            }

            /*
            * Collision with player
            */
            if (this.x < player.x + 15 && this.x + this.size > player.x && this.y < player.y + 70 && this.size + this.y > player.y) {
                this.x = player.x + 30;
                this.xVel -= 3;
                this.xVel = -this.xVel;
            }

            /*
            * Collision with enemy
            */
            if (this.x < enemy.x + 15 && this.x + this.size > enemy.x && this.y < enemy.y + 70 && this.size + this.y > enemy.y) {
                this.x = enemy.x - this.size;
                this.xVel += 3;
                this.xVel = -this.xVel;
            }

            /*
            * moving the ball
            */
            this.x += this.xVel;
            this.y += this.yVel;
        }

        /*
        * When a point is scored, we need to reset the game
        */
        else {
            this.x = (width / 2) - 10;
            this.y = (height / 2) - 10;
            this.moving = false;
            this.gameInPlay = true;
            this.xVel = 4;
            this.yVel = 4;
            enemy.speed = 5;
        }
    }

    /*
    * drawing the ball
    */
    this.draw = function() {
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }
}

/*
* Enemy() creates a new enemy object
*/
function Enemy() {
    this.x = width - 35;
    this.y = height / 2;
    this.w = 15;
    this.h = 70;
    this.speed = 8;

    /*
    * Enemy.update() updates the enemy by moving it up or
    * down in relation to the balls position.
    */
    this.update = function() {
        if (ball.x > width / 2) {
            if (ball.y < this.y + 35) {
                this.y -= this.speed;
            }
            if (ball.y > this.y + 35) {
                this.y += this.speed;
            }
        }
    }

    /*
    * drawing the enemy
    */
    this.draw = function() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}

/*
* Player() creates a new player object
*/
function Player() {
    this.x = 20;
    this.y = height / 2;
    this.w = 15;
    this.h = 70;

    /*
    * Player.update() will move the player up or
    * down in relation to the mouseY position.
    */
    this.update = function() {
        this.y = mouseY;
    }

    /*
    * draws the player
    */
    this.draw = function() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}
