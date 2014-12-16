function LevelMasterState() {}

LevelMasterState.prototype = {
  create: function() {
    var levelTitle = game.add.sprite(centerx, oneThirdHeight, 'set_level');
    levelTitle.anchor.setTo(0.5,0.5);
    levelTitle.scale.setTo(0.5,0.5);
    levelTitle.alpha = 0;
    var levelTitleAnimation = game.add.tween(levelTitle).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true);



    // this.game.state.start('level_round');
  }
};

