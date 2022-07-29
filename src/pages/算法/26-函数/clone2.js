function isObject(target) {
    const type = typeof target;

    return (type === 'object' || type === 'function') && target !== null;
}

function clone(target, map = new WeakMap()) {
    if(!isObject(target)) {
        return target
    }

    const cloneTarget = Array.isArray(target) ? [] : {};
    if(map.has(target)) {
        return map.get(target);
    }

    map.set(target, cloneTarget);

    for(let key in target) {
        cloneTarget[key] = clone(target[key], map)
    }

    return cloneTarget;
}

const map = new Map()
map.set('a', 'a1')
map.set('b', 'b1')

const set = new Set()
set.add('aa')
set.add('bb')

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {a:1} } } } } } } } } } } },
    empty: null,
    // map,
    // set,
    fn: () => { console.log(2)}
}

target.target = target


console.log(clone(target));
