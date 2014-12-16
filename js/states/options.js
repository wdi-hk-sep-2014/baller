function optionsState() {}

var optionsTitle, testBall, testCollisionGroup, backButton;
var inputSensitivity = 400;

function sensitivityTest() {
  testBall = game.add.sprite(game.width - 50, game.height - 50, 'player');
  testBall.scale.setTo(playerScale, playerScale);
  game.physics.p2.enable(testBall);
  testBall.body.setCollisionGroup(testCollisionGroup);
}

optionsState.prototype = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.95;
    testCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    sensitivityTest();

    backButton = game.add.sprite(100, game.height - 100, 'back_button');
    backButton.anchor.setTo(0.5,0.5);
    backButton.scale.setTo(0.3,0.3);
    backButton.alpha = 0;
    backButton.inputEnabled = true;
    backButtonAnimation = game.add.tween(backButton).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 2000);

    var optionsTitle = game.add.sprite(centerx, oneThirdHeight, 'sensitivity');
    optionsTitle.anchor.setTo(0.5,0.5);
    optionsTitle.scale.setTo(0.5,0.5);
    optionsTitle.alpha = 0;
    optionsTitleAnimation = game.add.tween(optionsTitle).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true);

    var sensitivityOptions = [
      {name: 'sense_high', yOffset: 120},
      {name: 'sense_medium', yOffset: 250},
      {name: 'sense_low', yOffset: 380}
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

    sensitivitySprites.sense_medium.scale.setTo(0.5,0.5);
    // have some rotten code here. Will refactor.

    function highSensitivity() {
      inputSensitivity = 500;
      game.add.tween(sensitivitySprites.sense_high.scale).to({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(sensitivitySprites.sense_medium.scale).to({x: 0.3, y: 0.3}, 500, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(sensitivitySprites.sense_low.scale).to({x: 0.3, y: 0.3}, 500, Phaser.Easing.Quadratic.InOut, true);
      return;
    }
    function mediumSensitivity() {
      inputSensitivity = 400;
      game.add.tween(sensitivitySprites.sense_high.scale).to({x: 0.3, y: 0.3}, 500, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(sensitivitySprites.sense_medium.scale).to({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(sensitivitySprites.sense_low.scale).to({x: 0.3, y: 0.3}, 500, Phaser.Easing.Quadratic.InOut, true);
      return;
    }
    function lowSensitivity() {
      inputSensitivity = 300;
      game.add.tween(sensitivitySprites.sense_high.scale).to({x: 0.3, y: 0.3}, 500, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(sensitivitySprites.sense_medium.scale).to({x: 0.3, y: 0.3}, 500, Phaser.Easing.Quadratic.InOut, true);
      game.add.tween(sensitivitySprites.sense_low.scale).to({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.InOut, true);
      return;
    }

    sensitivitySprites.sense_high.events.onInputDown.add(highSensitivity, this);
    sensitivitySprites.sense_medium.events.onInputDown.add(mediumSensitivity, this);
    sensitivitySprites.sense_low.events.onInputDown.add(lowSensitivity, this);

    function backToMenu() {
      this.game.state.start('main_menu');
    }

    backButton.events.onInputDown.add(backToMenu, this);

  },

  update: function() {
    testBall.body.force.x = ax;
    testBall.body.force.y = ay;
  }
};

