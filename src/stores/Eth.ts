import { Store } from 'laco'

const EthStore = new Store(
  {
    hasProvider: false,
    block: null,
  },
  'Eth',
)

export default EthStore
