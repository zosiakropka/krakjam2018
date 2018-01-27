game.LaserObstacleEntity = me.Entity.extend({
  init: function(x, y, settings) {
    var self = this;
    this.onTrigger = game.GroundObstacleEntity.getOnTrigger(this);

    this.shape = settings.shapes[0].points;

    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    me.event.subscribe("trigger:laserObstacle", this.onTrigger);
  },

  onCollision: function() {
    var self = this;
    console.info(this);
    console.info('laser collision');

    this.renderable = new (me.Renderable.extend({
      init: function () {
        this._super(me.Renderable, 'init', [0, 0, 0, 0]);
      },
      destroy: function () {},
      draw: function (renderer) {
        var previousColor = renderer.getColor(); // backup original renderer color
        renderer.setColor(game.LaserObstacleEntity.COLOR);
        renderer.strokeLine(self.shape[0].x, self.shape[0].y, self.shape[1].x, self.shape[1].y);
        renderer.setColor(previousColor); // reset to original
      }
    }));

    return false;
  },

  onDestroyEvent: function() {
    me.event.unsubscribe("trigger:laserObstacle", this.onTrigger);
  }
});

game.LaserObstacleEntity.onTrigger = function() {
  return function(data) {
    console.info(data)
  }
};

game.LaserObstacleEntity.COLOR = '#5EFF7E';
