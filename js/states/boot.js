var windowx = window.innerWidth,
windowy = window.innerHeight,
screenRatio = windowx / windowy,
centerx = windowx / 2,
centery = windowy / 2;

var gameOrientated = false;
var deviceMultiplier; //this compensates for differences in reported accelerometer values across iOS and android

var SENSITIVITIES = {
  'sense_high': 500,
  'sense_medium': 400,
  'sense_low': 300
};

var cursors;

var inputSensitivity = SENSITIVITIES['sense_medium'];

function Boot() {}

Boot.prototype = {

  init: function() {

    if (game.device.desktop === false) {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.forceOrientation(false, true);

    //setting up callbacks to manage orientation

    game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
    game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

    }

    deviceMultiplier = game.device.android ? -1 : 1;

  },

  enterIncorrectOrientation: function () {

        gameOrientated = false;

        //pause game
        game.paused = true;

        document.getElementById('info').style.display = 'block';
        document.getElementById('ballerDiv').style.display = 'none';
        // document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        gameOrientated = true;

        //resume game
        game.paused = false;

        document.getElementById('ballerDiv').style.display = 'block';
        document.getElementById('info').style.display = 'none';


    },

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

