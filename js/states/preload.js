var isGameLoaded, loadingBall, loadingText, logo, startgame;

function start() {

    game.load.image('ballerlogo', 'assets/ballerlogo.png');
    game.load.image('startbutton', 'assets/startbutton.png');
    game.load.image('ball', 'assets/ball.png', 400, 400);
    game.load.image('player', 'assets/player.png', 400, 400);
    game.load.image('gameogre', 'assets/gameogre.png', 500, 256);
    game.load.image('select_level', 'assets/select_level.png');
    game.load.image('options', 'assets/options.png');
    game.load.image('getready', 'assets/get_ready.png');
    game.load.image('youwin', 'assets/you_win.png');
    game.load.image('respawn', 'assets/respawn.png');
    game.load.image('red_ball', 'assets/red_ball.png');
    game.load.image('green_ball', 'assets/green_ball.png');
    game.load.image('blue_ball', 'assets/blue_ball.png');
    game.load.image('squishy', 'assets/squishy.png');
    game.load.image('bouncy', 'assets/bouncy.png');
    game.load.image('hardcore', 'assets/hardcore.png');
    game.load.image('set_level', 'assets/set_level.png');
    game.load.image('sense_high', 'assets/sense_high.png');
    game.load.image('sense_medium', 'assets/sense_medium.png');
    game.load.image('sense_low', 'assets/sense_low.png');
    game.load.image('sensitivity', 'assets/sensitivity.png');
    game.load.image('back_button', 'assets/back_button.png');
    game.load.audio('bounce', ['assets/bounce_1.ogg', 'assets/bounce_1.m4a']);
    game.load.audio('death', ['assets/death_1.ogg', 'assets/death_1.m4a']);
    game.load.audio('eat', ['assets/eat_1.ogg', 'assets/eat_1.m4a']);
    game.load.audio('win', ['assets/win_1.ogg', 'assets/win_1.m4a']);
    game.load.start();

}

function loadStart() {

  //bouncing ball animation

    isGameLoaded = false;

    loadingBall = game.add.sprite(centerx, centery, 'loading');
    loadingBall.anchor.setTo(0.5,0.5);
    loadingBall.animations.add('bounce');
    loadingBall.animations.play('bounce', 9, true);

    loadingText = game.add.sprite(centerx - 15, centery + 130, 'loading_text');
    loadingText.scale.setTo(0.5, 0.5);
    loadingText.anchor.setTo(0.5, 0.5);
    loadingText.animations.add('textDotDotDot');
    loadingText.animations.play('textDotDotDot', 2, true);
}

function loadComplete() {

    isGameLoaded = true;


    //logo and start button to be faded in after 1 second

    game.time.events.add(1000, (function() {

        logo = game.add.sprite(centerx, centery - 50, 'ballerlogo');
        logo.anchor.setTo(0.5,0.5);
        logo.scale.setTo(0.55,0.55);
        logo.alpha = 0;
        game.add.tween(logo).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);

        startgame = game.add.sprite(centerx, centery + 250, 'startbutton');
        startgame.anchor.setTo(0.5,0.5);
        startgame.scale.setTo(0.65,0.65);
        startgame.alpha = 0;
        game.add.tween(startgame).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);

    }), this);

    //fade out the old loading animation

    game.add.tween(loadingBall).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);
    game.add.tween(loadingText).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);



}

function Preload() {}

Preload.prototype = {
  preload: function() {
    // load all game assets
    // images, spritesheets, atlases, audio etc..

    //listening for load events

    game.load.onLoadStart.add(loadStart, this);
    game.load.onLoadComplete.add(loadComplete, this);

    start();

  },
  create: function() {

  },

  update: function() {

    function fadeOutStartScreen() {

        var logo_animation = game.add.tween(logo);
        logo_animation.to({ x: centerx, y: oneThirdHeight }, 1000, Phaser.Easing.Quadratic.InOut, true);

        startgame.destroy();

        var logo_scale = game.add.tween(logo.scale);
        logo_scale.to({x: 0.4, y: 0.4}, 1000, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() {
            this.game.state.start('main_menu');
        });
    }

    if (game.input.mousePointer.isDown && isGameLoaded)
    {
        fadeOutStartScreen();
    }

    else if (game.input.pointer1.isDown && isGameLoaded) {
        fadeOutStartScreen();
    }
  }
};