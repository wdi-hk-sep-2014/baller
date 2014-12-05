var ax = 0, ay = 0,
vx = 0, vy = 0, windowx = window.innerWidth,
windowy = window.innerHeight, centerx = windowx / 2,
centery = windowy / 2;

var lastTime = new Date().getTime();

window.ondevicemotion = function(e) {
  ax = e.accelerationIncludingGravity.x * 300; //acceleration along x axis
  ay = e.accelerationIncludingGravity.y * -300; //acceleration along y axis
  vx = vx + ax;
  vy = vy + ay;
  var now = new Date().getTime();
  // document.getElementById('info').innerHTML = 1000 / (now - lastTime); // this line for debugging purposes
  lastTime = now;
};

var enemies, enemy, playerBall, smallerEnemy, largerEnemy;


var main = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets
    game.load.image('ball', 'assets/ball.png', 400, 400);
    game.load.image('player', 'assets/player.png', 400, 400);
    game.stage.backgroundColor = '#FFFFFF';

  },


  create: function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //this is the player ball
    playerBall = game.add.sprite(centerx, centery, 'player');
    game.physics.enable(playerBall, Phaser.Physics.ARCADE);
    playerBall.body.collideWorldBounds = true;
    playerBall.body.checkCollision = true;
    playerBall.body.bounce.set(0.9);
    playerBall.scale.setTo(0.1,0.1);
    playerBall.anchor.setTo(0.5, 0.5);


    // initial game state

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    for (var x = 1; x < 20; x++) {
      enemy = enemies.create(game.world.randomX, game.world.randomY, 'ball');
      enemy.body.bounce.set(1.01);
      var randv = game.rnd.realInRange(-500, 500);
      var randv2 = game.rnd.realInRange(-500, 500);
      enemy.body.velocity.setTo(randv, randv2);
      // var randsc = game.rnd.realInRange(0.01, 0.5);
      // enemy.scale.setTo(0.02, 0.02);

      if (x <= 10) {
        smallerEnemy = game.rnd.realInRange(0.001, playerBall.scale.x);
        enemy.scale.setTo(smallerEnemy, smallerEnemy); // this makes 10 enemies smaller than the current playerBall.scale.x
      }

      else if (x > 10 && x <= 14) {
        enemy.scale.setTo(playerBall.scale.x, playerBall.scale.x); // this makes 3 balls with the same size as playerBall.scale.x here note: can write a function to return two values or arguments?
      }

      else {
        largerEnemy = game.rnd.realInRange(playerBall.scale.x, 0.3);
        enemy.scale.setTo(largerEnemy, largerEnemy);
      }

      enemy.body.collideWorldBounds = true;


}




  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    playerBall.body.acceleration.setTo(ax,ay);
    game.physics.arcade.collide(playerBall, enemies, eatBall);
    game.physics.arcade.collide(enemies, enemies);
  }

};

function eatBall (_playerBall, _enemy) {
  if (_enemy.scale.x > _playerBall.scale.x) {
    _enemy.kill();
  }


  // game.add.tween(playerBall.scale).to( { x: 0.2, y: 0.2 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true);
}

// Initialize Phaser, and start our 'main' state
var game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');
game.state.add('main', main);
game.state.start('main');