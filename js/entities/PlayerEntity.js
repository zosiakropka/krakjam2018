/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

  /**
   * constructor
   */
  init: function(x, y, settings) {
    var self = this;
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.alwaysUpdate = true;
    this.body.setVelocity(3, 12);
    this.renderable.addAnimation('stand', [0, 1]);
    this.renderable.addAnimation('walk', [2, 3]);
    this.renderable.addAnimation('jump', [4, 5]);
    this.renderable.addAnimation('teleported', [7, 6]);
    this.renderable.addAnimation('die', [8, 9]);

    this.renderable.setCurrentAnimation('teleported');

    this.dead = false;
    this.multiJump = 1;

    this.justRendered = true;
    me.timer.setTimeout(function() {
      self.justRendered = false;
    }, 500)
  },

  /**
   * update the entity
   */
  update: function(dt) {

    if (this.dead) {
      if (!this.renderable.isCurrentAnimation('die')) {
        this.renderable.setCurrentAnimation('die');
      }
    } else {
      if (me.input.isKeyPressed('left')) {
        this.renderable.flipX(true);
        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        if (!this.renderable.isCurrentAnimation('walk')) {
          this.renderable.setCurrentAnimation('walk');
        }
      } else if (me.input.isKeyPressed('right')) {
        this.renderable.flipX(false);
        this.body.vel.x += this.body.accel.x * me.timer.tick;

        if (!this.renderable.isCurrentAnimation('walk')) {
          this.renderable.setCurrentAnimation('walk');
        }
      } else {
        this.body.vel.x = 0;
        if (this.justRendered) {
          if (!this.renderable.isCurrentAnimation('teleported')) {
            this.renderable.setCurrentAnimation('teleported');
          }
        } else {
          if (!this.renderable.isCurrentAnimation('stand')) {
            this.renderable.setCurrentAnimation('stand');
          }
        }
      }

      if (me.input.isKeyPressed('jump')) {
        this.body.vel.y += -(this.body.maxVel.y * this.multiJump++) * me.timer.tick
        this.body.jumping = true;
      }

      if (this.body.jumping || this.body.falling) {
        this.renderable.setCurrentAnimation('jump');
      }

      var isMoving = this.body.jumping || this.body.falling;
      if (!isMoving) {
        this.multiJump = 1;
      }
    }

    // apply physics to the body (this moves the entity)
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !==
      0 || this.body.vel.y !== 0);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision: function(response, other) {
    switch (response.b.body.collisionType) {
      case me.collision.types.WORLD_SHAPE:
        if (other.type === 'boundaries') {
          return true;
        }
        if (other.type === 'platform') {
          if (
            this.body.falling &&
            !me.input.isKeyPressed('down') &&
            response.overlapV.y > 0 &&
            (~~this.body.vel.y >= ~~response.overlapV.y)) {

            response.overlapV.x = 0;
            return true;
          }

          return false;
        }
        break;
      case me.collision.types.ENEMY_OBJECT:
        if (other.type === 'death' && !this.dead) {
          var self = this;
          self.dead = true;
          me.timer.setTimeout(function() {
            if (!self.body) {
              return;
            }
            self.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(self);

            me.event.publish('player:died');
          }, 500);
        }
        break;
    }

    // Make all other objects solid
    return false;
  },

  onDestroyEvent: function() {
  }
});
