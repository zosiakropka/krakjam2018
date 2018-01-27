/* Game namespace */
var game = {

  // an object where to store game information
  data: {
    // score
    score: 0
  },


  // Run on page load.
  "onload": function() {
    // Initialize the video.
    if (!me.video.init(960, 640, {
        wrapper: "screen",
        scale: "auto",
        scaleMethod: 'flex-width'
      })) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // set and load all resources.
    // (this will also automatically switch to the loading screen)
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  // Run on game resources loaded.
  "loaded": function() {
    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());

    // add our player entity in the entity pool
    me.pool.register("player1Entity", game.PlayerEntity);
    me.pool.register("deathEntity", game.DeathEntity);
    me.pool.register("triggerEntity", game.TriggerEntity);
    me.pool.register("groundObstacleEntity", game.GroundObstacleEntity);

    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.UP, 'jump', true);
    me.input.bindKey(me.input.KEY.DOWN, 'down');
    me.input.bindKey(me.input.KEY.SPACE, 'restart', true);

    me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: -0.2}, me.input.KEY.LEFT);
    me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: 0.2}, me.input.KEY.RIGHT);
    me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_4}, me.input.KEY.UP);
    me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_1}, me.input.KEY.DOWN);

    // Start the game.
    me.state.change(me.state.MENU);
  }
};
