var windowx = window.innerWidth,
windowy = window.innerHeight,
screenRatio = windowx / windowy,
centerx = windowx / 2,
centery = windowy / 2;

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
    // this.game.state.start('preload');

    game.input.addPointer();
    cursors = game.input.keyboard.createCursorKeys();

    var loadingBall = game.add.sprite(centerx, centery, 'loading');
    loadingBall.anchor.setTo(0.5,0.5);
    loadingBall.animations.add('bounce');
    loadingBall.animations.play('bounce', 9, true);

    var loadingText = game.add.sprite(centerx - 15, centery + 130, 'loading_text');
    loadingText.scale.setTo(0.5, 0.5);
    loadingText.anchor.setTo(0.5, 0.5);
    loadingText.animations.add('textDotDotDot');
    loadingText.animations.play('textDotDotDot', 2, true);
  },

  update: function() {

  }
};

