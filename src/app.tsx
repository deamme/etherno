import { render } from 'inferno'
import { Subscribe } from 'laco-inferno'
import { Switch, Route, RouterStore } from 'laco-inferno-router'

import { UIStore, toggleMobileNav } from './stores/UI'

import Home from './pages/Home'
import LatestEthereumBlocks from './pages/LatestEthereumBlocks'
import Test from './pages/Test'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'

import './app.scss'

export default () => {
  const App = () => (
    <Subscribe to={[RouterStore, UIStore]}>
      {({ pathname }, { showMobileNav }) => (
        <div>
          <div styleName={showMobileNav ? 'overlay' : ''} onClick={toggleMobileNav}></div>
          <Navbar />
          <div styleName="container">
            <Switch location={pathname}>
              <Route exact path="/etherno" component={Home} />
              <Route exact path="/etherno/latest-ethereum-blocks" component={LatestEthereumBlocks} />
              <Route exact path="/test" component={Test} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      )}
    </Subscribe>
  )

  render(<App />, document.getElementById('root'))
}
