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
    if (!dataFilter?.xAxis) return;
    if (resizeCanvas()) {
      ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    }
    drawAxes();

    const { header, data } = this.state.records;
    const xIndex = header.indexOf(dataFilter.xAxis);
    const yIndex = header.indexOf(dataFilter.yAxis);
    const dataFilterIndex = header.indexOf(dataFilter.filter);

    this.valueBoundary = [
      Math.max(...data.map(el => Math.abs(convertToNum(el[xIndex])))),
      Math.max(...data.map(el => Math.abs(convertToNum(el[yIndex])))),
    ];

    const normalizezdData = data
      .map(entry => ({
        x: entry[xIndex],
        y: entry[yIndex],
        value: entry[dataFilterIndex],
      }))
      .map(entry => normalizeValues(entry))
      .map(entry => convertToCoordinate(entry));

    console.log(normalizezdData);
    normalizezdData.forEach(entry => drawDot(entry));

    drawDot({ x: -140.1063829787234, y: 600, value: '' });
    // console.log(data);
    // console.log(normalizezdData);
    // console.log(xIndex, yIndex);
  };

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio;
    const { width, height } = calculateAdjustSize(dpr);
    console.log($canvas.width, width, $canvas.clientWidth, dpr);

    const needResize = $canvas.width !== width || $canvas.height !== height;
    if (needResize) {
      $canvas.width = width;
      $canvas.height = height;
      // ctx.scale(dpr, dpr);
      console.log(
        '$width, width, clientWidth: ',
        $canvas.width,
        width,
        $canvas.clientWidth,
        dpr,
      );
    }

    return needResize;
  };

  const calculateAdjustSize = pixelRatio => {
    return {
      width: ($canvas.clientWidth * pixelRatio) | 0, // round down
      height: ($canvas.clientHeight * pixelRatio) | 0, // round down
    };
  };

  // -1 ~ 1 사이의 값으로 변경하여 리턴함
  const normalizeValues = entry => {
    return {
      x: convertToNum(entry.x) / this.valueBoundary[0],
      y: convertToNum(entry.y) / this.valueBoundary[1],
      value: entry.value,
    };
  };

  const convertToCoordinate = entry => {
    const center = { x: $canvas.width / 2, y: $canvas.height / 2 };
    return {
      x: center.x + entry.x * center.x,
      y: center.y - entry.y * center.y,
      value: entry.value,
    };
  };

  const convertToNum = str => {
    return Number(str.replace(/[^0-9.-]+/g, ''));
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

    // console.log(x, y, $canvas.clientWidth);
  };

  const drawDot = ({ x, y, value }) => {
    const colors = {
      Furniture: '#aaee11',
      'Office Supplies': '#ee11aa',
      Technology: '#11aaee',
    };
    ctx.fillStyle = colors[value] || '#555555';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };
}
