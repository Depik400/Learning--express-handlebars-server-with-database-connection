document.addEventListener("DOMContentLoaded", function (event) {
  startDraw();
});

function startDraw() {
  var canvas = document.querySelector(".canvas1");
  var ctx = canvas.getContext("2d");
  var prevX = 0;
  var prevY = 0;
  var isDrawing = false;

  canvas.addEventListener("mousedown", (event) => {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    prevX = x;
    prevY = y;
    isDrawing = true;
  });

  canvas.addEventListener("mousemove", (event) => {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (isDrawing) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5 + "px";
      ctx.lineCap = "round";
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
      prevX = x;
      prevY = y;
      ctx.closePath();
    }
  });

  window.addEventListener("mouseup", () => {
    isDrawing = false;
  });
}
