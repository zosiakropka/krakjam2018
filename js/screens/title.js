game.TitleScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    me.audio.playTrack('Sos-GlobalGameJam2018KeynoteOST-03Relax');

    this.backgroundColorLayer = new me.ColorLayer(
      'background',
      game.TitleScreen.BACKGROUND_COLOR)
    me.game.world.addChild(this.backgroundColorLayer, 1);

    this.keyboardInstruction = new game.Button(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 708,
        height: 500,
        z: 4,
        image: 'keyboardInstruction',
        onPress: function() {
          me.levelDirector.loadLevel(game.PlayScreen.FIRST_LEVEL_ID);
          me.state.change(game.state.PLAY);
        },
        inputKey: 'continue'
      });
    me.game.world.addChild(this.keyboardInstruction);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.audio.stopTrack();
    if (me.game.world.hasChild(this.keyboardInstruction)) {
      me.game.world.removeChild(this.keyboardInstruction);
    }
    if (me.game.world.hasChild(this.backgroundColorLayer)) {
      me.game.world.removeChild(this.backgroundColorLayer);
    }
  }
});

game.TitleScreen.BACKGROUND_COLOR = '#000';
