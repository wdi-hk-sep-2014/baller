function Game() {
}

Game.prototype = {
  start: function() {
    game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');
    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('main_menu', MainMenuState);
    game.state.add('level_master', LevelMasterState);
    game.state.add('level_round', LevelRoundState);
    game.state.add('options', optionsState);
    game.state.start('boot');

  }
};