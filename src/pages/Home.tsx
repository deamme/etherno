import { Subscribe } from 'laco-inferno'
import { Link } from 'laco-inferno-router'
import EthStore from '../stores/Eth'
import { CounterStore, increment, decrement } from '../stores/Counter'

export default (
  <Subscribe to={[EthStore, CounterStore]}>
    {({ hasProvider, block }, { count }) => (
      <div>
        <h1>Latest Ether Block!</h1>
        <p>{hasProvider ? 'Provider available!' : 'No provider available please install Metamask'}</p>
        <p>{block && 'Block hash: ' + block.hash}</p>
        <div>
          <button onclick={decrement}>-</button>
          <span>{count}</span>
          <button onclick={increment}>+</button>
        </div>
        <Link to="/test">Link to test page</Link>
      </div>
    )}
  </Subscribe>
)
