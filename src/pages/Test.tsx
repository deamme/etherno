import { Link } from 'laco-inferno-router'

import { Subscribe } from 'laco-inferno'
import EthStore from '../stores/eth'

export default (
  <Subscribe to={[EthStore]}>
    {({ hasProvider, block }) => (
      <div>
        <h1>Latest Ether Block!</h1>
        <p>{hasProvider && 'Oh yeaaah'}</p>
        <p>{block && block.hash}</p>
        <Link to="/">test</Link>
      </div>
    )}
  </Subscribe>
)
