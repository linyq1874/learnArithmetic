function quicksort(arr, left, right) {
  if (right < left) {
    return
  }

  let p = arr[left],
    i = left,
    j = right;

  while (i < j) {
    while (arr[j] >= p && i < j) {
      j--
    }

    while (arr[i] <= p && i < j) {
      i++
    }

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  arr[left] = arr[i]
  arr[i] = p

  quicksort(arr, left, i - 1)
  quicksort(arr, i + 1, right)

  return arr
}

const arr = []

for (let index = 0; index < ((Math.ceil(Math.random() * 5) + 5)); index++) {
  arr.push(Math.ceil(Math.random() * 10))
}

console.log('before: ', arr)

const result = quicksort([...arr], 0, arr.length - 1)

console.log('after: ', result);