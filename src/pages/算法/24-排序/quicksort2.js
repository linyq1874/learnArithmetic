function quicksort(arr) {
    if(!arr.length) return [];

    let left = [], right = [], p = arr[0];

    for(let i = 1; i < arr.length; i++) {
        const t = arr[i];
        if(t <= p) {
            left.push(t)
        } else {
            right.push(t)
        }
    }

    return quicksort(left).concat(p, quicksort(right))
}

function getArr(length = 10) {
    const result = []
    for (let i = 0; i < length; i++) {
        result.push((Math.random() * 100) >>> 0)
    }

    return result
}

const arr = getArr()
console.log('before:', arr)
// const r = quickSort([...arr], 0, arr.length - 1)
// console.log('after:', r)
console.log('after2', quicksort(arr))
