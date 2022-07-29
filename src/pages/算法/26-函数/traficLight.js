// 题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）

function red () {
    console.log('red');
}
function green () {
    console.log('green');
}
function yellow () {
    console.log('yellow');
}

function sleep (time) {

    return new Promise((res, rej) => {
        setTimeout(() => { res() }, time * 1000)
    })
}

async function step () {
    await sleep(3);
    red();
    await sleep(1);
    green();
    await sleep(2);
    yellow();

    step();
}

step();
