var ax = 0, ay = 0,
vx = 0, vy = 0, windowx = window.innerWidth,
windowy = window.innerHeight, centerx = windowx / 2,
centery = windowy / 2;

var lastTime = new Date().getTime();

window.ondevicemotion = function(e) {
  ax = e.accelerationIncludingGravity.x * 90; //acceleration along x axis
  ay = e.accelerationIncludingGravity.y * -90; //acceleration along y axis
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
  game.load.image('ball', 'assets/ball.svg')
    //load ball.svg
  game.stage.backgroundColor = '#FFFFFF'

  },


  create: function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  ball = game.add.sprite(centerx, centery, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);

  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    ball.body.acceleration.setTo(ax,ay)
  }

};

// Initialize Phaser, and start our 'main' state
var game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');
game.state.add('main', main);
game.state.start('main');