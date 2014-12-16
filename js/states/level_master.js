function LevelMasterState() {}

var playerDifficulty;

LevelMasterState.prototype = {
  create: function() {
    var levelTitle = game.add.sprite(centerx, oneThirdHeight, 'set_level');
    levelTitle.anchor.setTo(0.5,0.5);
    levelTitle.scale.setTo(0.5,0.5);
    levelTitle.alpha = 0;
    var levelTitleAnimation = game.add.tween(levelTitle).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true);

    var levelOptions = [
      {name: 'squishy', yOffset: 120},
      {name: 'bouncy', yOffset: 250},
      {name: 'hardcore', yOffset: 380}
    ];

    var levelSprites = {};

    levelOptions.forEach(
      function(option){
        var sprite = game.add.sprite(levelTitle.position.x, levelTitle.position.y + option.yOffset, option.name);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(0.3);
        sprite.alpha = 0;
        sprite.inputEnabled = true;
        game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true, 500 );
        levelSprites[option.name] = sprite;
    });

    function squishyLevel() {
      playerDifficulty = 1;
      this.game.state.start('level_round');
    }

    function bouncyLevel() {
      playerDifficulty = 2;
      this.game.state.start('level_round');
    }

    function hardcoreLevel() {
      playerDifficulty = 3;
      this.game.state.start('level_round');
    }


    levelSprites.squishy.events.onInputDown.add(squishyLevel,this);
    levelSprites.bouncy.events.onInputDown.add(bouncyLevel,this);
    levelSprites.hardcore.events.onInputDown.add(hardcoreLevel,this);

    // this.game.state.start('level_round');
  }
};

