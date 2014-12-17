function accelerateBallOneStep(ball, ax, ay, inputSensitivity, cursors) {
    //assigning force using the accelerometer
    ball.body.force.x = ax;
    ball.body.force.y = ay;

    //keyboard movement
    if (cursors.left.isDown) {
      ball.body.rotateLeft(inputSensitivity / 3);
    } else if (cursors.right.isDown) {
      ball.body.rotateRight(inputSensitivity / 3);
    } else {
      ball.body.setZeroRotation();
    }

    if (cursors.up.isDown) {
      ball.body.thrust(inputSensitivity * 2);
    } else if (cursors.down.isDown) {
      ball.body.reverse(inputSensitivity * 2);
    }
}
