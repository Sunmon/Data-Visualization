const TEMPLATE = name => `<li>${name}</li>`;

export default function ControlPanel($target) {
  const $panel = $target;
  this.$menuList = '';

  this.init = () => {
    this.$menuList = $panel.querySelector('ul');
  };

  this.setState = ({ dataFilter }) => {
    // this.state = state;
    this.dataFilter = dataFilter;
  };

  //   $template.innerHTML = `
  //       <li class="menu-list-item d-flex items-center py-2">
  //       <span class="w-100 pl-2 menu-name ${
  //         isSoldOut ? 'sold-out' : ''
  //       } ">${name}</span>
  //       <button
  //         type="button"
  //         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  //       >
  //         품절
  //       </button>
  //       <button
  //         type="button"
  //         class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  //       >
  //         수정
  //       </button>
  //       <button
  //         type="button"
  //         class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  //       >
  //         삭제
  //       </button>
  //     </li>`;

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
    $template.innerHTML = TEMPLATE('asdf');

    return $template;
  };
}
