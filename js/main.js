var ax = 0, ay = 0,
vx = 0, vy = 0, windowx = window.innerWidth,
windowy = window.innerHeight, centerx = windowx / 2,
centery = windowy / 2;

var lastTime = new Date().getTime();

window.ondevicemotion = function(e) {
  ax = e.accelerationIncludingGravity.x * 300; //acceleration along x axis
  ay = e.accelerationIncludingGravity.y * -300; //acceleration along y axis

  //TODO: make tilt increase logarithimacally

  vx = vx + ax;
  vy = vy + ay;
  var now = new Date().getTime();
  // document.getElementById('info').innerHTML = 1000 / (now - lastTime); // this line for debugging purposes
  lastTime = now;
};

var enemies, enemy, playerBall, smallerEnemy, largerEnemy, gameOverScreen;

function createPlayer () {
  playerBall = game.add.sprite(centerx, centery, 'player');
  game.physics.enable(playerBall, Phaser.Physics.ARCADE);
  playerBall.body.collideWorldBounds = true;
  playerBall.body.checkCollision = true;
  playerBall.body.bounce.set(0.9);
  playerBall.scale.setTo(0.1,0.1);
  playerBall.anchor.setTo(0.5, 0.5);
}

function init() {

//create an empty board

createPlayer();
//this is the player ball

// initial game state

enemies = game.add.group();
enemies.enableBody = true;
enemies.physicsBodyType = Phaser.Physics.ARCADE;


for (var x = 1; x < 20; x++) {
  enemy = enemies.create(game.world.randomX, game.world.randomY, 'ball');
  enemy.body.bounce.set(0.9);
  enemy.inputEnabled = true;
  var randv = game.rnd.realInRange(-300, 300);
  var randv2 = game.rnd.realInRange(-300, 300);
  enemy.body.velocity.setTo(randv, randv2);

// setting up some random ball sizes

  if (x <= 14) {
    smallerEnemy = game.rnd.realInRange(0.001, playerBall.scale.x);
    enemy.scale.setTo(smallerEnemy, smallerEnemy); // this makes 14 enemies smaller than the current playerBall.scale.x
  }

  else if (x > 14 && x <= 16) {
    enemy.scale.setTo(playerBall.scale.x, playerBall.scale.x); // this makes 2 balls with the same size as playerBall.scale.x here note: can write a function to return two values or arguments?
  }

  else {
    largerEnemy = game.rnd.realInRange(playerBall.scale.x, 0.3);
    enemy.scale.setTo(largerEnemy, largerEnemy);
  }

  enemy.body.collideWorldBounds = true;


  }
}


var main = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets

    game.load.image('ball', 'assets/ball.png', 400, 400);
    game.load.image('player', 'assets/player.png', 400, 400);
    game.load.image('gameogre', 'assets/gameogre.png', 500, 256);
    game.stage.backgroundColor = '#FFFFFF';

  },


  create: function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.addPointer();

    init();


  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic

    if (game.input.mousePointer.isDown)
    {
        //  First is the callback
        //  Second is the context in which the callback runs, in this case game.physics.arcade
        //  Third is the parameter the callback expects - it is always sent the Group child as the first parameter
        enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 500);
    }

    else if (game.input.pointer1.isDown) {
        enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 500);
    }

    playerBall.body.acceleration.setTo(ax,ay);
    game.physics.arcade.collide(playerBall, enemies, eatBall);
    game.physics.arcade.collide(enemies, enemies);


  }

};

function destroySprite (sprite) {

    sprite.destroy();

}

function levelUp(_playerBall) {
  var newSize = _playerBall.scale.x * 1.05;
  _playerBall.scale.x = newSize;
  _playerBall.scale.y = newSize;
}

function addEnemy() {
  enemy = enemies.create(game.world.randomX, game.world.randomY, 'ball');
  enemy.body.bounce.set(0.9);
  var randv = game.rnd.realInRange(-300, 300);
  var randv2 = game.rnd.realInRange(-300, 300);
  var randsc = game.rnd.realInRange(0.01,0.3);
  enemy.scale.setTo(randsc,randsc);
  enemy.body.velocity.setTo(randv, randv2);
  enemy.body.collideWorldBounds = true;
}

function eatBall (_playerBall, _enemy) {
  if (_enemy.scale.x > _playerBall.scale.x) {
    _playerBall.kill();
    gameOverScreen = game.add.sprite(centerx, centery, 'gameogre');
    gameOverScreen.scale.setTo(1,1);
    gameOverScreen.anchor.setTo(0.5,0.5);
    gameOverScreen.inputEnabled = true;
    gameOverScreen.events.onInputDown.add(destroySprite, this);
  }

  else {
  _enemy.kill();
  levelUp(_playerBall);
  addEnemy();
  }
}

// Initialize Phaser, and start our 'main' state
var game = new Phaser.Game(windowx, windowy, Phaser.AUTO, 'ballerDiv');
game.state.add('main', main);
game.state.start('main');