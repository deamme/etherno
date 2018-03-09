import EthStore from './stores/Eth'
import startApp from './app'

const Eth = (window as any).Eth
const web3 = (window as any).web3
let eth

function fromHex(h) {
  var s = ''
  for (var i = 0; i < h.length; i+=2) {
      s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
  }
  return decodeURIComponent(escape(s))
}

if (typeof web3 !== 'undefined') {
  EthStore.set({ hasProvider: true }, 'Set provider')
  eth = new Eth(web3.currentProvider)
  setInterval(
    () =>
      eth
        .getBlockByNumber('latest', false)
        .then(block => {
          const state = EthStore.get()
          if (state.blocks.filter(({ hash }) => block.hash === hash).length === 0) {
            const normalizedBlock = {
              hash: block.hash,
              number: block.number.toString(10),
              tx: block.transactions.length,
              timestamp: block.timestamp.toString(10),
              difficulty: block.difficulty.toString(10),
              data: fromHex(block.extraData.substring(2))
            }

            EthStore.set({ 
              latestBlock: normalizedBlock,
              blocks: [normalizedBlock, ...state.blocks]
            }, 'Set latest block and prepend to blocks')
          }
        }),
    1000,
  )
}

startApp()
