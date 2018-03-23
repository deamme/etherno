import { hydrate } from 'inferno'
import { Subscribe } from 'laco-inferno'
// import { Switch, Route, RouterStore } from 'laco-inferno-router'
import { Switch, Route, Router } from 'inferno-router'

import { UIStore, toggleMobileNav } from './stores/UI'

import createBrowserHistory from 'history/createBrowserHistory'

import Navbar from './components/Navbar'
import Loadable from './components/Loadable'

import './app.scss'

const history = createBrowserHistory()

export default () => {
  const App = () => (
  <Router history={history}>
    <Subscribe to={[UIStore]}>
      {({ showMobileNav }) => (
        <div>
          <div styleName={showMobileNav ? 'overlay' : ''} onClick={toggleMobileNav}></div>
          <Navbar />
          <div styleName="container">
            <Switch>
              <Route exact path="/" render={() => <Loadable bundle="Home" />} />
              <Route exact path="/projects/latest-ethereum-blocks" render={() => <Loadable bundle="LatestEthereumBlocks" />} />
              <Route render={() => <Loadable bundle="NotFound" />} />
            </Switch>
          </div>
        </div>
      )}
    </Subscribe>
  </Router>
  )

  hydrate(<App />, document.getElementById('root'))
}
