import { render } from 'inferno'
import { Subscribe } from 'laco-inferno'
// import { Switch, Route, RouterStore } from 'laco-inferno-router'

import Home from './pages/Home'
// import Test from './pages/Test'
// import NotFound from './pages/NotFound'

export default () => {
  const App = () => (
    Home
    // <Subscribe to={[RouterStore]}>
    //   {state => (
    //     <Switch location={state.pathname}>
    //       <Route exact path="/etherno" component={Home} />
    //       <Route exact path="/test" component={Test} />
    //       <Route component={NotFound} />
    //     </Switch>
    //   )}
    // </Subscribe>
  )

  render(<App />, document.getElementById('root'))
}
