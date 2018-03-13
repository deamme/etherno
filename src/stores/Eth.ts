import { Store } from 'laco'

export default new Store(
  {
    hasProvider: false,
    latestBlock: null,
    blocks: [],
    tx: [],
    usd: 0
  },
  'Eth',
)

