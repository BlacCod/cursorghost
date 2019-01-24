var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} /*--------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Get Mouse
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        --------------------*/
var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, dir: '' };
var clicked = false;
var getMouse = function getMouse(e) {
  mouse = {
    x: e.clientX || e.pageX || e.touches[0].pageX || 0 || window.innerWidth / 2,
    y: e.clientY || e.pageX || e.touches[0].pageY || 0 || window.innerHeight / 2,
    dir: getMouse.x > e.clientX ? 'left' : 'right' };

};
['mousemove', 'touchstart', 'touchmove'].forEach(function (e) {
  window.addEventListener(e, getMouse);
});
window.addEventListener('mousedown', function (e) {
  e.preventDefault();
  clicked = true;
});
window.addEventListener('mouseup', function () {
  clicked = false;
});


/*--------------------
    Ghost Follow
    --------------------*/var
GhostFollow = function () {
  function GhostFollow(options) {_classCallCheck(this, GhostFollow);
    Object.assign(this, options);

    this.el = document.querySelector('#ghost');
    this.mouth = document.querySelector('.ghost__mouth');
    this.eyes = document.querySelector('.ghost__eyes');
    this.pos = {
      x: 0,
      y: 0 };

  }_createClass(GhostFollow, [{ key: 'follow', value: function follow()

    {
      this.distX = mouse.x - this.pos.x;
      this.distY = mouse.y - this.pos.y;

      this.velX = this.distX / 8;
      this.velY = this.distY / 8;

      this.pos.x += this.distX / 10;
      this.pos.y += this.distY / 10;

      this.skewX = map(this.velX, 0, 100, 0, -50);
      this.scaleY = map(this.velY, 0, 100, 1, 2.0);
      this.scaleEyeX = map(Math.abs(this.velX), 0, 100, 1, 1.2);
      this.scaleEyeY = map(Math.abs(this.velX * 2), 0, 100, 1, 0.1);
      this.scaleMouth = Math.min(Math.max(map(Math.abs(this.velX * 1.5), 0, 100, 0, 10), map(Math.abs(this.velY * 1.2), 0, 100, 0, 5)), 2);

      if (clicked) {
        this.scaleEyeY = .4;
        this.scaleMouth = -this.scaleMouth;
      }

      this.el.style.transform = 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px) scale(.7) skew(' + this.skewX + 'deg) rotate(' + -this.skewX + 'deg) scaleY(' + this.scaleY + ')';
      this.eyes.style.transform = 'translateX(-50%) scale(' + this.scaleEyeX + ',' + this.scaleEyeY + ')';
      this.mouth.style.transform = 'translate(' + (-this.skewX * .5 - 10) + 'px) scale(' + this.scaleMouth + ')';
    } }]);return GhostFollow;}();



/*--------------------
                                  Map
                                  --------------------*/
function map(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


/*--------------------
  Init
  --------------------*/
var cursor = new GhostFollow();


/*--------------------
                                Render
                                --------------------*/
var render = function render() {
  requestAnimationFrame(render);
  cursor.follow();
};
render();
