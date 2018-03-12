import { Subscribe } from 'laco-inferno'
import { Link } from 'laco-inferno-router'
import EthStore from '../stores/Eth'

import './Home.scss'

const Waiting = () => (
  <div styleName="block">Waiting for incoming block..</div>
)

const Warning = () => (
  <div styleName="block">
    <div styleName="warning">
      <img styleName="fox" src="https://metamask.io/img/metamask.png" alt="https://metamask.io/img/metamask.png" />
      <p>Please use a client that is exposing web3. You can use <a href="https://metamask.io/">MetaMask</a>.</p>
    </div>
  </div>
)

const EtherBlocks = () => (
  <Subscribe to={[EthStore]}>
    {({ blocks, hasProvider }) => (
      <div styleName="blocksContainer">
        { hasProvider ? (blocks.length ? null : (<Waiting />)) : (<Warning />) }
        {blocks.map((block, idx) => (
          <div key={block.hash} styleName={"block " + (idx === 0 ? 'fade-in blue-pulse' : '')}>
            <div styleName="infoContainer blockNumber">
              <p>{'BLOCK #' + block.number}</p>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Data</p>
              <div styleName="dataContainer">
                <p>{block && block.data}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Hash</p>
              <div styleName="dataContainer">
                <p>{block && block.hash}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Transactions</p>
              <div styleName="dataContainer">
                <p>{block && block.tx}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Uncles</p>
              <div styleName="dataContainer">
                <p>{block && block.uncles}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </Subscribe>
)

const Heading = () => (
  <div styleName="headerContainer">
    <h1 styleName="header">Latest Ether Blocks</h1>
  </div>
)

export default (
  <div>
    <Heading />
    <EtherBlocks />
  </div>
)
