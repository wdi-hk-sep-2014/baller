function Boot() {};

Boot.prototype = {

  preload: function() {
    //load preloader assets
    game.load.image('gameogre', 'assets/gameogre.png', 500, 256);
  },

  create: function() {
    //setup game environment
    //scale, input etc...
    // this.game.state.start('preload');
  }
};
