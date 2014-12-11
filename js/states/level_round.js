function LevelRoundState() {}

var lives = 3, playerBall, enemy, smallerEnemies, largerEnemies;




function createPlayer() {
    playerBall = game.add.sprite(centerx, centery, 'player');
    playerBall.scale.setTo(0.1,0.1);
    game.physics.p2.enable(playerBall);
}

function createSmallerEnemies() {
    for (var x = 1; x < 15; x++) {
        var enemy = smallerEnemies.create(game.world.randomX, game.world.randomY, 'ball');
        var smallerEnemy = game.rnd.realInRange(0.001, playerBall.scale.x);
        enemy.scale.setTo(smallerEnemy, smallerEnemy); // this makes 14 enemies smaller than the current playerBall.scale.x
        game.physics.p2.enable(enemy, false);
        var randv = game.rnd.realInRange(-300, 300);
        var randv2 = game.rnd.realInRange(-300, 300);

        enemy.body.velocity.x = randv;
        enemy.body.velocity.y = randv2;
    }
}

function createLargerEnemies() {
    for (var x = 1; x < 5; x++) {
        var enemy = largerEnemies.create(game.world.randomX, game.world.randomY, 'ball');
        var largerEnemy = game.rnd.realInRange(playerBall.scale.x, playerBall.scale.x * 1.5);
        enemy.scale.setTo(largerEnemy, largerEnemy); // this makes 14 enemies smaller than the current playerBall.scale.x
        game.physics.p2.enable(enemy, false);
    }
}

function moveTowardPlayer (enemy) {
    accelerateToObject(enemy, playerBall, 200);
}

function moveAwayFromPlayer (enemy) {
    accelerateFromObject(enemy, playerBall, 50);
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
    obj1.body.force.y = Math.sin(angle) * speed;
}

function accelerateFromObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = -Math.cos(angle) * speed;    // accelerateToObject
    obj1.body.force.y = -Math.sin(angle) * speed;
}

LevelRoundState.prototype = {

  preload: function() {
    // This function will be executed at the beginning

  },


  create: function() {
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.8;
    smallerEnemies = game.add.group();
    largerEnemies = game.add.group();
    createPlayer();
    createSmallerEnemies();
    createLargerEnemies();




  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    largerEnemies.forEachAlive(moveTowardPlayer, this); // make balls accelerate towards player
    // smallerEnemies.forEachAlive

    //keyboard movement

    if (cursors.left.isDown) {playerBall.body.rotateLeft(100);}   //playerBall movement
    else if (cursors.right.isDown){playerBall.body.rotateRight(100);}
    else {playerBall.body.setZeroRotation();}
    if (cursors.up.isDown){playerBall.body.thrust(800);}
    else if (cursors.down.isDown){playerBall.body.reverse(800);}

  }

};