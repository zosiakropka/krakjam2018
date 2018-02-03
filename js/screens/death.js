game.DeathScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var DeathLayer = me.ImageLayer.extend({
        update: function() {
          if (me.input.isKeyPressed('continue')) {
            me.state.change(game.state.PLAY);
          } else if (me.input.isKeyPressed('restart')) {
            me.state.change(game.state.KEYBOARD_TUTORIAL);
          }
        }
    });

    this.deathImage = new DeathLayer(
      0,
      0, {
        floating: true,
        alwaysUpdate: true,
        anchorPoint: {
          x: 0.5, y: 0.5
        },
        width: game.PlayScreen.DEATH_IMAGE_WIDTH,
        height: game.PlayScreen.DEATH_IMAGE_HEIGHT,
        image: 'death'
      });
      me.game.world.addChild(this.deathImage);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.deathImage);
  }
});
