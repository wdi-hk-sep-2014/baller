var main = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets
  game.load.image('ball', 'assets/ball.svg')
    //load ball.svg
  },

  create: function() {

  ball = game.add.sprite(250, 250, 'ball');

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