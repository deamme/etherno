import { Subscribe } from 'laco-inferno'
import { Link } from 'inferno-router'
import { UIStore, toggleMobileNav } from '../stores/UI'

import { CrossIcon, BurgerIcon } from './Icons'

import './Navbar.scss'

export default () => (
  <Subscribe to={[UIStore]}>
    {({ showMobileNav }) => (
      <div styleName="navContainer">
        <div styleName="navbar">
          <div>
            <Link to="/" styleName="brand" className="color-primary" title="Etherno">Etherno</Link>
          </div>
          <div styleName="burger" onClick={toggleMobileNav}>
            { showMobileNav ? <CrossIcon /> : <BurgerIcon />}
          </div>
        </div>
        <nav className={showMobileNav ? '' : 'dn'} onClick={toggleMobileNav}>
          <Link to="/projects/latest-ethereum-blocks" styleName="nav-item" className="color-primary-2">Latest Ethereum Blocks</Link>
        </nav>
      </div>
    )}
  </Subscribe >
)
