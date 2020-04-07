const dayOfYear = date => ((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24) >> 0

console.log(dayOfYear(new Date()))
