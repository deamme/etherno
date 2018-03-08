import { Subscribe } from 'laco-inferno'
import { Link } from 'laco-inferno-router'
import EthStore from '../stores/Eth'

import './Home.scss'

const EtherBlocks = () => (
  <Subscribe to={[EthStore]}>
    {({ hasProvider, blocks }) => (
      <div>
        <p>{hasProvider ? 'Provider available!' : 'No provider available please install Metamask'}</p>
        {blocks.map((block) => (
          <div>
            <p>{block && 'Block hash: ' + block.hash}</p>
          </div>
        ))}
      </div>
    )}
  </Subscribe>
)

const Heading = () => (
  <div styleName="headerContainer">
    <h1>LATEST ETHER BLOCKS</h1>
  </div>
)

export default (
  <div>
    <Heading />
    <EtherBlocks />
  </div>
)
