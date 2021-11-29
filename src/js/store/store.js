export default function Store() {
  this.records = {};

  this.init = async () => {};

  this.fetchData = async () => {
    const data = await fetch('http://localhost:3000/api/csv').then(res =>
      res.json(),
    );
    this.records = data;
    return this.records;
  };
}
