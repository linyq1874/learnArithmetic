/**
 * 字典序最小的 k 个数的子序列
【题目】给定一个正整数数组和 k，要求依次取出 k 个数，输出其中数组的一个子序列，需要满足：1. 长度为 k；2.字典序最小。

输入：nums = [3,5,2,6], k = 2
输出：[2,6]

解释：在所有可能的解：{[3,5], [3,2], [3,6], [5,2], [5,6], [2,6]} 中，[2,6] 字典序最小。
 */

import Stack from "./Stack";

function findSmallSeq(A, k) {
  const len = A.length;
  if(!len || k <= 0 || len < k) {
    return []
  }

  if(len === k) {
    return A
  }

  const stack = new Stack();

  for(let i = 0; i < len; i++) {
    const item = A[i];
    const leftNumber = len - i;

    // 注意我们想要提取出k个数，所以注意控制扔掉的数的个数
    while (!stack.empty() && (stack.size + leftNumber > k) && stack.peek() > item) {
      stack.pop()
    }

    stack.push(item)
  }

  while (stack.size > k) {
    stack.pop()
  }

  return stack.stack;
}

console.log(findSmallSeq([3, 5, 2, 6], 2));
