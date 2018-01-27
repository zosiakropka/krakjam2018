game.TitleScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    me.levelDirector.loadLevel('menu');

    this.startButton = new game.Button(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 416,
        height: 288,
        z: 4,
        image: 'startButton',
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
  onDestroyEvent: function() {
    me.game.world.removeChild(this.startButton);
  }
});
