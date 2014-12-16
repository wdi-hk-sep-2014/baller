function MainMenuState() {}

var oneThirdHeight = windowy / 3;


MainMenuState.prototype = {
  create: function() {

    // initializing the logo again and animating it.

    var logo = game.add.sprite(centerx, centery - 50, 'ballerlogo');
    logo.anchor.setTo(0.5,0.5);
    logo.scale.setTo(0.55,0.55);

    var logo_animation = game.add.tween(logo);
    logo_animation.to({ x: centerx, y: oneThirdHeight }, 1000, Phaser.Easing.Quadratic.InOut);
    logo_animation.start();

    var logo_scale = game.add.tween(logo.scale);
    logo_scale.to({x: 0.4, y: 0.4}, 1000, Phaser.Easing.Quadratic.InOut, true);
    logo_scale.start();


    // assigning relative logo position to a variable for easy access

    var logoPositionX = logo.position.x;
    var logoPositionY = logo.position.y;


    // creating the menu options, credits to mddub

    var menuOptions = [
      {name: 'select_level', yOffset: 120},
      {name: 'options', yOffset: 220},
    ];

    var menuSprites = {}; // to be filled with menu sprite objects

    menuOptions.forEach(
      function(option) {
        var sprite = game.add.sprite(logoPositionX, logoPositionY + option.yOffset, option.name);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.3);
        sprite.alpha = 0;
        sprite.inputEnabled = true;
        game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000);
        menuSprites[option.name] = sprite;
      });

    function selectLevel() {
      game.add.tween(menuSprites.select_level).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(menuSprites.options).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(logo).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(menuSprites.options).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function(){
        this.game.state.start('level_master');
        }, this);
    }

    menuSprites.select_level.events.onInputDown.add(selectLevel, this);

    // actually, make it go to levelLoader

  },


};