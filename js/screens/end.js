game.EndScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    if (me.audio.getCurrentTrack() !== game.audio.END) {
      me.audio.getCurrentTrack() && me.audio.stopTrack();
      me.audio.playTrack(game.audio.track.END);
    }
    var GameEndLayer = me.ColorLayer.extend({
      update: function() {
        if (me.input.isKeyPressed('continue')) {
          me.state.change(game.state.KEYBOARD_TUTORIAL);
        }
      }
    });

    me.game.world.addChild(
      new GameEndLayer(
        'background',
        game.EndScreen.BACKGROUND_COLOR), 1);

    this.targetInfectedImage = new me.GUI_Object(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 600,
        height: 400,
        z: 4,
        image: 'target_infected',
        onPress: function() {
          me.state.change(game.state.PLAY);
        },
        inputKey: 'continue'
      });
    me.game.world.addChild(this.targetInfectedImage);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
  }
});

game.EndScreen.BACKGROUND_COLOR = '#000000';
