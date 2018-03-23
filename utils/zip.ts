import { resolve } from 'path'
import { readdirSync, createReadStream, createWriteStream } from "fs"
import archiver from 'archiver'

// create a file to stream archive data to.
var output = createWriteStream(__dirname + '/example.zip');


const targetDir = resolve(__dirname, '../dist')
const targetFiles = readdirSync(targetDir)

const compressFile = (filePath) => new Promise((resolve, reject) => {
  const target = targetDir + '/' + filePath
  let compress = archiver('zip', { zlib: { level: 9 } }),
    input = createReadStream(target),
    output = createWriteStream(target + '.zip');

  input.pipe(compress).pipe(output);

  output.on('end', resolve);
})

const deleteFiles = (filePath) => new Promise((resolve, reject) => {
  const target = targetDir + '/' + filePath
  unlink(target, resolve)
})

Promise.all(targetFiles.map(compressFile))
// Promise.all(targetFiles.map(deleteFiles))
