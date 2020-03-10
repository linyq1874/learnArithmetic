const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')

const str = 'hello world a b cat'

console.log(capitalize(str))

const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('')

console.log(decapitalize('Hello world!'))

const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

console.log(capitalizeEveryWord(str))
