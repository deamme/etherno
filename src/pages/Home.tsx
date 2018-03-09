import { Subscribe } from 'laco-inferno'
import { Link } from 'laco-inferno-router'
import EthStore from '../stores/Eth'

import './Home.scss'

const Waiting = () => (
  <div>Waiting for incoming block..</div>
)

const EtherBlocks = () => (
  <Subscribe to={[EthStore]}>
    {({ blocks }) => (
      <div styleName="blocksContainer">
        { blocks.length ? null : (<Waiting />) }
        {blocks.map((block, idx) => (
          <div key={block.hash} styleName={"block " + (idx === 0 ? 'fade-in blue-pulse' : '')}>
            <div styleName="infoContainer">
              <p>{'DATA ' + block.data}</p>
            </div>
            <div styleName="infoContainer">
              <p styleName="hashText">HASH</p>
              <div styleName="hashTextContainer">
                <p>{block && block.hash}</p>
              </div>
            </div>
            <div styleName="infoContainer">
              <p>{'TIMESTAMP ' + block.timestamp}</p>
            </div>
            <div styleName="infoContainer">
              <p>{'DIFFICULTY ' + block.difficulty}</p>
            </div>
            <div styleName="infoContainer">
              <p>{'TX ' + block.tx}</p>
            </div>
            <div styleName="infoContainer">
              <p>{'BLOCK #' + block.number}</p>
            </div>
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
