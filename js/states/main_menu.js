function MainMenuState() {}

var oneThirdHeight = windowy / 3;


MainMenuState.prototype = {
  create: function() {

    // initializing the logo again and animating it.

    var logo = game.add.sprite(centerx, centery - 50, 'ballerlogo');
    logo.anchor.setTo(0.5,0.5);
    logo.scale.setTo(0.55,0.55);

    var logo_animation = game.add.tween(logo);
    logo_animation.to({ x: centerx, y: windowy / 3 }, 1000, Phaser.Easing.Quadratic.InOut);
    logo_animation.start();

    var logo_scale = game.add.tween(logo.scale);
    logo_scale.to({x: 0.4, y: 0.4}, 1000, Phaser.Easing.Quadratic.InOut);
    logo_scale.start();


    // assigning relative logo position to a variable for easy access

    var logoPositionX = logo.position.x;
    var logoPositionY = logo.position.y;


    // creating the menu options


    var singlePlayer = game.add.sprite(logoPositionX, logoPositionY + 120, 'single');
    singlePlayer.anchor.setTo(0.5, 0.5);
    singlePlayer.scale.setTo(0.3);
    singlePlayer.alpha = 0;

    var  multiPlayer = game.add.sprite(logoPositionX, logoPositionY + 220, 'multi');
    multiPlayer.anchor.setTo(0.5, 0.5);
    multiPlayer.scale.setTo(0.3);
    multiPlayer.alpha = 0;

    var  options = game.add.sprite(logoPositionX, logoPositionY + 320, 'options');
    options.anchor.setTo(0.5, 0.5);
    options.scale.setTo(0.3);
    options.alpha = 0;

    var singleAnimation = game.add.tween(singlePlayer);
    var multiAnimation = game.add.tween(multiPlayer);
    var optionAnimation = game.add.tween(options);

    singleAnimation.to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, false, 1000);
    singleAnimation.start();

    multiAnimation.to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, false, 1000);
    multiAnimation.start();

    optionAnimation.to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, false, 1000);
    optionAnimation.start();

    // todo: refactoring



  },

};