let game = document.getElementById("game");
CSS.paintWorklet.addModule("js/board.js");

let frame = 1;
const cellsCount = 15;

const coordinates = [
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
].filter(point => point[0] < cellsCount && point[1] < cellsCount);

const update = () => {
  function _countNeighbours(x, y) {
    let amount = 0;

    const _isAlive = (x, y) => cells[x] && cells[x][y];
    const offsets = [-1, 0, 1];

    offsets.forEach(offsetX =>
      offsets.forEach(offsetY => (amount += _isAlive(x + offsetX, y + offsetY)))
    );
    amount -= _isAlive(x, y);

    return amount;
  }

  let result = [];
  cellsPositions = [];
  cells.forEach((row, x) => {
    result[x] = [];
    row.forEach((cell, y) => {
      let alive = 0,
        count = _countNeighbours(x, y);

      if (cell > 0) alive = count === 2 || count === 3;
      else alive = count === 3;

      result[x][y] = alive ? 1 : 0;
      if (result[x][y]) cellsPositions.push([x, y]);
    });
  });

  cells = result;
  result = [];

  game.style.cssText = `--cells: ${cellsPositions.join(" ")}; --cells-count: ${cellsCount}`;
  requestAnimationFrame(() => {
    frame && update();
  });
};

const getCoordinatesMatrix = positions => {
  const cells = [];
  for (let i = 0; i < cellsCount; i++) {
    cells[i] = [];
    for (let j = 0; j < cellsCount; j++) {
      cells[i][j] = 0;
    }
  }

  positions.forEach(point => (cells[point[0]][point[1]] = 1));
  return cells;
};

let cellsPositions = coordinates;
let cells = getCoordinatesMatrix(cellsPositions);

game.style.cssText = `--cells: ${cellsPositions.join(" ")}; --cells-count: ${cellsCount}`;

window.addEventListener("keydown", e => {
  if (e.which == 96) {
    frame = 1;
    update();
  }

  if (e.which == 97) {
    frame = null;
    window.cancelAnimationFrame(frame);
  }
});
