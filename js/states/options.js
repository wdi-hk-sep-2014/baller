function optionsState() {}

function createCollisionGroupAndUpdatePhysics() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  game.physics.p2.restitution = 0.95;
  var collisionGroup = game.physics.p2.createCollisionGroup();
  game.physics.p2.updateBoundsCollisionGroup();
  return collisionGroup;
}

function createTestBall(collisionGroup) {
  var ball = game.add.sprite(50, 50, 'player');
  ball.scale.setTo(playerScale, playerScale);
  game.physics.p2.enable(ball);
  ball.body.setCollisionGroup(collisionGroup);
  return ball;
}

optionsState.prototype = {
  create: function() {
   var testCollisionGroup = createCollisionGroupAndUpdatePhysics();
    this.testBall = createTestBall(testCollisionGroup);

    // this could be a prefab

    var backButton = game.add.sprite(100, game.height - 100, 'back_button');
    backButton.anchor.setTo(0.5,0.5);
    backButton.scale.setTo(0.2,0.2);
    backButton.alpha = 0;
    backButton.inputEnabled = true;
    backButtonAnimation = game.add.tween(backButton).to({alpha: 0.2}, 1000, Phaser.Easing.Quadratic.InOut, true, 2000);

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
        sprite.scale.setTo(0.4);
        sprite.alpha = 0;
        sprite.inputEnabled = true;
        game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 1000 );
        sensitivitySprites[option.name] = sprite;
    });


    // set sprite scale according to current sensitivity

      function selectSensitivity(selectedSprite) {
      inputSensitivity = SENSITIVITIES[selectedSprite];
      ['sense_high', 'sense_medium', 'sense_low'].forEach(function(spriteName) {
        var targetScale = (selectedSprite === spriteName) ? 0.5 : 0.3;
        game.add.tween(sensitivitySprites[spriteName].scale).to({x: targetScale, y: targetScale}, 500, Phaser.Easing.Quadratic.InOut, true);
      });
    }


      ['sense_high', 'sense_medium', 'sense_low'].forEach(function(sensitivityOption) {

      // make sure the current sensitivity is reflected in the options when screen loads
      if (inputSensitivity === SENSITIVITIES[sensitivityOption]) {
        selectSensitivity(sensitivityOption);
      }
      // in terms of compute cycle, the arrays are iterated through twice. perhaps could be refactored more.

      sensitivitySprites[sensitivityOption].events.onInputDown.add(selectSensitivity.bind(this, sensitivityOption), this);

    });

    function backToMenu() {
      this.game.state.start('main_menu');
    }

    backButton.events.onInputDown.add(backToMenu, this);

  },

  update: function() {

  ballMovement(this.testBall, ax, ay, inputSensitivity, cursors);

  }
};

