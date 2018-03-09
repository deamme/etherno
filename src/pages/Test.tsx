import { Link } from 'laco-inferno-router'

import { Subscribe } from 'laco-inferno'
import EthStore from '../stores/Eth'

export default (
  <Subscribe to={[EthStore]}>
    {({ hasProvider, latestBlock }) => (
      <div>
        <h1>Latest Ether Block!</h1>
        <p>{hasProvider && 'Oh yeaaah'}</p>
        <p>{latestBlock && latestBlock.hash}</p>
        <Link to="/">test</Link>
      </div>
    )}
  </Subscribe>
)
