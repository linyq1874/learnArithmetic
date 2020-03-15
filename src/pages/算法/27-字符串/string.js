const leftRotation = (str, k) => {
  if (str && k != null) {
    return str.repeat(2).substr(k, str.length)
  }

  return ''
}

const str = 'abcdefg'

console.log(leftRotation(str, 2))
