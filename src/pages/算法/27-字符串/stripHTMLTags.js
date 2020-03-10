const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')

const html = '<h1><> </>hello<span>world</span></h1>'

console.log(stripHTMLTags(html))
