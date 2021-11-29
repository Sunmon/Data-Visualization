export default function ScatterPlot($target) {
  const $canvas = $target;
  const ctx = $target.getContext('2d');
  const padding = { x: 10, y: 10 };

  this.state = {
    xAxis: '',
    yAxis: '',
    dataFilter: {},
    records: [],
  };

  this.setState = state => {
    this.state = state;
    if (state.records) {
      render(state.dataFilter);
    } else {
      render();
    }
  };

  const render = dataFilter => {
    // ctx.fillStyle = '#aaaaaa';
    // ctx.fillRect(10, 10, 100, 100);
    // TODO render
    drawAxes();

    // TODO: records에서 x좌표, y좌표별로 점 다 찍기

    if (!dataFilter?.xAxis) return;

    const { header, data } = this.state.records;
    const xIndex = header.indexOf(dataFilter.xAxis);
    const yIndex = header.indexOf(dataFilter.yAxis);
    const dataFilterIndex = header.indexOf(dataFilter.filter);

    const normallizedData = data
      .map(entry => ({
        x: entry[xIndex],
        y: entry[yIndex],
        value: entry[dataFilterIndex],
      }))
      .map(entry => normalizePositions(entry));

    normallizedData.forEach(entry => drawDot(entry));
    // console.log(data);
    // console.log(normallizedData);
    // console.log(xIndex, yIndex);
  };

  const normalizePositions = entry => {
    return {
      x: convertToNum(entry.x),
      y: convertToNum(entry.y),
      value: entry.value,
    };
  };

  const convertToNum = str => {
    return Number(str.replace(/[^0-9.-]+/g, ''));
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

  const drawDot = ({ x, y, value }) => {
    // normalizePositions();
    ctx.fillStyle = '#aaee11';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  };
}
