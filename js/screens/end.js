game.EndScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var GameEndLayer = me.ColorLayer.extend({
      update: function() {
        if (me.input.isKeyPressed('play')) {
          me.state.change(me.state.PLAY);
        }
      }
    });

    me.game.world.addChild(
      new GameEndLayer(
        'background',
        game.EndScreen.BACKGROUND_COLOR), 1);

    this.startButton = new me.GUI_Object(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 600,
        height: 400,
        z: 4,
        image: 'target_infected',
        onPress: function() {
          me.state.change(me.state.PLAY);
        },
        inputKey: 'restart'
      });
    me.game.world.addChild(this.startButton);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {}
});

game.EndScreen.BACKGROUND_COLOR = '#000000';
