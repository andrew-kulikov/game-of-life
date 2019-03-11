let canvas = document.getElementById("myCanvas").getContext("2d");

canvas.strokeStyle = "#e1e1e1";
canvas.fillStyle = "cadetblue";

class GameOfLife {
  constructor(cellsCount, canvasSize, canvas) {
    this.cellsCount = cellsCount;
    this.canvasSize = canvasSize;
    this.canvas = canvas;
    this.cells = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.cellsCount; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.cellsCount; j++) {
        this.cells[i][j] = 0;
      }
    }

    [
      // Gosper glider gun
      [1, 5],
      [1, 6],
      [2, 5],
      [2, 6],
      [11, 5],
      [11, 6],
      [11, 7],
      [12, 4],
      [12, 8],
      [13, 3],
      [13, 9],
      [14, 3],
      [14, 9],
      [15, 6],
      [16, 4],
      [16, 8],
      [17, 5],
      [17, 6],
      [17, 7],
      [18, 6],
      [21, 3],
      [21, 4],
      [21, 5],
      [22, 3],
      [22, 4],
      [22, 5],
      [23, 2],
      [23, 6],
      [25, 1],
      [25, 2],
      [25, 6],
      [25, 7],
      [35, 3],
      [35, 4],
      [36, 3],
      [36, 4],

      // Random cells
      // If you wait enough time these will eventually take part
      // in destroying the glider gun, and the simulation will be in a "static" state.
      [60, 47],
      [61, 47],
      [62, 47],
      [60, 48],
      [61, 48],
      [62, 48],
      [60, 49],
      [61, 49],
      [62, 49],
      [60, 51],
      [61, 51],
      [62, 51]
    ].forEach(point => (this.cells[point[0]][point[1]] = 1));

    this.update();
  }

  update() {
    let result = [];
    const cells = this.cells;

    function _countNeighbours(x, y) {
      let amount = 0;

      const _isAlive = (x, y) => cells[x] && cells[x][y];
      const offsets = [-1, 0, 1];

      offsets.forEach(offsetX =>
        offsets.forEach(
          offsetY => (amount += _isAlive(x + offsetX, y + offsetY))
        )
      );
      amount -= _isAlive(x, y);

      return amount;
    }

    this.cells.forEach((row, x) => {
      result[x] = [];
      row.forEach((cell, y) => {
        let alive = 0,
          count = _countNeighbours(x, y);

        if (cell > 0) {
          alive = count === 2 || count === 3;
        } else {
          alive = count === 3;
        }

        result[x][y] = alive;
      });
    });

    this.cells = result;

    this.draw();
  }

  draw() {
    let canvas = this.canvas;
    const cellSize = this.canvasSize / this.cellsCount;

    canvas.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.cells.forEach((row, x) => {
      row.forEach((cell, y) => {
        canvas.beginPath();
        canvas.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        if (cell) {
          canvas.fill();
        } else {
          canvas.stroke();
        }
      });
    });

    //I love js
    setTimeout(this.update.bind(this), 150);
    //window.requestAnimationFrame(update);
  }
}

const game = new GameOfLife(64, 512, canvas);
