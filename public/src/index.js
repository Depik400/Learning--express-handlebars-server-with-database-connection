var arr = [
  ["square", 10, 10, 50, 50, 0, 0],
  ["ellipse", 100, 100, 50, 75, 0, 0],
  ["circle", 300, 300, 100, 0, 0, 0],
  ["bezier", 100, 400, 200, 400, 300, 100],
];

document.addEventListener("DOMContentLoaded", function (event) {
  start();
});

function start() {
  function draw() {
    var canvas = document.querySelector(".canvas1");
    var ctx = canvas.getContext("2d");

    for (var i = 0; i < 4; i++) {
      if (arr[i][0] == "square") {
        ctx.fillStyle = "yellow";
        ctx.fillRect(arr[i][1], arr[i][2], arr[i][3], arr[i][4]);
      }

      if (arr[i][0] == "ellipse") {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.ellipse(
          arr[i][1],
          arr[i][2],
          arr[i][3],
          arr[i][4],
          Math.PI / 4,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();
      }

      if (arr[i][0] == "circle") {
        ctx.arc(arr[i][1], arr[i][2], arr[i][3], arr[i][4], 2 * Math.PI);
        ctx.fill();
        ctx.save();
      }

      if (arr[i][0] == "bezier") {
        ctx.fillStyle = "red";
        ctx.lineWidth = "6";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.bezierCurveTo(
          arr[i][1],
          arr[i][2],
          arr[i][3],
          arr[i][4],
          arr[i][5],
          arr[i][6]
        );
        ctx.stroke();
        ctx.save();
        ctx.closePath();
      }
    }
  }

  draw();
}
