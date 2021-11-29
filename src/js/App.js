// import ScatterPlot from './components/scatter_plot';
import ControlPanel from './components/control_panel';
import ScatterPlot from './components/scatter_plot';
import Store from './store/store';

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
    const state = { ...this.state, records };

    this.setState(state);
  };

  this.setState = state => {
    this.state = state;
    resizeCanvas();

    console.log('app: ', state.records);
    if (!state.records?.header?.length) return;

    const records = numberedRecords(state.records);

    // TODO: scatterPlot state
    // this.scatterPlot.setState(state);

    this.scatterPlot.setState({
      boundary: {
        x: [
          -Math.max(...records.map(el => el.x)),
          Math.max(...records.map(el => el.x)),
        ],
        y: [
          -Math.max(...records.map(el => el.y)),
          Math.max(...records.map(el => el.y)),
        ],
      },
      dataFilter: state.dataFilter,
      records,
    });

    // TODO:
    // this.controlPanel.setState(state);
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
