game.InstructionScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    var self = this;
    me.audio.playTrack('Sos-GlobalGameJam2018KeynoteOST-03Relax');

    this.backgroundColorLayer = new me.ColorLayer(
      'background',
      game.InstructionScreen.BACKGROUND_COLOR)
    me.game.world.addChild(this.backgroundColorLayer, 1);

    this.backgroundImageLayer = new me.ImageLayer(
      0, 0, { image: 'noise_dark' });
    me.game.world.addChild(this.backgroundImageLayer, 2);

    this.hackerImage = new game.Button(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 1640,
        height: 920,
        z: 4,
        image: 'hacker',
        onPress: function() {
          if (me.game.world.hasChild(this)) {
            me.game.world.removeChild(this);
          }
          me.game.world.addChild(self.keyboardInstruction);
        },
        inputKey: 'continue'
      });

    this.keyboardInstruction = new game.Button(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 708,
        height: 500,
        z: 4,
        image: 'keyboardInstruction',
        onPress: function() {
          if (me.game.world.hasChild(this)) {
            me.game.world.removeChild(this);
          }
          me.game.world.addChild(self.padInstruction);
        },
        inputKey: 'continue'
      });

    this.padInstruction = new game.Button(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2, {
        width: 633,
        height: 535,
        z: 4,
        image: 'padInstruction',
        onPress: function() {
          me.levelDirector.loadLevel(game.PlayScreen.FIRST_LEVEL_ID);
          me.state.change(game.state.PLAY);
        },
        inputKey: 'continue'
      });

    me.game.world.addChild(this.hackerImage);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.audio.stopTrack();
    if (me.game.world.hasChild(this.keyboardInstruction)) {
      me.game.world.removeChild(this.keyboardInstruction);
    }
    if (me.game.world.hasChild(this.padInstruction)) {
      me.game.world.removeChild(this.padInstruction);
    }
    if (me.game.world.hasChild(this.backgroundColorLayer)) {
      me.game.world.removeChild(this.backgroundColorLayer);
    }
    if (me.game.world.hasChild(this.backgroundImageLayer)) {
      me.game.world.removeChild(this.backgroundImageLayer);
    }
  }
});

game.InstructionScreen.BACKGROUND_COLOR = '#a20f94';
