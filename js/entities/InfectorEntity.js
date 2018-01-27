game.InfectorEntity = me.Entity.extend({
  onCollision: function() {
    me.state.change(me.state.GAME_END);
    return false;
  }
});
