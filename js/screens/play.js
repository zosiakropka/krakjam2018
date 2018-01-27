game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    me.levelDirector.loadLevel('tutorial');
    this.onPlayerDied = game.PlayScreen.getOnPlayerDied(this);

    // reset the score
    game.data.score = 0;
    me.event.subscribe('player:died', this.onPlayerDied);
    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    var xCenter = me.game.viewport.width / 2;
    var yCenter = me.game.viewport.height / 2;

    this.deathImage = new me.ImageLayer(
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
      // me.game.world.addChild(this.deathImage);
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
    me.game.world.addChild(self.deathImage);
    me.timer.setTimeout(function() {
      if (me.game.world.hasChild(self.deathImage)) {
        me.game.world.removeChild(self.deathImage);
      }
      me.levelDirector.reloadLevel();
    }, 1500);
  }
}

game.PlayScreen.DEATH_IMAGE_WIDTH = 600;
game.PlayScreen.DEATH_IMAGE_HEIGHT = 400;
