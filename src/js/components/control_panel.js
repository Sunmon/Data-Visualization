const MENUITEM_TEMPLATE = name =>
  `<li class='menu-item'><span><span class='icon'>●</span>${name}</span></li>`;

export default function ControlPanel($target) {
  const $panel = $target;
  const $ = selector => $panel.querySelector(selector);
  this.$menuList = $panel.querySelector('#menu-list');
  this.$axisData = $panel.querySelector('#axis-data');

  this.setState = ({ dataFilter, menuItems, getColor }) => {
    this.dataFilter = dataFilter;
    this.menuItems = menuItems;
    this.getColor = getColor;

    render(menuItems);
  };

  const render = menuItems => {
    this.$menuList.innerHTML = '';
    menuItems.forEach(menuItem => renderMenuItem(menuItem, this.$menuList));

    renderAxisData(this.dataFilter);
  };

  const renderAxisData = dataFilter => {
    $('.axis-data__x').innerHTML = `x축: ${dataFilter.xAxis}`;
    $('.axis-data__y').innerHTML = `y축: ${dataFilter.yAxis}`;
    $('.axis-data__filter').innerHTML = `범주: ${dataFilter.filter}`;
  };

  const renderMenuItem = (menu, $menuList) => {
    const $menuItem = createMenuItemTemplate(menu).content;
    $menuList.append($menuItem);
  };

  const createMenuItemTemplate = item => {
    const $template = document.createElement('template');
    $template.innerHTML = MENUITEM_TEMPLATE(item);
    $template.content.querySelector('.icon').style.color = this.getColor(item);

    return $template;
  };
}
