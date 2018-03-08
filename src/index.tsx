import EthStore from './stores/Eth'
import startApp from './app'

const Eth = (window as any).Eth
const web3 = (window as any).web3
let eth

if (typeof web3 !== 'undefined') {
  EthStore.set({ hasProvider: true }, 'Set provider')
  eth = new Eth(web3.currentProvider)
  setInterval(
    () =>
      eth
        .getBlockByNumber('latest', false)
        .then(block => {
          console.log(block.hash)
          const state = EthStore.get()
          if (!state.latestBlock || block.hash !== state.latestBlock.hash) {
            EthStore.set({ latestBlock: block }, 'Set latest block')
            EthStore.set({ blocks: [block].concat(state.blocks) }, 'Append block to blocks')
          }
        }),
    1000,
  )
}

startApp()
