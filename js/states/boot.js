var windowx = window.innerWidth,
windowy = window.innerHeight,
screenRatio = windowx / windowy,
centerx = windowx / 2,
centery = windowy / 2;

var cursors;

function Boot() {}

Boot.prototype = {

  preload: function() {
    game.load.spritesheet('loading', 'assets/loading.png', 200, 200);
    game.load.spritesheet('loading_text', 'assets/loading_text.png', 524, 100);
    game.stage.backgroundColor = '#FFFFFF';
    //load preloader assets
  },

  create: function() {
    //setup game environment
    //scale, input etc...

    game.input.addPointer();
    cursors = game.input.keyboard.createCursorKeys();

    this.game.state.start('preload');
  },

  update: function() {

  }
};
