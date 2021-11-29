import ControlPanel from './components/control_panel';
import ScatterPlot from './components/scatter_plot';
import AxisSelector from './components/axis_selector';
import Store from './store/store';

const COLORS = [
  '#DC143C',
  '#FFA500',
  '#808000',
  '#1f2612',
  '#e61e29',
  '#0000FF',
  '#9932CC',
  '#FFD700',
  '#7FFF00',
  '#FF1493',
  '#696969',
  '#126129',
  '#886129',
  '#991129',
  '#f26129',
  '#1c6ccc',
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
  const $axisSelector = document.querySelector('#axis-selector');

  this.state = {
    xAxis: [],
    yAxis: [],
    dataFilter: {},
  };

  this.init = () => {
    this.store = new Store();
    this.scatterPlot = new ScatterPlot($canvas);
    this.controlPanel = new ControlPanel($controlPanel);
    this.axisSelector = new AxisSelector($axisSelector, {
      dataFilter: this.state.dataFilter,
      onChange: (select, category) => {
        const state = {
          ...this.state,
          dataFilter: { ...this.state.dataFilter, [category]: select },
        };
        this.setState(state);
      },
    });
    this.setState(INITIAL_STATE);
    fetchData();
  };

  const fetchData = async () => {
    const records = await this.store.fetchData();
    const value = records.header.indexOf(this.state.dataFilter.filter);

    const state = { ...this.state, records };
    resizeCanvas();

    this.setState(state);
  };

  const getColor = category => {
    let i = 0;
    const colors = {};
    if (!colors[category]) colors[category] = {};

    return name => {
      if (colors[category][name]) return colors[category][name];
      colors[category][name] = COLORS[i];
      i = (i + 1) % COLORS.length;

      return colors[category][name];
    };
  };

  this.setState = state => {
    this.state = state;
    if (!state.records?.header?.length) return;

    const trimStringRecords = numberedRecords(state.records);
    const maxValues = [
      Math.max(...trimStringRecords.map(el => Math.abs(el.x))),
      Math.max(...trimStringRecords.map(el => Math.abs(el.y))),
    ];

    this.scatterPlot.setState({
      boundary: {
        x: [-maxValues[0], maxValues[0]],
        y: [-maxValues[1], maxValues[1]],
      },
      dataFilter: state.dataFilter,
      records: trimStringRecords,
      getColor: getColor(state.dataFilter),
    });

    const value = state.records.header.indexOf(state.dataFilter.filter);
    const valueItems = [
      ...new Set(state.records.data.map(record => record[value])),
    ];

    this.controlPanel.setState({
      dataFilter: state.dataFilter,
      menuItems: valueItems,
      getColor: getColor(state.dataFilter),
    });

    this.axisSelector.setState({ dataFilter: this.state.dataFilter });
  };

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

    return records.data.map(record => {
      return {
        x: convertToNum(record[x]),
        y: convertToNum(record[y]),
        value: record[value],
      };
    });
  };

  const convertToNum = str => {
    return Number(str.replace(/[^0-9.-]+/g, ''));
  };

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio;
    const { width, height } = calculateAdjustSize(dpr);
    const needResize = $canvas.width !== width || $canvas.height !== height;

    if (needResize) {
      $canvas.width = width;
      $canvas.height = height;
    }

    return needResize;
  };
}
