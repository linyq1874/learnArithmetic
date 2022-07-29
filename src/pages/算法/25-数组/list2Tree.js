

const listData = [
    {
        id: "p1",
        title: '广东',
    },
    {
        id: "p1-1",
        pid: 'p1',
        title: '广州',
    },
    {
        id: "p2",
        title: "四川",
    },
    {
        id: "p2-1",
        pid: 'p2',
        title: "成都",
    },
    {
        id: "p2-2",
        pid: 'p2',
        title: "德阳"
    },
    {
        id: "p2-3",
        pid: 'p2',
        title: "绵阳"
    },
    {
        id: "p2-1-1",
        pid: 'p2-1',
        title: "高新区",
    }
]

function list2Tree (entries) {
    const result = [];
    const map = Object.create(null);

    entries.forEach(entry => {
        map[entry.id] = entry;
    })

    entries.forEach(entry => {
        const parent = map[entry.pid];

        if (!parent) {
            result.push(entry);
        } else {
            (parent.children || (parent.children = [])).push(entry)
        }
    })

    return result;
}




function list2Tree2 (entries, pid = undefined) {
    return entries.
        filter(entry => entry.pid == pid).
        map(entry => ({
            ...entry,
            children: list2Tree2(entries, entry.id)
        }))
}

const res = JSON.stringify(list2Tree(listData), null, 2);
const res2 = JSON.stringify(list2Tree2(listData), null, 2);

// console.log(res);
// console.log(res2);



const entries = [
    {
        province: 'guangdong',
        city: 'guangzhou',
        district: 'tianhe'
    },
    {
        province: 'guangdong',
        city: 'shenzhen',
        district: 'nanshan',
    },
    {
        province: 'guangdong',
        city: 'shenzhen',
        district: 'luohu',
    },
    {
        province: 'beijing',
        city: 'beijing',
        district: 'changping',
    },
];
const levels = ['province', 'city', 'district'];

function solution(entries, levels) {
    const result = [], map = {};

    for(let i = 0; i < entries.length; i++) {
        let curMap = map, res = result;

        for (let j = 0, lLen = levels.length; j < lLen; j++) {
            const key = levels[j], field = entries[i][key];

            if(!curMap[field]) {
                const pusher = {
                    value: field
                };

                let tmp;
                if (j !== lLen - 1) {
                    tmp = [];
                    pusher.children = tmp;
                }

                curMap[field] = {pos: res.push(pusher) - 1};

                curMap = curMap[field];
                res = pusher.children;
            } else {
                curMap = curMap[field];

                res = res[curMap.pos].children
            }
        }
    }

    return result;
}


console.log(JSON.stringify(solution(entries, levels), null , 2));
