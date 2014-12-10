function MainMenuState() {}


MainMenuState.prototype = {
  create: function() {

    var logo = game.add.sprite(centerx, centery - 50, 'ballerlogo');
    logo.anchor.setTo(0.5,0.5);
    logo.scale.setTo(0.55,0.55);

    // debugger

    var logo_animation = game.add.tween(logo);
    logo_animation.to({ x: centerx, y: centery - 100}, 1000, Phaser.Easing.Quadratic.InOut);
    logo_animation.start();

    var logo_scale = game.add.tween(logo.scale);
    logo_scale.to({x: 0.4, y: 0.4}, 1000, Phaser.Easing.Quadratic.InOut);
    logo_scale.start();

  },

};