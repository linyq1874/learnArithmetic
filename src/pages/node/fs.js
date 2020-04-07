const fs = require('fs')
const path = require('path')

const pathname = path.join(__dirname, '/path.js')

const f = fs.createReadStream(pathname)

const read = fs.readFileSync(pathname).toString()
console.log('readFileSync', read)

fs.readFile(pathname, (err, data) => {
  if (err) {
    console.log('err', err)
    return
  }

  console.log('readFile', data.toString())
})

let result = ''

f.on('error', err => {
  console.log(err)
})

f.on('data', chunk => {
  result += chunk
})

f.on('end', res => {
  console.log('createReadStream', result)
})
