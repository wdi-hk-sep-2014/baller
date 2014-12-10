function LevelMasterState() {}

LevelMasterState.prototype = {
  create: function() {
    this.game.state.start('level_round');
  }
};

