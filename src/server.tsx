import { renderToString } from "inferno-server"
import { Subscribe } from 'laco-inferno'
import { Switch, Route, StaticRouter } from 'inferno-router'
import { RouteComponentProps } from 'inferno-router/Route'

import { UIStore, toggleMobileNav } from './stores/UI'

import Home from './pages/Home'
import LatestEthereumBlocks from './pages/LatestEthereumBlocks'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'

import './app.scss'

const statusHelper = (Component, statusCode: number) => {
  return ({ staticContext }: RouteComponentProps<any>) => {
    staticContext.status = statusCode
    return <Component />
  }
}

exports.handler = (event, context, callback) => {
  const path = event.path || '/'

  const routerContext = {
    status: 404
  }

  const App = () => (
    <StaticRouter location={path} context={routerContext} >
      <Subscribe to={[UIStore]}>
        {({ showMobileNav }) => (
          <div>
            <div styleName={showMobileNav ? 'overlay' : ''} onClick={toggleMobileNav}></div>
            <Navbar />
            <div styleName="container">
              <Switch>
                <Route exact path="/" render={statusHelper(Home, 200)} />
                <Route exact path="/projects/latest-ethereum-blocks" render={statusHelper(LatestEthereumBlocks, 200)} />
                <Route render={statusHelper(NotFound, 404)} />
              </Switch>
            </div>
          </div>
        )}
      </Subscribe>
    </StaticRouter>
  )

  const body = Markup('Etherno', renderToString(<App />))

  const headers = {
    'Content-Type': 'text/html',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "script-src 'self' 'unsafe-eval'",
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin'
  }

	const result = {
		statusCode: routerContext.status,
		headers,
		body
  }

  callback(null, result)
}

const Markup = (title, appContent, preloadedState?) => {
	return (
	'<!DOCTYPE html>' +
	'<html lang="en">' +
	'<head>' +
	'<meta charset="utf-8">' +
	'<meta name="viewport" content="width=device-width, initial-scale=1">' +
	'<meta name="description" content="Etherno - Ethereum projects and services">' +
	'<title>' + title + '</title>' +
	'<link href="https://fonts.googleapis.com/css?family=Lekton:700|Open+Sans" rel="stylesheet">' +
	'<link rel="stylesheet" href="/assets/styles.min.css">' +
	'</head>' +
	'<body>' +
	'<div id="root">' +
	appContent +
	'</div>' +
  // '<script>' + 'window.__PRELOADED_STATE__ = ' + preloadedState + '</script>' +
	'<script src="/assets/e40982ce-app.js"></script>' +
	'</body>' +
	'</html>'
)}
