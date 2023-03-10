import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from '../../assets/symbol-2.png'

import './style.scss'

export default function Header() {
  return (
    <div className='header'>
      <div className='logo-menu-wrapper'>
        <div className='logo-wrapper'>
          <img className='logo' src={Logo}></img>
        </div>
        <div className='header-menu-wrapper'>
          <div className='header-menu-button'>
            <FontAwesomeIcon icon='cubes' />
            Menu Item
          </div>
          <div className='header-menu-button'>
            <FontAwesomeIcon icon='fa-folder-open' />
            Menu Item
          </div>
          <div className='header-menu-button'>
            <FontAwesomeIcon icon='note-sticky' />
            Menu Item
          </div>
          <div className='header-menu-button'>
            <FontAwesomeIcon icon='calendar' />
            Menu Item
          </div>
          <div className='header-menu-button'>
            <FontAwesomeIcon icon='square-check' />
            Menu Item
          </div>
          <div className='header-menu-button'>
            <FontAwesomeIcon icon='box-archive' />
            Menu Item
          </div>
        </div>
      </div>
      <div className='searchbar-wrapper'>
        <div className='searchbar'>
          <FontAwesomeIcon icon='search' />
          <input type='text' placeholder='Search' />
        </div>
      </div>
      <div className='profile-wrapper'>
        <div className='notification'>
          <FontAwesomeIcon size='xl' icon='bell' />
        </div>
        <div className='profile'>
          GM
        </div>
      </div>
    </div>
  )
}
