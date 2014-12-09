LevelMasterState.prototype = {
  init: function(levelData) {
    if (!levelData) { //if levelData is undefined, do...
      levelData = {
        level: 0,
        round: 1,
        players: [
          { score: 0, skill: 1 },
          { score: 0, skill: 1 }
        ]
      };
    }

    this.levelData = levelData;
    this.winScore = 2;
  },

  create: function() {
    this.decideLevelState();
  }
};

