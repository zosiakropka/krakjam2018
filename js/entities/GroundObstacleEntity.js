game.GroundObstacleEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this.onTrigger = game.GroundObstacleEntity.getOnTrigger(this);

    this._super(me.Entity, 'init', [x, y, settings]);

    this.renderable.addAnimation('low', [0]);
    this.renderable.addAnimation('high', [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]);

    this.renderable.setCurrentAnimation('low');

    this.body.collisionType = me.collision.types.NO_OBJECT;
    me.event.subscribe("trigger:groundObstacle", this.onTrigger);

    this.groundObstacleId = settings.groundObstacleId;
  },

  onDestroyEvent: function() {
    me.event.unsubscribe("trigger:groundObstacle", this.onTrigger);
  }
});

game.GroundObstacleEntity.getOnTrigger = function(self) {
  return function(data) {
    me.timer.setTimeout(function() {
      var groundObstacleId = data.groundObstacleId;
      if (groundObstacleId !== self.groundObstacleId) {
        return;
      }

      if (!self.body) {
        return;
      }

      self.renderable.setCurrentAnimation('high');
      self.body.collisionType = me.collision.types.ENEMY_OBJECT;
    }, data.timeout || 0);
  };
}
