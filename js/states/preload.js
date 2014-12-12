Preload.prototype = {
  preload: function() {
    // load all game assets
    // images, spritesheets, atlases, audio etc..

    game.load.image('ballerlogo', 'assets/ballerlogo.png');
    game.load.image('startbutton', 'assets/startbutton.png');
    game.load.image('ball', 'assets/ball.png', 400, 400);
    game.load.image('player', 'assets/player.png', 400, 400);
    game.load.image('gameogre', 'assets/gameogre.png', 500, 256);
    game.load.image('single', 'assets/singleplayer.png');
    game.load.image('multi', 'assets/multiplayer.png');
    game.load.image('options', 'assets/options.png');

  },
  create: function() {
    // this.game.state.start('main-intro');

    var logo = game.add.sprite(centerx, centery - 50, 'ballerlogo');
    logo.anchor.setTo(0.5,0.5);
    logo.scale.setTo(0.55,0.55);

    var startgame = game.add.sprite(centerx, centery + 250, 'startbutton');
    startgame.anchor.setTo(0.5,0.5);
    startgame.scale.setTo(0.65,0.65);

  },

  update: function() {
    if (game.input.mousePointer.isDown)
    { this.game.state.start('main_menu');
    }

    else if (game.input.pointer1.isDown) {
      this.game.state.start('main_menu');
    }
  }
};