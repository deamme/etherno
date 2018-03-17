import { Subscribe } from 'laco-inferno'
import { Link } from 'laco-inferno-router'
import { UIStore, toggleMobileNav } from '../stores/UI'

import { CrossIcon, BurgerIcon } from './Icons'

import './Navbar.scss'

export default () => (
  <Subscribe to={[UIStore]}>
    {({ showMobileNav }) => (
      <div styleName="navContainer">
        <div styleName="navbar">
          <div>
            <Link to="/etherno" styleName="brand color-primary" title="Etherno">Etherno</Link>
          </div>
          <div styleName="burger" onclick={toggleMobileNav}>
            { showMobileNav ? <CrossIcon /> : <BurgerIcon />}
          </div>
        </div>
        <nav styleName={showMobileNav ? '' : 'dn'} onclick={toggleMobileNav}>
          <Link to="/etherno/latest-ethereum-blocks" styleName="nav-item color-primary-2">Latest Ethereum Blocks</Link>
        </nav>
      </div>
    )}
  </Subscribe >
)
