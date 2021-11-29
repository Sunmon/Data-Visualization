import { hasValue } from '../lib/utility';

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
    if (hasValue(entry.x))
      obj.x = (2 * entry.x) / (this.boundary.x[1] - this.boundary.x[0]);
    if (hasValue(entry.y))
      obj.y = (2 * entry.y) / (this.boundary.y[1] - this.boundary.y[0]);
    if (hasValue(entry.value)) obj.value = entry.value;

    return obj;
  };

  const convertToCoordinate = entry => {
    const { center } = this;
    const obj = {};
    if (hasValue(entry.x)) obj.x = center.x + entry.x * center.x;
    if (hasValue(entry.y)) obj.y = center.y - entry.y * center.y;
    if (hasValue(entry.value)) obj.value = entry.value;

    return obj;
  };

  const drawAxes = () => {
    const { center } = this;
    resetColor();
    drawXAxis(center);
    drawYAxis(center);
    drawBaseLines();
  };

  const resetColor = () => {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
  };

  const drawXAxis = center => {
    ctx.beginPath();
    ctx.moveTo(0 + padding.x, center.y);
    ctx.lineTo($canvas.width - padding.x, center.y);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillText(this.dataFilter.xAxis, $canvas.width - 50, center.y + 50);
  };

  const drawYAxis = center => {
    ctx.beginPath();
    ctx.moveTo(center.x, $canvas.height - padding.y);
    ctx.lineTo(center.x, padding.y);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillText(this.dataFilter.yAxis, center.x - 50, 50);
  };

  const getBases = () => {
    const bases = { x: [], y: [] };
    const { boundary } = this;
    const gapX = (boundary.x[1] - boundary.x[0]) / 20;
    const gapY = (boundary.y[1] - boundary.y[0]) / 20;

    for (let x = boundary.x[0]; x <= boundary.x[1]; x += gapX) {
      bases.x.push(x);
    }
    for (let y = boundary.y[0]; y <= boundary.y[1]; y += gapY) {
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
