// import ScatterPlot from './components/scatter_plot';
import ControlPanel from './components/control_panel';
import ScatterPlot from './components/scatter_plot';
import Store from './store/store';

const COLORS = [
  '#DC143C',
  '#FFA500',
  '#808000',
  '#0000FF',
  '#9932CC',
  '#7FFF00',
  '#FF1493',
  '#FFD700',
  '#696969',
];

const INITIAL_STATE = {
  xAxis: [-100, 100],
  yAxis: [0, 100],
  dataFilter: {
    xAxis: 'Profit Ratio',
    yAxis: 'Profit',
    filter: 'Category',
  },
  records: {
    header: [],
    data: [],
  },
};

export default function App($target) {
  const $canvas = document.querySelector('#chart');
  const $controlPanel = document.querySelector('#control-panel');

  this.state = {
    xAxis: [], // TODO: xAxis는 데이터의 max, min으로 바뀔 것
    yAxis: [],
    // dataFilter: {}
    dataFilter: {},
    colors: {},
  };

  this.init = () => {
    this.store = new Store();
    this.scatterPlot = new ScatterPlot($canvas);
    this.controlPanel = new ControlPanel($controlPanel);
    this.setState(INITIAL_STATE);
    fetchData();
  };

  const fetchData = async () => {
    const records = await this.store.fetchData();
    const colors = getColor();
    const value = records.header.indexOf(this.state.dataFilter.filter);
    records.data.forEach(record => colors(record[value]));
    // .map(record => record.data[this.state.dataFilter.filter])

    const state = { ...this.state, records, colors };
    // console.log('record color: ', colors('Furniture'));
    // const colors = records.map(record => record.data[this.state.dataFilter.filter]).forEach()

    this.setState(state);
  };

  const getColor = () => {
    let i = 0;
    const colors = {};

    return name => {
      if (colors[name]) return colors[name];
      colors[name] = COLORS[i++];
      return colors[name];
    };
  };

  this.setState = state => {
    this.state = state;
    resizeCanvas();

    console.log('app: ', state.records);
    if (!state.records?.header?.length) return;

    const trimStringRecords = numberedRecords(state.records);

    // TODO: scatterPlot state
    // this.scatterPlot.setState(state);

    const maxValues = [
      Math.max(...trimStringRecords.map(el => Math.abs(el.x))),
      Math.max(...trimStringRecords.map(el => Math.abs(el.y))),
    ];

    this.scatterPlot.setState({
      boundary: {
        x: [-maxValues[0], maxValues[0]],
        y: [-maxValues[1], maxValues[1]],
        // x: [
        //   -Math.max(...trimStringRecords.map(el => Math.abs(el.x))),
        //   Math.max(...trimStringRecords.map(el => Math.abs(el.x))),
        // ],
        // y: [
        //   -Math.max(...trimStringRecords.map(el => el.y)),
        //   Math.max(...trimStringRecords.map(el => el.y)),
        // ],
      },
      dataFilter: state.dataFilter,
      records: trimStringRecords,
      getColor: state.colors,
    });

    // TODO:
    const value = state.records.header.indexOf(state.dataFilter.filter);
    // ...new Set(array)
    const valueItems = [
      ...new Set(state.records.data.map(record => record[value])),
    ];
    // this.controlPanel.setState(state);
    this.controlPanel.setState({
      dataFilter: state.dataFilter,
      menuItems: valueItems,
      getColor: state.colors,
    });
  };

  /**
   *
   * @param {*} pixelRatio
   * @returns
   */

  const calculateAdjustSize = pixelRatio => {
    return {
      width: ($canvas.clientWidth * pixelRatio) | 0, // round down
      height: ($canvas.clientHeight * pixelRatio) | 0, // round down
    };
  };

  const numberedRecords = records => {
    const x = records.header.indexOf(this.state.dataFilter.xAxis);
    const y = records.header.indexOf(this.state.dataFilter.yAxis);
    const value = records.header.indexOf(this.state.dataFilter.filter);

    console.log('numberedRecords: ', records);
    return records.data.map(record => {
      return {
        x: convertToNum(record[x]),
        y: convertToNum(record[y]),
        value: record[value],
      };
    });
  };

  // -1 ~ 1 사이의 값으로 변경하여 리턴함
  // const normalizeValues = entry => {
  //   return {
  //     x: convertToNum(entry.x) / this.valueBoundary[0],
  //     y: convertToNum(entry.y) / this.valueBoundary[1],
  //     value: entry.value,
  //   };
  // };

  const convertToNum = str => {
    return Number(str.replace(/[^0-9.-]+/g, ''));
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
}
