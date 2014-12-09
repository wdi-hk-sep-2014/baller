var windowx = window.innerWidth,
windowy = window.innerHeight, centerx = windowx / 2,
centery = windowy / 2;

function Game() {}

Game.prototype = {
  start: function() {
    var game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');

    game.state.add('boot', Boot);
    game.state.start('boot');
  }
};