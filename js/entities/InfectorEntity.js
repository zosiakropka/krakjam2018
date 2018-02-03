game.InfectorEntity = me.Entity.extend({
  onCollision: function() {
    me.state.change(game.state.GAME_END);
    return false;
  }
});
