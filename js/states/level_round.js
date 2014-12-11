




function LevelRoundState() {}

var lives = 3, playerBall, enemy, smallerEnemies, largerEnemies, enemiesCollisionGroup, playerCollisionGroup;


//accelerometer controls

var ax = 0, ay = 0,
vx = 0, vy = 0;

// var lastTime = new Date().getTime();

window.ondevicemotion = function(e) {
  ax = e.accelerationIncludingGravity.x * 300; //acceleration along x axis
  ay = e.accelerationIncludingGravity.y * -300; //acceleration along y axis

  //TODO: make tilt increase logarithimacally

  vx = vx + ax;
  vy = vy + ay;

  // var now = new Date().getTime();
  // document.getElementById('info').innerHTML = 1000 / (now - lastTime); // this line for debugging purposes
  // lastTime = now;

};



function createPlayer() {
    playerBall = game.add.sprite(centerx, centery, 'player');
    playerBall.scale.setTo(0.1,0.1);
    game.physics.p2.enable(playerBall);

    // //adding invicibility to the ball for 4 seconds

    playerBall.invincible = true;

    var invincibleAnimation = game.add.tween(playerBall);
    invincibleAnimation.to({alpha: 0}, 500, Phaser.Easing.Linear.None, true, 0, 7, false).to({alpha: 1}, 500);


    game.time.events.add(4000, (function() {
        playerBall.invincible = false;
    }), this);

    //setting the collision group for the player
    playerBall.body.setCollisionGroup(playerCollisionGroup);
    playerBall.body.collides(enemiesCollisionGroup, hitEnemy, this);
}


function createSmallerEnemies() {
    for (var x = 1; x < 15; x++) {
        var enemy = smallerEnemies.create(game.world.randomX, game.world.randomY, 'ball');
        var smallerEnemy = game.rnd.realInRange(0.001, playerBall.scale.x);


        //making enemies smaller than current player size
        enemy.scale.setTo(smallerEnemy, smallerEnemy);
        game.physics.p2.enable(enemy, false);

        //initiating enemy velocity.

        var randv = game.rnd.realInRange(-300, 300);
        var randv2 = game.rnd.realInRange(-300, 300);
        enemy.body.velocity.x = randv;
        enemy.body.velocity.y = randv2;

        //setting the collision group and having it collide with the player.
        enemy.body.setCollisionGroup(enemiesCollisionGroup);
        enemy.body.collides([enemiesCollisionGroup, playerCollisionGroup]);
    }
}

function createLargerEnemies() {
    for (var x = 1; x < 5; x++) {
        var enemy = largerEnemies.create(game.world.randomX, game.world.randomY, 'ball');
        var largerEnemy = game.rnd.realInRange(playerBall.scale.x, playerBall.scale.x * 1.5);
        enemy.scale.setTo(largerEnemy, largerEnemy);
        game.physics.p2.enable(enemy, false);

        //setting the collision group and having it collide with the player.
        enemy.body.setCollisionGroup(enemiesCollisionGroup);
        enemy.body.collides([enemiesCollisionGroup, playerCollisionGroup]);

    }
}

function moveLargerTowardPlayer (enemy) {
    accelerateToObject(enemy, playerBall, 200);
}

function moveSmallerTowardPlayer (enemy) {
    accelerateToObject(enemy, playerBall, 50);
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry balls (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
    obj1.body.force.y = Math.sin(angle) * speed;
}

function restartGame() {
  game.state.start('level_round');
  // this.game.state.start('level_round');
}


function levelUp(playerBall) {
  var newSize = playerBall.sprite.scale.x * 1.01;
  playerBall.sprite.scale.x = newSize;
  playerBall.sprite.scale.y = newSize;
}

function hitEnemy(playerBall, enemy) {
    //  body1 is the playerBall (as it's the body that owns the callback)
    //  body2 is the body it impacted with, the enemy balls
    //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:

    if (playerBall.sprite.invincible) {
        return;
    }

    else if (enemy.sprite.scale.x > playerBall.sprite.scale.x) {
        playerBall.sprite.kill();
        gameOverScreen = game.add.sprite(centerx, centery, 'gameogre');
        gameOverScreen.scale.setTo(1,1);
        gameOverScreen.anchor.setTo(0.5,0.5);
        gameOverScreen.inputEnabled = true;
        gameOverScreen.events.onInputDown.add(restartGame, this);
      }

    else {
        enemy.sprite.kill();
        levelUp(playerBall);
    }

}

LevelRoundState.prototype = {

  preload: function() {
    // This function will be executed at the beginning

  },


  create: function() {

    // starting the P2JS system
    game.physics.startSystem(Phaser.Physics.P2JS);
    // starting collision events
    game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 1.1;


    //creating a collision group for player and enemies

    playerCollisionGroup = game.physics.p2.createCollisionGroup();

    enemiesCollisionGroup = game.physics.p2.createCollisionGroup();


    game.physics.p2.updateBoundsCollisionGroup();



    smallerEnemies = game.add.group();
    largerEnemies = game.add.group();

    createPlayer();

    //adding invicibility to the ball for 4 seconds




    createSmallerEnemies();
    createLargerEnemies();





  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic

    //assigning force using the accelerometer

    playerBall.body.force.x = ax;
    playerBall.body.force.y = ay;

    //larger enemies move faster towards you.

    largerEnemies.forEachAlive(moveLargerTowardPlayer, this);
    smallerEnemies.forEachAlive(moveSmallerTowardPlayer, this);

    //keyboard movement

    if (cursors.left.isDown) {playerBall.body.rotateLeft(100);}   //playerBall movement
    else if (cursors.right.isDown){playerBall.body.rotateRight(100);}
    else {playerBall.body.setZeroRotation();}
    if (cursors.up.isDown){playerBall.body.thrust(800);}
    else if (cursors.down.isDown){playerBall.body.reverse(800);}

  }
};