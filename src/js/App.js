// import ScatterPlot from './components/scatter_plot';
import ScatterPlot from './components/scatter_plot';
import Store from './store/store';

const INITIAL_STATE = {
  xAxis: [-100, 100],
  yAxis: [0, 100],
};

export default function App($target) {
  const $canvas = document.querySelector('#canvas');

  this.state = {
    xAxis: [], // TODO: xAxis는 데이터의 max, min으로 바뀔 것
    yAxis: [],
  };

  this.init = () => {
    this.scatterPlot = new ScatterPlot($canvas);
    this.store = new Store();
    // this.store.readCSV();
    this.setState(INITIAL_STATE);
    this.store.init();
  };

  this.setState = state => {
    this.state = state;
    this.scatterPlot.setState(state);
  };
}
