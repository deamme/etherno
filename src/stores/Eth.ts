import { Store } from 'laco'

const EthStore = new Store(
  {
    hasProvider: false,
    latestBlock: null,
    blocks: []
  },
  'Eth',
)

export default EthStore
