# touch.js

> 自用touch.js插件


``` bash
# 使用方法( touch  和longtouch 均返回 touchstart event事件 )
# 拥有 touch、longTouch、swipeLeft、swipeRight、swipeTop、swipeDown事件课链式调用

new Touch( el ).touch(callback);

new Touch( el ).touch(callback).longTouch(callback);
