import menu from '../assets/icons/menu.svg';

const icons = {
  menu,
}

function getIcon(iconName) {
  return icons[iconName];
}

export default getIcon;