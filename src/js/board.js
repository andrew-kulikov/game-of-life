class GameOfLifePainter {
  static get inputProperties() {
    return ['--cells', '--cells-count'];
  }

  constructor() {
    console.log(Math.random());
  }

  paint(ctx, geom, properties) {
    const positions = properties
      .get('--cells')[0]
      .trim()
      .split(' ')
      .map(v => v.split(',').map(x => parseInt(x)));

    const cells = positions;

    //TODO: move to props
    const cellsCount = properties.get('--cells-count');

    const cellHeight = geom.height / cellsCount;
    const cellWidth = geom.width / cellsCount;
    ctx.strokeStyle = '#e1e1e1';
    ctx.fillStyle = 'cadetblue';

    ctx.clearRect(0, 0, geom.height, geom.width);
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
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

registerPaint('board', GameOfLifePainter);
