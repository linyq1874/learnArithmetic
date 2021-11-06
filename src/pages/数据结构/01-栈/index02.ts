/**
 * 找出数组中右边比我小的元素
【题目】一个整数数组 A，找到每个元素：右边第一个比我小的下标位置，没有则用 -1 表示。

输入：[5, 2]

输出：[1, -1]

A: [1,2,4,9,4,0,5] 输出：[5, 5, 5, 4, 5, -1, -1]
解释：因为元素 5 的右边离我最近且比我小的位置应该是 A[1]，最后一个元素 2 右边没有比 2 小的元素，所以应该输出 -1。

数组中右边第一个比我小的元素的位置，求解用递增栈。

解题思路：
Step 1. 首先将 A[0] = 1 的下标 0 入栈。

Step 2. 将 A[1] = 2 的下标 1 入栈。满足单调栈。

Step 3. 将 A[2] = 4 的下标 2 入栈。满足单调栈。

Step 4. 将 A[3] = 9 的下标 3 入栈。满足单调栈。

Step 5. 将 A[4] = 4 的下标 4 入栈时，不满足单调性，需要将 A[3] = 9 从栈中弹出去。下标 4 将栈中下标 3 弹出栈，记录 A[3] 右边更小的是 index = 4。

Step 6. 将 A[5] = 0 的下标 5 入栈时，不满足单调性，需要将 A[4] = 4 从栈中弹出去。下标 5 将下标 4 弹出栈，记录 A[4] 右边更小的是 index = 5。A[5] = 0 会将栈中的下标 0, 1, 2 都弹出栈，因此也需要记录相应下标右边比其小的下标为 5，再将 A[5] = 0 的下标 5 放入栈中。

Step 7. 将 A[6] = 5 的下标 6 放入栈中。满足单调性。

Step 8. 此时，再也没有元素要入栈了，那么栈中的元素右边没有比其更小的元素。因此设置为 -1.
 */

import Stack from "./Stack";



class OrderStack {
  private arr: number[];
  private size: number;
  constructor(A: number[]) {
    this.arr = A;
    this.size = A.length;
  }

  /**
   * 找出数组中右边比我小的元素
   * 采用递增栈
   */
  findRightSmall(): number[] {
    const res: number[] = new Array(this.size);

    const stack = new Stack();

    for (let i = 0; i < this.size; i++) {
      const item = this.arr[i];

      while (!stack.empty() && this.arr[stack.peek()] > item) {
        res[stack.peek()] = i;
        stack.pop()
      }

      stack.push(i)

    }

    while (!stack.empty()) {
      res[stack.peek()] = -1;
      stack.pop()
    }

    return res;
  }

  /**
  * 数组中右边第一个比我大的元素的位置
  * 采用递减栈
  */
  findRightBig(): number[] {
    const res: number[] = new Array(this.size);

    const stack = new Stack();

    for (let i = 0; i < this.size; i++) {
      const item = this.arr[i];

      while (!stack.empty() && this.arr[stack.peek()] < item) {
        res[stack.peek()] = i;
        stack.pop()
      }

      stack.push(i)

    }

    while (!stack.empty()) {
      res[stack.peek()] = -1;
      stack.pop()
    }

    return res;
  }

  /**
   * 数组中元素左边离我最近且比我小的元素的位置
   */
  findLeftSmall(): number[] {
    const res: number[] = new Array(this.size);

    const stack = new Stack();
    const A = this.arr;

    for(let i = this.size - 1; i >= 0; i--) {
      const item = A[i];

      while (!stack.empty() && A[stack.peek()] > item) {
        res[stack.peek()] = i;
        stack.pop()
      }

      stack.push(i)
    }

    while (!stack.empty()) {
      res[stack.peek()] = -1;
      stack.pop()
    }

    return res;
  }

  findLeftBig(): number[] {
    const res: number[] = new Array(this.size);

    const stack = new Stack();
    const A = this.arr;

    for (let i = this.size - 1; i >= 0; i--) {
      const item = A[i];

      while (!stack.empty() && A[stack.peek()] < item) {
        res[stack.peek()] = i;
        stack.pop()
      }

      stack.push(i)
    }

    while (!stack.empty()) {
      res[stack.peek()] = -1;
      stack.pop()
    }

    return res;
  }
}


const A = [1, 2, 4, 9, 4, 0, 5];
// const A = [];
// const A = [1];
// const A = [5, 2];
const o = new OrderStack(A)
console.log(o.findRightSmall(), o.findRightBig(), o.findLeftSmall(), o.findLeftBig());
