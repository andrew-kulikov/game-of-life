class GameOfLifePainter {
  static get inputProperties() {
    return ["--cells"];
  }

  update(cells) {
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
    const positions = properties
      .get("--cells")[0]
      .trim()
      .split(" ")
      .map(v => v.split(",").map(x => parseInt(x)));

    const cells = positions;

    //TODO: move to props
    const cellsCount = 64;

    const cellHeight = geom.height / cellsCount;
    const cellWidth = geom.width / cellsCount;
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";

    ctx.clearRect(0, 0, geom.height, geom.width);
    for (var i = 0; i < 64; i++) {
      for (var j = 0; j < 64; j++) {
        ctx.beginPath();
        ctx.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);

        ctx.stroke();
      }
    }
    cells.forEach(pos => {
      ctx.rect(pos[0] * cellWidth, pos[1] * cellHeight, cellWidth, cellHeight);
      ctx.fill();
    });
  }
}

registerPaint("board", GameOfLifePainter);
