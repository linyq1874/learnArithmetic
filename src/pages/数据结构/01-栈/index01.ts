/**
 * 大鱼吃小鱼
【题目】在水中有许多鱼，可以认为这些鱼停放在 x 轴上。再给定两个数组 Size，Dir，Size[i] 表示第 i 条鱼的大小，Dir[i] 表示鱼的方向 （0 表示向左游，1 表示向右游）。这两个数组分别表示鱼的大小和游动的方向，并且两个数组的长度相等。鱼的行为符合以下几个条件:

所有的鱼都同时开始游动，每次按照鱼的方向，都游动一个单位距离；

当方向相对时，大鱼会吃掉小鱼；

鱼的大小都不一样。

输入：Size = [4, 2, 5, 3, 1], Dir = [1, 1, 0, 0, 0]

输出：3

请完成以下接口来计算还剩下几条鱼？
 *
 */




import Stack from "./Stack";

enum dir {
  'left' = 0,
  'right' = 1
}

function solution(Size: number[], Dir: number[]): number {
  const len: number = Size.length;

  if(len <= 1) {
    return len;
  }

  const stack = new Stack();

  for(let i = 0; i < len; i++) {
    const currentSize: number = Size[i];
    const currentDir: number = Dir[i];

    let hasEat: boolean = false;

    while (!stack.empty() && Dir[stack.peek()] === dir.right && currentDir === dir.left) {
      if (Size[stack.peek()] > currentSize) {
        hasEat = true;
        break;
      }

      stack.pop();
    }

    if(!hasEat) {
      stack.push(i);
    }
  }
  return stack.size;
}

const Size: number[] = [4, 2, 5, 3, 1], Dir: number[] = [1, 1, 0, 0, 0];

const result: number = solution(Size, Dir);

console.log(result);
