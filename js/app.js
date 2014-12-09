function Game() {}

Game.prototype = {
  start: function() {
    game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');

    game.state.add('boot', Boot);
    game.state.start('boot');
  }
};