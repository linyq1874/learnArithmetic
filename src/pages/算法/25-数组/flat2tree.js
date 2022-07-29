// 根据parent_id生成树结构

// 递归
const nest = (items, id = null, parent = 'parent_id') =>
  items
    .filter(item => item[parent] === id)
    .map(item => ({
      ...item,
      children: nest(items, item.id)
    }))

const comments = [{ id: 6, parent_id: null }, { id: 1, parent_id: null }, { id: 2, parent_id: 1 }, { id: 3, parent_id: 1 }, { id: 4, parent_id: 2 }, { id: 5, parent_id: 4 }]

console.log('nest', JSON.stringify(nest(comments), null, 2))

// 非递归
function flat2tree (nodes, config = { id: 'id', pid: 'pid', children: 'children' }) {
  if (!Array.isArray(nodes)) {
    console.error('第一个参数必须为数组！！！')
    return
  }
  const { id, pid, children } = config

  const idMap = {}
  const jsonTree = []
  nodes.forEach(v => {
    v && (idMap[v[id]] = v)
  })

  nodes.forEach(v => {
    if (v) {
      // pid 对应不上 id 的点，为根节点，可以有多个
      const parent = idMap[v[pid]]
      if (parent) {
        (parent[children] || (parent[children] = [])).push(v)
      } else {
        jsonTree.push(v)
      }
    }
  })

  return jsonTree
}

console.log(
  'flat2tree',
  JSON.stringify(
    flat2tree(comments, {
      id: 'id',
      pid: 'parent_id',
      children: 'children'
    }),
    null,
    2
  )
)
