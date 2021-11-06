/**
 * https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
 *
 * 柱状图中最大的矩形
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10


用栈求解的思路是：

1.先将题目给定的数组左右各添加一个元素0，为了方便确定原有数组中第一个元素和最后一个元素能不能继续扩张；

2.然后开始从左到右依次遍历数组中的元素：

3-1.如果栈为空或者当前考察的新元素值比栈顶元素值大，表明以栈顶元素值为高的矩形面积暂不能确定，所以就将当前考察的新元素入栈。在这个条件下，栈中的元素值从栈底到栈顶是依次递增的；

3-2.如果栈不为空且当前考察的新元素值比栈顶元素值小，表明以栈顶元素值为高的矩形的面积是可以确定的了。该矩形的高就是栈顶元素值，其右侧边界就是当前考察的新元素，左侧边界是栈顶元素的前一个元素，因为，在上一步中我们知道栈中元素值从栈底到栈顶是依次递增的。 因此，矩形的宽是当前考察的元素索引与栈顶元素前一个元素的索引的差值减一。

这里需要注意的是，当栈顶元素出栈后，需要继续看当前考察的新元素值是否大于新的栈顶元素值，如果是，就继续将栈顶元素弹出，然后计算以其值为高的矩形面积，直到当前考察的新元素值大于栈顶元素值时，当前考察元素入栈。

最后，由于最终计算矩形面积时，是用两个柱子的索引来确定矩形宽度的。因此，栈中存储的应该是给定数组的索引。
 */

import Stack from "./Stack";


function largestRectangleArea(heights: number[]): number {
  const H: number[] = [...heights];
  H.push(0);
  H.unshift(0);

  const stack = new Stack();
  let max: number = 0;
  for (let i = 0; i < H.length; i++) {
    const curH = H[i];

    while (!stack.empty() && H[stack.peek()] > curH) {
      const h = H[stack.pop()];
      const left = stack.peek();
      const right = i;
      const w = right - left - 1;
      max = Math.max(max, h * w);
    }

    stack.push(i);
  }

  return max;
}

const heights = [2, 1, 5, 6, 2, 3];

console.log(largestRectangleArea(heights));
