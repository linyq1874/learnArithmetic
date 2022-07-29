/**
    实现一个get函数，使得下面的调用可以输出正确的结果

    const obj = { selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};

    get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name');
 */
// [ 'FE Coder', 1, 'byted']


function get (data, ...args) {
    return args.map(item => new Function('data', `try{
        return data.${item}
    }catch(e){

    }`)(data))
}

const obj = { selector: { to: { toutiao: "FE Coder" } }, target: [1, 2, { name: 'byted' }] };

console.log(get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name', 'adfa'));


function get2 (data, ...args) {
    return args.map(item => {

        let res = data;

        item.replace(/\[/g, '.')
            .replace(/\]/, '')
            .split('.')
            .map(p => res = res && res[p])
        return res;
    })
}

console.log(get2(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name', 'adfa'));
