let cells = [];
const cellsCount = 64;
let name = 0;

class GameOfLifePainter {
  constructor() {
    this.name = Math.random();
    console.log(name)

    if (!name) name = this.name;

    console.log('name', name)
    this.canvasSize = 512;

    this.init();
  }

  init() {
    console.log("init");
    for (let i = 0; i < cellsCount; i++) {
      cells[i] = [];
      for (let j = 0; j < cellsCount; j++) {
        cells[i][j] = 0;
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
    ].forEach(point => (cells[point[0]][point[1]] = 1));
  }

  update() {
    let result = [];

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

    cells.forEach((row, x) => {
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

    cells = result;
  }

  paint(ctx, geom, properties) {
    console.log('asdasdasdasd', this.name, name)
    if (name !== this.name) return;
    this.update();
    console.log(this.name);
    const cellSize = geom.height / cellsCount;
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";

    ctx.clearRect(0, 0, geom.height, geom.width);
    cells.forEach((row, x) => {
      row.forEach((cell, y) => {
        ctx.beginPath();
        ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        if (cell) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      });
    });
  }
}

registerPaint("board", GameOfLifePainter);
