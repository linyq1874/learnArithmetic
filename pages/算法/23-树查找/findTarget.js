/**
 * [
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
 */

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

function find(data, target) {
  if (!Array.isArray(data)) {
    if (data.id === target) {
      return data.label
    }

    if (!data.children) {
      return null
    }
    return find(data.children, target)
  }
  for (let i = 0, len = data.length; i < len; i++) {
    const result = find(data[i], target)
    if (result) {
      return result
    }
  }
}

console.log('====================================')
console.log(find(data, 3))
console.log('====================================')
