const SELECTOR_TEMPLATE = (name, selected) =>
  `<option value=${name} ${selected ? 'selected' : ''}>${name}</option>`;
const OPTIONS_Y = ['Profit', 'Quantity', 'Sales', 'Discount'];
const OPTIONS_FILTER = [
  'Category',
  'City',
  'Manufacturer',
  'Region',
  'Segment',
  'Ship Mode',
  'State',
  'Sub-Category',
];

export default function AxisSelector($target, { dataFilter, onChange }) {
  const $selector = $target;
  const $ = selector => $selector.querySelector(selector);
  this.$selectY = $('#select-y');
  this.$selectY.addEventListener('change', e => onChange(this.$selectY.value));

  this.setState = ({ dataFilter }) => {
    this.dataFilter = dataFilter;

    render();
  };

  const render = () => {
    // $('#axis-y').
    // this.$menuList.innerHtml
    this.$selectY.innerHTML = '';
    OPTIONS_Y.forEach(item => renderMenuItem(item, this.$selectY));
    // renderMenuItem();
  };

  const renderMenuItem = (menu, $menuList) => {
    const $menuItem = createMenuItemTemplate(menu).content;
    $menuList.append($menuItem);
  };

  const createMenuItemTemplate = item => {
    const $template = document.createElement('template');
    $template.innerHTML = SELECTOR_TEMPLATE(
      item,
      this.dataFilter.yAxis === item,
    );
    // $template.contains.querySelector('option').classList.
    // $template.content.querySelector('option')

    return $template;
  };
}
