const path = require('path')

console.log(__dirname, __filename)

const pathname = path.join(__dirname, '/path.js')
console.log(pathname)

const resolvePathname = path.resolve('path.js')
const resolvePathname2 = path.resolve('/path.js')
const path1 = path.resolve('/a/b', '/c/d')
const path2 = path.resolve('/a/b', 'c/d')
const path3 = path.resolve('a/b', '/c/d')
const path4 = path.resolve('a/b', 'c/d')
const path5 = path.resolve('/a/b', '../c/d')

console.log(resolvePathname, resolvePathname2)
console.log(path1, path2, path3, path4, path5)
