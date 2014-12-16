function optionsState() {}

var inputSensitivity, optionsTitle;

optionsState.prototype = {
  create: function() {

    var optionsTitle = game.add.sprite(centerx, oneThirdHeight, 'sensitivity');
    optionsTitle.anchor.setTo(0.5,0.5);
    optionsTitle.scale.setTo(0.5,0.5);
    optionsTitle.alpha = 0;
    optionsTitleAnimation = game.add.tween(optionsTitle).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true);

    var sensitivityOptions = [
      {name: 'sense_high', yOffset: 120},
      {name: 'sense_medium', yOffset: 220},
      {name: 'sense_low', yOffset: 320}
    ];

    var sensitivitySprites = {};

    sensitivityOptions.forEach(
      function(option){
        var sprite = game.add.sprite(optionsTitle.position.x, optionsTitle.position.y + option.yOffset, option.name);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.3);
        sprite.alpha = 0;
        sprite.inputEnabled = true;
        game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000 );
        sensitivitySprites[option.name] = sprite;
    });

  }
};

