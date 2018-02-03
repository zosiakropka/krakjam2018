game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    if (me.audio.getCurrentTrack() !== game.audio.PLAY) {
      me.audio.getCurrentTrack() && me.audio.stopTrack();
      me.audio.playTrack(game.audio.track.PLAY);
    }
    me.levelDirector.reloadLevel();
    this.onPlayerDied = game.PlayScreen.getOnPlayerDied(this);

    // reset the score
    game.data.score = 0;
    me.event.subscribe('player:died', this.onPlayerDied);
    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(this.HUD);
    me.event.unsubscribe('player:died', this.onPlayerDied);
  }
});

game.PlayScreen.getOnPlayerDied = function(self) {
  return function() {
    me.state.change(game.state.DEATH);
  }
}

game.PlayScreen.DEATH_IMAGE_WIDTH = 600;
game.PlayScreen.DEATH_IMAGE_HEIGHT = 400;

game.PlayScreen.FIRST_LEVEL_ID = 'tutorial';
