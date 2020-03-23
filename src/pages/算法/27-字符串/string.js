const leftRotation = (str, k) => {
  if (str && k != null) {
    return str.repeat(2).substr(k, str.length)
  }

  return ''
}

const str = 'abcdefg'

console.log(leftRotation(str, 2))

const isIsomorphic = function(s, t) {
  return isEqual(getHash(s), getHash(t))
}

function getHash(target) {
  let hash = new Map()

  for (let i = 0; i < target.length; i++) {
    if (!hash.has(target[i])) {
      hash.set(target[i], [1, [i]])
    } else {
      const t = hash.get(target[i])
      t[0] += 1
      t[1].push(i)

      hash.set(target[i], t)
    }
  }

  return hash
}

function isEqual(a, b) {
  const valuesA = [...a.values()]
  const valuesB = [...b.values()]

  console.log(valuesA)

  return valuesA.every(([countA, posA], index) => {
    const [countB, posB] = valuesB[index]

    if (countA !== countB) return false

    return posA.every((item, innerIndex) => item === posB[innerIndex])
  })
}

console.log(isIsomorphic('aa', 'ab'))
