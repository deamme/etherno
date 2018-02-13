const Eth = (window as any).Eth;
const web3 = (window as any).web3;
let eth;

if (typeof web3 !== "undefined") {
  eth = new Eth(web3.currentProvider);
}

export default eth;
