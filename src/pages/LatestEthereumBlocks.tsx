import { Subscribe } from 'laco-inferno'
import { Link } from 'laco-inferno-router'
import EthStore from '../stores/Eth'
import { format } from 'date-fns'
import formatNumber from 'format-number'

import Navbar from '../components/Navbar'

import './LatestEthereumBlocks.scss'

const Waiting = () => (
  <div styleName="block" className="color-primary-2">Waiting for incoming block..</div>
)

const Warning = () => (
  <div styleName="block">
    <div styleName="warning" className="color-primary-2">
      <img styleName="fox" src="https://metamask.io/img/metamask.png" alt="https://metamask.io/img/metamask.png" />
      <p>Please use a client that is exposing web3. You can use <a href="https://metamask.io/">MetaMask</a>.</p>
    </div>
  </div>
)

const EtherBlocks = () => (
  <Subscribe to={[EthStore]}>
    {({ blocks, hasProvider }) => (
      <div styleName="blocksContainer fade-in-up">
        { hasProvider ? (blocks.length ? null : (<Waiting />)) : (<Warning />) }
        {blocks.map((block, idx) => (
          <div key={block.hash} styleName="block" className={"color-primary-3 " + (idx === 0 ? 'fade-in' : '')}>
            <div styleName="infoContainer blockNumber color-primary-2">
              <p>{'BLOCK #' + block.number}</p>
              <p styleName="timestamp">{format(block.timestamp*1000, 'on ddd, DD MMM YYYY HH:mm:ss')}</p>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Data</p>
              <div styleName="dataContainer">
                <p>{block.data}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Hash</p>
              <div styleName="dataContainer">
                <p>{block.hash}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Miner</p>
              <div styleName="dataContainer">
                <p>{block.miner}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Miner balance</p>
              <div styleName="dataContainer">
                <p>{block.minerBalance.eth + ' ETH / ' + formatNumber()(block.minerBalance.usd) + ' USD'}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Reward</p>
              <div styleName="dataContainer">
                <p>{`~ ${block.reward} ETH`}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Transactions</p>
              <div styleName="dataContainer">
                <p>{block.tx}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p styleName="data">Uncles</p>
              <div styleName="dataContainer">
                <p>{block.uncles}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </Subscribe>
)

const Heading = () => (
  <div styleName="headerContainer" className="fade-in-down">
    <h1 styleName="header" className="color-primary-1">Latest Ethereum Blocks</h1>
  </div>
)

export default (
  <div>
    <Heading />
    <EtherBlocks />
  </div>
)
