export default function ScatterPlot($target) {
  const $canvas = $target;
  const ctx = $target.getContext('2d');
  const padding = { x: 0, y: 0 };
  this.center = {};

  this.dataFilter = {};
  this.records = [];
  this.boundary = {};

  this.setState = ({ boundary, dataFilter, records, getColor }) => {
    this.dataFilter = dataFilter;
    this.records = records;
    this.boundary = boundary;
    console.log('state boundary: ', boundary);
    this.getColor = getColor;
    this.center = { x: $canvas.width / 2, y: $canvas.height / 2 };

    render();
  };

  const render = () => {
    clearCanvas();
    drawAxes();

    const coordinates = this.records
      .map(record => normalizeValues(record))
      .map(normRecord => convertToCoordinate(normRecord));

    coordinates.forEach(coor => drawDot(coor));
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  };

  const normalizeValues = entry => {
    const obj = {};
    if (entry.x || entry.x === 0)
      obj.x = (2 * entry.x) / (this.boundary.x[1] - this.boundary.x[0]);
    if (entry.y || entry.y === 0)
      obj.y = (2 * entry.y) / (this.boundary.y[1] - this.boundary.y[0]);
    if (entry.value) obj.value = entry.value;

    return obj;
  };

  const convertToCoordinate = entry => {
    const { center } = this;
    const obj = {};
    if (entry.x || entry.x === 0) obj.x = center.x + entry.x * center.x;
    if (entry.y || entry.y === 0) obj.y = center.y - entry.y * center.y;
    if (entry.value) obj.value = entry.value;

    return obj;
  };

  const drawAxes = () => {
    const { center } = this;

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    // x축 선
    ctx.beginPath();
    ctx.moveTo(0 + padding.x, center.y);
    ctx.lineTo($canvas.width - padding.x, center.y);
    ctx.lineWidth = 1;
    ctx.stroke();

    // y축 선
    ctx.beginPath();
    ctx.moveTo(center.x, $canvas.height - padding.y);
    ctx.lineTo(center.x, padding.y);
    ctx.lineWidth = 1;
    ctx.stroke();

    drawBaseLines();
  };

  const getBases = () => {
    const bases = { x: [], y: [] };
    const gapX = (this.boundary.x[1] - this.boundary.x[0]) / 20;
    const gapY = (this.boundary.y[1] - this.boundary.y[0]) / 20;

    for (let x = this.boundary.x[0]; x <= this.boundary.x[1]; x += gapX) {
      bases.x.push(x);
    }

    for (let y = this.boundary.y[0]; y <= this.boundary.y[1]; y += gapY) {
      bases.y.push(y);
    }

    return bases;
  };

  const drawBaseLines = () => {
    const { center } = this;
    const bases = getBases();
    const rawBase = [];
    for (let i = 0; i < 20; i++) {
      rawBase.push({ x: bases.x[i], y: bases.y[i] });
    }

    const baseCoord = rawBase
      .map(record => normalizeValues(record))
      .map(normRecord => convertToCoordinate(normRecord));
    // console.log(baseCoord);

    baseCoord.forEach(({ x, y }, i) => {
      ctx.beginPath();
      ctx.moveTo(x, center.y - 10);
      ctx.lineTo(x, center.y + 10);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillText(rawBase[i].x.toFixed(2), x, center.y + 20);

      ctx.beginPath();
      ctx.moveTo(center.x - 10, y);
      ctx.lineTo(center.x + 10, y);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillText(rawBase[i].y.toFixed(2), center.x + 10, y);
    });
  };

  const drawDot = ({ x, y, value }) => {
    ctx.fillStyle = this.getColor(value) || '#555555';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };
}
