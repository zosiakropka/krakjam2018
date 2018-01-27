game.TriggerEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.collisionType = me.collision.types.WORLD_SHAPE;
    this.eventName = settings.eventName;
    this.eventData = settings.eventData;

    this.triggered = false;
  },

  onCollision: function(response) {
    if (!this.triggered) {
      me.event.publish('trigger:' + this.eventName, [this.eventData]);
      this.triggered = true;
    }

    return false;
  }
});
