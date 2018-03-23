import { resolve } from 'path'
import { readdirSync, createReadStream, createWriteStream, unlink } from "fs"
import { createGzip } from 'zlib'

const targetDir = resolve(__dirname, '../dist/assets')
const targetFiles = readdirSync(targetDir)

const compressFile = (filePath) => new Promise((resolve, reject) => {
  const target = targetDir + '/' + filePath
  var compress = createGzip(),
      input = createReadStream(target),
      output = createWriteStream(target + '.gz');

  input.pipe(compress).pipe(output);

  output.on('end', resolve);
})

const deleteFiles = (filePath) => new Promise((resolve, reject) => {
  const target = targetDir + '/' + filePath
  unlink(target, resolve)
})

Promise.all(targetFiles.map(compressFile))
Promise.all(targetFiles.map(deleteFiles))
