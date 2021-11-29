const SELECTOR_TEMPLATE = (name, selected) =>
  `<option value=${name} ${selected ? 'selected' : ''}>${name}</option>`;
const OPTIONS_Y = ['Profit', 'Quantity', 'Sales', 'Discount'];
const OPTIONS_FILTER = [
  'Category',
  'Region',
  'Segment',
  'City',
  'Manufacturer',
  'State',
  'Sub-Category',
];

export default function AxisSelector($target, { dataFilter, onChange }) {
  const $selector = $target;
  const $ = selector => $selector.querySelector(selector);
  const $selectY = $('#select-y');
  const $selectFilter = $('#select-filter');

  $selectY.addEventListener('change', e => onChange($selectY.value, 'yAxis'));
  $selectFilter.addEventListener('change', e =>
    onChange($selectFilter.value, 'filter'),
  );

  this.setState = ({ dataFilter }) => {
    this.dataFilter = dataFilter;

    render();
  };

  const render = () => {
    // $('#axis-y').
    // this.$menuList.innerHtml
    $selectY.innerHTML = '';
    $selectFilter.innerHTML = '';

    OPTIONS_Y.forEach(item => renderMenuItem(item, 'yAxis'));
    OPTIONS_FILTER.forEach(item => renderMenuItem(item, 'filter'));
    // renderMenuItem();
  };

  const renderMenuItem = (menu, category) => {
    const $menuList = {
      yAxis: $selectY,
      filter: $selectFilter,
    };
    const $menuItem = createMenuItemTemplate(menu, category).content;
    $menuList[category].append($menuItem);
  };

  const createMenuItemTemplate = (item, category) => {
    const $template = document.createElement('template');
    $template.innerHTML = SELECTOR_TEMPLATE(
      item,
      this.dataFilter[category] === item,
    );
    // $template.contains.querySelector('option').classList.
    // $template.content.querySelector('option')

    return $template;
  };
}
