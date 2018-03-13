import EthStore from './stores/Eth'
import startApp from './app'

const Eth = window['Eth']
const web3 = window['web3']
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

  fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD')
    .then((result) => result.json())
    .then((json) => {
      EthStore.set({ usd: json[0].price_usd }, 'Set ETH USD')
    })

  setInterval(async () => {
    const block = await eth.getBlockByNumber('latest', false)
    let minerBalance = await eth.getBalance(block.miner, 'latest')
    minerBalance = Eth.fromWei(minerBalance.toString(10), 'ether').slice(0, -16)
    const state = EthStore.get()
    if (state.blocks.filter(({ hash }) => block.hash === hash).length === 0) {
      const normalizedBlock = {
        hash: block.hash,
        miner: block.miner,
        minerBalance: {
          eth: minerBalance,
          usd: Math.floor(minerBalance * state.usd)
        },
        number: block.number.toString(10),
        tx: block.transactions.length,
        uncles: block.uncles.length,
        timestamp: block.timestamp.toString(10),
        difficulty: block.difficulty.toString(10),
        data: fromHex(block.extraData.substring(2)),
        reward: 3 + block.uncles.length / 32 * 3,
      }

      EthStore.set({ 
        latestBlock: normalizedBlock,
        blocks: [normalizedBlock, ...state.blocks]
      }, 'Set latest block and prepend to blocks')
    }
  }, 1000)
}

startApp()
