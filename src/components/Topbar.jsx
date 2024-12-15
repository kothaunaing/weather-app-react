/** @format */

import getIcon from '../utils/getIcons';

const Topbar = () => {
  return (
    <header className='Topbar display-fl align-center'>
      <button className='button display-fl align-center justify-center'>
        <img className='icon' src={getIcon('menu')} />
      </button>
      <div className='app-title display-fl justify-center'>Weather App</div>
    </header>
  );
};

export default Topbar;
