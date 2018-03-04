import EthStore from './stores/Eth'
import startApp from './app'

const Eth = (window as any).Eth
const web3 = (window as any).web3
let eth

if (typeof web3 !== 'undefined') {
  EthStore.set({ hasProvider: true }, 'Get provider')
  eth = new Eth(web3.currentProvider)
  setInterval(
    () =>
      eth
        .getBlockByNumber('latest', false)
        .then(block => EthStore.set({ block }, 'Get latest block')),
    1000,
  )
}

startApp()
