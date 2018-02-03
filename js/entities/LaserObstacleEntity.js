game.LaserObstacleEntity = me.Entity.extend({
  init: function(x, y, settings) {
    var self = this;

    this.shape = settings.shapes[0].points;

    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;
  },

  onCollision: function() {
    var self = this;
    this.renderable = new (me.Renderable.extend({
      init: function () {
        this._super(me.Renderable, 'init', [0, 0, 0, 0]);
      },
      destroy: function () {},
      draw: function (renderer) {
        var previousColor = renderer.getColor(); // backup original renderer color

        renderer.setColor(game.LaserObstacleEntity.COLOR);
        renderer.setLineWidth(3);
        renderer.strokeLine(self.shape[0].x, self.shape[0].y, self.shape[1].x, self.shape[1].y);

        renderer.setColor(previousColor); // reset to original
      }
    }));

    return false;
  }
});

game.LaserObstacleEntity.COLOR = '#FF2008';
