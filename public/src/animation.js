document.addEventListener("DOMContentLoaded", function (event) {
  startAnim();
});

function startAnim() {
  let canvas = document.querySelector(".animation-canvas");
  let ctx = canvas.getContext("2d");
  let direction = true;
  let pos_x = 0,
    pos_y = 40;
  ctx.fillRect(pos_x, pos_y, 30, 30);
  setInterval(function () {
    ctx.clearRect(0, 0, 400, 100);

    if (pos_x + 30 <= 400 && direction) {
      pos_x += 2;
    }

    if (pos_x + 30 == 400) {
      direction = false;
    }

    if (pos_x >= 0 && !direction) {
      pos_x -= 2;
    }

    if (pos_x == 0) {
      direction = true;
    }

    ctx.fillStyle = `rgb(${255 - pos_x},${400 - pos_x},${pos_x})`

    ctx.fillRect(pos_x, pos_y, 30, 30);
  }, 1);
}
