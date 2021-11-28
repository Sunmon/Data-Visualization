export default function ScatterPlot($target) {
  const $canvas = $target;
  const ctx = $target.getContext('2d');
  const padding = { x: 10, y: 10 };

  this.xAxis = '';
  this.yAxis = '';

  this.setState = ({ xAxis, yAxis, dataFilter }) => {
    //   this.setState = () => {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    // this.ctx = $target.getContext('2d');
    render();
  };

  const render = dataFilter => {
    ctx.fillStyle = '#aaaaaa';
    console.log(ctx);
    ctx.fillRect(10, 10, 100, 100);
    // TODO render
    console.log('hello world!');
    drawAxes();
  };

  const drawAxes = () => {
    const x = $canvas.width;
    const y = $canvas.height;

    // x축 선
    ctx.beginPath();
    ctx.moveTo(0 + padding.x, $canvas.height - padding.y);
    ctx.lineTo($canvas.width - padding.x, $canvas.height - padding.y);
    ctx.lineWidth = 1;
    ctx.stroke();

    // y축 선
    ctx.beginPath();
    ctx.moveTo($canvas.width / 2, $canvas.height - padding.y);
    ctx.lineTo($canvas.width / 2, padding.y);
    ctx.lineWidth = 1;
    ctx.stroke();

    drawDot({ x: 100, y: 100 });
    // console.log(x, y, $canvas.clientWidth);
  };

  const drawDot = ({ x, y }) => {
    // normalizePositions();
    ctx.fillStyle = '#aaee11';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  };
}
