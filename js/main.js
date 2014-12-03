var ax = 0, ay = 0;

if (window.DeviceMotionEvent != undefined) {
window.ondevicemotion = function(e) {
    ax = event.accelerationIncludingGravity.x * 100; //acceleration along x axis
    ay = event.accelerationIncludingGravity.y * -100; //acceleration along y axis
  };
}

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
  ball = game.add.sprite(250, 250, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.body.velocity.setTo(0,0);



  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
  ball.body.velocity.setTo(ax,ay);
  },

};

// Initialize Phaser, and start our 'main' state
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'ballerDiv');
game.state.add('main', main);
game.state.start('main');