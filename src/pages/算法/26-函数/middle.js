function middle(...args) {
  const len = args.length
  if (!len) {
    console.log('arguments is empty')
    return null
  }

  if (len === 1) {
    return args[0]
  }

  args.sort((a, b) => a - b)
  const mid = len >> 1
  if (len & 1) {
    return args[mid]
  } else {
    return (args[mid] + args[mid - 1]) / 2
  }
}

console.log('mid:', middle())
console.log('mid:', middle(1))
console.log('mid:', middle(1, 2))
console.log('mid:', middle(1, 2, 3))
console.log('mid:', middle(1, 2, 3, 4))

function getRandom3to7() {
  const min = 3,
    max = 7

  return (Math.random() * (max - min + 1) + min) >> 0
}

console.log(getRandom3to7())

foo: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    if (j === 3) break foo
    // if (j === 3) break
    console.log(i, j)
  }
}
