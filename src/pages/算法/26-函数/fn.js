/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
 * @param {*} n
 */
function generateParenthesis(n) {
  const result = []
  const help = (left, right, str) => {
    if (left + right === 2 * n) {
      result.push(str)
      return
    }

    if (left < n) {
      help(left + 1, right, str + '(')
    }

    if (right < left) {
      help(left, right + 1, str + ')')
    }
  }

  help(0, 0, '')

  return result
}

console.log(generateParenthesis(3))

function getCandidates(candidates, target) {
  candidates.sort((a, b) => a - b)

  const result = []

  const help = (start, target, path) => {
    if (target === 0) {
      result.push(path)
      return
    }

    for (let i = start; i < candidates.length; i++) {
      const t = candidates[i]
      if (t > target) break
      path.push(t)
      help(i, target - t, [...path])

      path.pop()
    }
  }

  help(0, target, [])

  return result
}

console.log(getCandidates([2, 3, 6, 7], 7))

function getCandidates2(candidates, target) {
  candidates.sort((a, b) => a - b)

  const result = []

  const help = (start, target, path) => {
    if (target === 0) {
      result.push(path)
      return
    }

    for (let i = start; i < candidates.length; i++) {
      const t = candidates[i]
      if (t > target) break
      if (i > start && t === candidates[i - 1]) continue
      path.push(t)
      help(i + 1, target - t, [...path])

      path.pop()
    }
  }

  help(0, target, [])

  return result
}

console.log(getCandidates2([10, 1, 2, 7, 6, 1, 5], 8))
