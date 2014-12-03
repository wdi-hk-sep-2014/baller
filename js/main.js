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
  var ball = game.add.sprite(250, 250, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.velocity.setTo(300,200);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);



  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
  },

};

// Initialize Phaser, and start our 'main' state
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'ballerDiv');
game.state.add('main', main);
game.state.start('main');