/**
  [
     {
          id: 1,
          label: '一级 1',
          level: 0,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              level: 1,
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  level: 2,
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  level: 2,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          level: 0,
          children: [
            {
              id: 5,
              label: '二级 2-1',
              level: 1,
            },
            {
              id: 6,
              label: '二级 2-2',
              level: 1,
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          level: 0,
        },
  ]
 * @param {*} node
 */
function getTreeIds(node, result = []) {
  if (!Array.isArray(node)) {
    result.push(node.id)
    if (node.children) {
      getTreeIds(node.children, result)
    }
  }
  for (let i = 0, len = node.length; i < len; i++) {
    getTreeIds(node[i], result)
  }

  return result
}

const data = [
  {
    id: 1,
    label: '一级 1',
    level: 0,
    children: [
      {
        id: 4,
        label: '二级 1-1',
        level: 1,
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
            level: 2
          },
          {
            id: 10,
            label: '三级 1-1-2',
            level: 2
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    level: 0,
    children: [
      {
        id: 5,
        label: '二级 2-1',
        level: 1
      },
      {
        id: 6,
        label: '二级 2-2',
        level: 1
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    level: 0
  }
]

console.log('====================================')
console.log(getTreeIds(data))
console.log('====================================')
