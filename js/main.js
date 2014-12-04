var ax = 0, ay = 0,
vx = 0, vy = 0, windowx = window.innerWidth,
windowy = window.innerHeight, centerx = windowx / 2,
centery = windowy / 2;

var lastTime = new Date().getTime();

window.ondevicemotion = function(e) {
  ax = e.accelerationIncludingGravity.x * 300; //acceleration along x axis
  ay = e.accelerationIncludingGravity.y * -300; //acceleration along y axis
  vx = vx + ax;
  vy = vy + ay;
  var now = new Date().getTime();
  document.getElementById('info').innerHTML = 1000 / (now - lastTime);
  lastTime = now;
};

var main = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets
  game.load.image('ball', 'assets/ball.png', 400, 400);
  game.stage.backgroundColor = '#FFFFFF';

  },


  create: function() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  //this is the player ball
  playerBall = game.add.sprite(centerx, centery, 'ball');
  game.physics.enable(playerBall, Phaser.Physics.ARCADE);
  playerBall.body.collideWorldBounds = true;
  playerBall.body.checkCollision = true;
  playerBall.body.bounce.set(0.8);
  playerBall.scale.setTo(0.5,0.5);

  //adding an enemy ball to test collision
  enemyBall = game.add.sprite(centerx, centery / 2, 'ball');
  game.physics.enable(enemyBall, Phaser.Physics.ARCADE);
  enemyBall.scale.setTo(0.2,0.2);
  enemyBall.body.checkCollision = true;
  enemyBall.body.bounce.set(1,1);
  enemyBall.body.immovable = true;


  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    playerBall.body.acceleration.setTo(ax,ay);
    game.physics.arcade.collide(playerBall, enemyBall);
  }

};

// Initialize Phaser, and start our 'main' state
var game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');
game.state.add('main', main);
game.state.start('main');