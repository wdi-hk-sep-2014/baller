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
    logo_scale.to({x: 0.4, y: 0.4}, 1000, Phaser.Easing.Quadratic.InOut, true);
    logo_scale.start();


    // assigning relative logo position to a variable for easy access

    var logoPositionX = logo.position.x;
    var logoPositionY = logo.position.y;


    // creating the menu options, credits to mddub

    var menuOptions = [
      {name: 'single', yOffset: 120},
      {name: 'multi', yOffset: 220},
      {name: 'options', yOffset: 320}
    ];

    var menuSprites = {};

    menuOptions.forEach(
      function(option) {
        var sprite = game.add.sprite(logoPositionX, logoPositionY + option.yOffset, option.name);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.3);
        sprite.alpha = 0;
        game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);

      });


  },

};