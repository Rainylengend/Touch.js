/*封装的touchJS 使用方法 new Touch( el ).touch(callback).longTouch(callback).swipeLeft(callback).swipeRight(callback).dbTouch(callback);
 * touch  和longtouch 均返回 touchstart event事件
 */
;
(function () {
  var leftORTop = function (direction, self, callback) {
        var begin,
            end;

        self.el.addEventListener('touchstart', function (e) {
          begin = e.changedTouches[0][direction];
        });

        self.el.addEventListener('touchend', function (e) {
          end = e.changedTouches[0][direction];

          if (end - begin < 50 && typeof callback === 'function')
            callback.call(self.el);

        });

      },
      rightORDown = function (direction, self, callback) {
        var begin,
            end;

        self.el.addEventListener('touchstart', function (e) {
          begin = e.changedTouches[0][direction];
        });

        self.el.addEventListener('touchend', function (e) {
          end = e.changedTouches[0][direction];

          if (end - begin > 50 && typeof callback === 'function')
            callback.call(self.el);

        });
      };

  var Touch = function (el) {

    if (!el)
      throw new Error('必须传入元素对象');

    this.el = el;
  };

  Touch.prototype = {
    constructor: Touch,
    touch: function (callback) {
      var self = this;

      this.el.addEventListener('touchstart', function (e) {

        if (typeof callback === 'function')
          callback.call(self.el, e);

      });

      return this;
    },
    dbTouch: function (callback) {
      var times = 0,
          dbTimer = null,
          self = this;

      this.el.addEventListener('touchstart', function (e) {
        times++;

      });

      this.el.addEventListener('touchend', function (e) {

	      dbTimer = setTimeout(function () {

          if (times === 2) {
            times = 0;
            callback.call(self.el, e);
          } else {
            times = 0;
            clearTimeout(dbTimer)
          }

        }, 200);

      });
    },
    longTouch: function (callback) {
      var self = this,
          isLongTouch = null;

      this.el.addEventListener('touchstart', function (e) {

        isLongTouch = setTimeout(function () {

          if (typeof callback === 'function')
            callback.call(self.el, e);

        }, 600)
      });

      this.el.addEventListener('touchend', function (e) {
        clearTimeout(isLongTouch);
      });
      return this;
    },
    swipeRight: function (callback) {
      var self = this;

      rightORDown('pageX', self, callback);
      return this;
    },
    swipeLeft: function (callback) {
      var self = this;

      leftORTop('pageX', self, callback);
      return this;
    },
    swipeTop: function (callback) {
      var self = this;

      leftORTop('pageY', self, callback);
      return this;
    },
    swipeDown: function (callback) {
      var self = this;

      rightORDown('pageY', self, callback);
      return this;
    }
  };

  return window.Touch = Touch;
})();