const TEMPLATE = name =>
  `<li class='menu-item'><span><span class='icon'>●</span>${name}</span></li>`;

export default function ControlPanel($target) {
  const $panel = $target;
  this.$menuList = $panel.querySelector('ul');

  this.setState = ({ dataFilter, menuItems, getColor }) => {
    this.dataFilter = dataFilter;
    this.menuItems = menuItems;
    this.getColor = getColor;

    render(menuItems);
  };

  const render = menuItems => {
    this.$menuList.innerHTML = '';
    menuItems.forEach(menuItem => renderMenuItem(menuItem, this.$menuList));
  };

  const renderMenuItem = (menu, $menuList) => {
    const $menuItem = createMenuItemTemplate(menu).content;
    $menuList.append($menuItem);
  };

  const createMenuItemTemplate = item => {
    const $template = document.createElement('template');
    $template.innerHTML = TEMPLATE(item);
    $template.content.querySelector('.icon').style.color = this.getColor(item);

    return $template;
  };
}
