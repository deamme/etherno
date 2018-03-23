const test = require('./dist/server')

test.handler({ path: '/projects/latest-ethereum-blocks' }, {}, (result) => {
  console.log('test')
})
