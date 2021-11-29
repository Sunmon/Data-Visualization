export default function ScatterPlot($target) {
  const $canvas = $target;
  const ctx = $target.getContext('2d');
  const padding = { x: 0, y: 0 };

  this.dataFilter = {};
  this.records = [];
  this.boundary = {};

  this.setState = ({ boundary, dataFilter, records, getColor }) => {
    this.dataFilter = dataFilter;
    this.records = records;
    this.boundary = boundary;
    this.getColor = getColor;

    render();
  };

  const render = () => {
    drawAxes();

    const coordinates = this.records
      .map(record => normalizeValues(record))
      .map(normRecord => convertToCoordinate(normRecord));

    coordinates.forEach(coor => drawDot(coor));
  };

  const convertToCoordinate = entry => {
    const center = { x: $canvas.width / 2, y: $canvas.height / 2 };
    return {
      x: center.x + entry.x * center.x,
      y: center.y - entry.y * center.y,
      value: entry.value,
    };
  };

  const normalizeValues = entry => {
    return {
      x: entry.x / (this.boundary.x[1] - this.boundary.x[0]),
      y: entry.y / (this.boundary.y[1] - this.boundary.y[0]),
      value: entry.value,
    };
  };

  const drawAxes = () => {
    const center = { x: $canvas.width / 2, y: $canvas.height / 2 };

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
  };

  const drawDot = ({ x, y, value }) => {
    ctx.fillStyle = this.getColor(value) || '#555555';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };
}
