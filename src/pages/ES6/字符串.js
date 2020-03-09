/**
 * includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

这三个方法都支持第二个参数，表示开始搜索的位置。
使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
 */
const s = 'hello world!'

console.log('startsWith:', s.startsWith('hello'))
console.log('startsWith:', s.startsWith('hello', 5))
console.log('endsWith:', s.endsWith('!'))
console.log('endsWith:', s.endsWith('hello', 5))

console.log('repeat:', s.repeat(2))

/**
 * padStart()的常见用途是为数值补全指定位数。
 * 另一个用途是提示字符串格式。
 *
 */
console.log('padStart:', '1'.padStart(2, '0'))
console.log('padStart:', '12'.padStart(2, '0'))
console.log('padStart:', '12'.padStart(10, 'yyyy-mm-dd'))
console.log('padEnd:', '1'.padEnd(2, '0'))
console.log('padEnd:', '12'.padEnd(2, '0'))
console.log('padEnd:', '12'.padEnd(10, 'yyyy-mm-dd'))

/**
 * ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串
 */

const str = '  abc  '

console.log('trim:', str.trim()) // "abc"
console.log('trimStart:', str.trimStart()) // "abc  "
console.log('trimEnd:', str.trimEnd()) // "  abc"
console.log('str:', str) // "  abc"
