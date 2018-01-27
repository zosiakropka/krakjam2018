game.Button = me.GUI_Object.extend({
  init: function(x, y, settings) {
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.width = this.framewidth = settings.width;
    this.height = this.frameheight = settings.height;
    this.onPress = settings.onPress;
    this.inputKey = settings.inputKey;
  },

  update: function() {
    if (me.input.isKeyPressed(this.inputKey)) {
      this.onPress();
    }
  },

  onRelease: function() {
    this.onPress();
  }
});
