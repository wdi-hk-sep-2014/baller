Preload.prototype = {
  preload: function() {
    // load all game assets
    // images, spritesheets, atlases, audio etc..
  },
  create: function() {
    this.game.state.start('main-intro');
  }
};