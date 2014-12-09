var windowx = window.innerWidth,
windowy = window.innerHeight,
screenRatio = windowx / windowy,
centerx = windowx / 2,
centery = windowy / 2;
logoWidth = windowx * 0.3;
logoHeight = logoWidth * (9/16);

function Boot() {}

Boot.prototype = {

  preload: function() {
    game.load.image('ballerlogo', '../assets/ballerlogo.png', 1200, 728);
    //load preloader assets
  },

  create: function() {
    //setup game environment
    //scale, input etc...
    // this.game.state.start('preload');
    game.stage.backgroundColor = '#FFFFFF';
    test = game.add.sprite(centerx, centery, 'ballerlogo');
    test.anchor.setTo(0.5,0.5);
  }
};
