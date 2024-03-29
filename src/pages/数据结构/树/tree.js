class Node {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
	}
}

class Tree {
	constructor() {
		this.root = null
	}

	addNode (val) {
		this.root = this._addNode(this.root, val)
	}

	_addNode (node, val) {
		if (!node) {
			return new Node(val)
		}
		if (val <= node.val) {
			node.left = this._addNode(node.left, val)
		}
		if (val > node.val) {
			node.right = this._addNode(node.right, val)
		}

		return node
	}

	// 按照数组的顺序创建tree，遇见null则跳过
	levelAddNode (nodes) {
		const queen = []
		const len = nodes.length
		let i = 0
		if (!nodes || !len) return null

		const root = new Node(nodes[i++])
		queen.push(root)

		while (queen.length && i < len) {
			let size = queen.length

			while (size--) {
				const node = queen.shift()
				const left = nodes[i++]
				const right = nodes[i++]

				// 注意不能是绝对不等于， 会漏掉undefined
				if (left != null) {
					node.left = new Node(left)
					queen.push(node.left)
				}
				if (right != null) {
					node.right = new Node(right)
					queen.push(node.right)
				}
			}
		}

		return (this.root = root)
	}

	prevTravel () {
		const result = this._prevTravel(this.root)
		console.log('prevTravel:', result)
		console.log('非递归')
		this.$prevTravel(this.root)
	}

	_prevTravel (node, result = []) {
		if (node) {
			// console.log(`${node.val} ->`)
			result.push(node.val)
			this._prevTravel(node.left, result)
			this._prevTravel(node.right, result)
		}
		return result
	}

	/**
	 * 非递归
	 * 取跟节点为目标节点， 开始遍历
	 1. 访问目标节点
	 2. 左孩子入栈 - > 直至左孩子为空的节点
	 3. 节点出栈， 以右孩子为目标节点， 再依次执行1、 2、 3
	 * @param {*} node
	 */
	$prevTravel (node) {
		const result = []
		const stack = []
		let current = node
		while (current || stack.length) {
			while (current) {
				result.push(current.val)
				stack.push(current)
				current = current.left
			}
			current = stack.pop()
			current = current.right
		}

		// return result
		console.log(result)
	}

	midTravel () {
		const result = this._midTravel(this.root)
		console.log('midTravel:', result)
		console.log('非递归')
		this.$midTravel(this.root)
	}

	_midTravel (node, result = []) {
		if (node) {
			this._midTravel(node.left, result)
			// console.log(`${node.val} ->`)
			result.push(node.val)
			this._midTravel(node.right, result)
		}
		return result
	}

	/**
	 * 非递归
	 * 取跟节点为目标节点， 开始遍历
	 1. 左孩子入栈 - > 直至左孩子为空的节点
	 2. 节点出栈 - > 访问该节点
	 3. 以右孩子为目标节点， 再依次执行1、 2、 3
	 * @param {*} node
	 */
	$midTravel (node) {
		const result = []
		const stack = []
		let current = node
		while (current || stack.length) {
			while (current) {
				stack.push(current)
				current = current.left
			}
			current = stack.pop()
			result.push(current.val)
			current = current.right
		}

		console.log(result)

		// return result
	}

	nextTravel () {
		const result = this._nextTravel(this.root)
		console.log('nextTravel:', result)
		console.log('非递归')
		this.$nextTravel(this.root)
		this.$nextTravel2(this.root)
	}

	_nextTravel (node, result = []) {
		if (node) {
			this._nextTravel(node.left, result)
			this._nextTravel(node.right, result)
			// console.log(node.val);
			result.push(node.val)
		}

		// console.log(result);
		return result
	}

	$nextTravel (node) {
		const stack = [],
			result = []
		let last = null,
			current = node

		while (current || stack.length) {
			while (current) {
				stack.push(current)
				current = current.left
			}

			current = stack[stack.length - 1]

			if (!current.right || current.right === last) {
				current = stack.pop()
				result.push(current.val)
				last = current
				// current 为null，跳过下一轮的 while(current)循环
				current = null
			} else {
				current = current.right
			}
		}

		// return result
		console.log(result)
	}

	$nextTravel2 (node) {
		let stack = [],
			result = [],
			set = new Set();
		if (node === null) return [];

		while (node || stack.length) {
			while (node) {
				stack.push(node);
				node = node.left;
			}

			let current = stack[stack.length - 1];


			if (current.right && !set.has(current.right)) {
				node = current.right;

				set.add(current.right)
			} else {
				let n = stack.pop()
				result.push(n.val)
			}

		}

		console.log('后序遍历（迭代法）：', result)
	}



	levelTravel () {
		let root = this.root,
			level = 0,
			queen = [],
			result = []
		if (!root) return []
		queen.push(root)

		while (queen.length) {
			let size = queen.length
			result.push([])

			while (size--) {
				const node = queen.shift()
				result[level].push(node.val)

				node.left && queen.push(node.left)
				node.right && queen.push(node.right)
			}

			level++
		}

		return result
	}

	levelTravel2 () {
		let root = this.root,
			queen = [],
			result = [],
			level = 0;

		if (!root) return [];
		queen.push(root);

		while (queen.length) {
			let size = queen.length;
			result.push([]);
			while (size--) {
				const node = queen.shift();
				result[level].push(node.val);

				node.left && queen.push(node.left);
				node.right && queen.push(node.right)
			}

			level++;
		}

		return result;
	}
	levelTravelReverse () {
		let root = this.root,
			level = 0,
			queen = [],
			result = []
		if (!root) return []
		queen.push(root)

		while (queen.length) {
			let size = queen.length
			result.push([])

			while (size--) {
				const node = queen.shift()
				result[level].push(node.val)

				node.left && queen.push(node.left)
				node.right && queen.push(node.right)
			}
			if (level & 1) result[level].reverse()
			level++
		}

		return result
	}

	leftView () {
		let root = this.root,
			result = [],
			queen = []

		if (!root) return []
		queen.push(root)

		while (queen.length) {
			let size = queen.length
			result.push(queen[0].val)

			while (size--) {
				const node = queen.shift()

				node.left && queen.push(node.left)
				node.right && queen.push(node.right)
			}
		}

		return result
	}
	rightView () {
		let root = this.root,
			result = [],
			queen = []

		if (!root) return []
		queen.push(root)

		while (queen.length) {
			let size = queen.length
			result.push(queen[0].val)

			while (size--) {
				const node = queen.shift()

				// 右视图先放右节点
				node.right && queen.push(node.right)
				node.left && queen.push(node.left)
			}
		}

		return result
	}
	rightView2 () {
		let root = this.root,
			result = [],
			queen = []

		if (!root) return []
		queen.push(root)

		while (queen.length) {
			let size = queen.length
			result.push(queen[size - 1].val)

			while (size--) {
				const node = queen.shift()

				// 右视图先放右节点
				node.left && queen.push(node.left)
				node.right && queen.push(node.right)
			}
		}

		return result
	}

	/**
	 * 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
	 * 如果二叉树的两个节点深度相同，但父节点不同，则它们是一对堂兄弟节点。
	 * 我们给出了具有唯一值的二叉树的根节点 root，以及树中两个不同节点的值 x 和 y。
	 * 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true。否则，返回 false。

	 * 来源：力扣（LeetCode）
	 * 链接：https://leetcode-cn.com/problems/cousins-in-binary-tree
	 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
	 * @param {TreeNode} root
	 * @param {number} x
	 * @param {number} y
	 * @return {boolean}
	 */
	isCousins (x, y) {
		const root = this.root
		// 当前节点和父节点
		const queue = [[root, null]]
		if (!root || root === x || root === y) return false
		while (queue.length) {
			let size = queue.length
			const filters = queue.filter(([node]) => node.val === x || node.val === y)
			if (filters.length === 1) return false
			if (filters.length === 2 && filters[0][1] !== filters[1][1]) {
				return true
			}
			while (size--) {
				const [node] = queue.shift()

				if (node) {
					node.left && queue.push([node.left, node])
					node.right && queue.push([node.right, node])
				}
			}
		}

		return false
	}

	// 最大深度也可以用层序遍历的level获取
	maxDepth () {
		return this._maxDepth(this.root)
	}

	_maxDepth (node) {
		if (!node) return 0
		return Math.max(this._maxDepth(node.left), this._maxDepth(node.right)) + 1
	}

	minDepth () {
		return this._minDepth(this.root)
	}
	_minDepth (node) {
		if (!node) return 0
		if (!node.left) return this._minDepth(node.right) + 1
		if (!node.right) return this._minDepth(node.left) + 1

		return Math.min(this._minDepth(node.left), this._minDepth(node.right)) + 1
	}

	// 镜像
	reflection () {
		const root = this.root

		if (!root) return true
		const validate = (node1, node2) => {
			if (!node1 && !node2) return true
			if (!node1 || !node2 || node1.val !== node2.val) return false

			return validate(node1.left, node2.right) && validate(node1.right, node2.left)
		}

		return validate(root.left, root.right)
	}

	// 镜像 迭代版本
	reflection2 () {
		const queue = [],
			root = this.root
		if (!root) return true

		queue.push(root)
		while (queue.length) {
			// ! 无论是左视图还是右视图，还是判断镜像，要在循环size之前做一些操作
			if (!this._reflection2(queue)) {
				return false
			}
			let size = queue.length
			while (size--) {
				const node = queue.shift()
				// node 不为空才推进去，不存在左右子树，则推入null
				if (node) {
					queue.push(node.left)
					queue.push(node.right)
				}
			}
		}

		return true
	}

	_reflection2 (queue) {
		let left = 0,
			right = queue.length - 1
		while (left < right) {
			const l = queue[left],
				r = queue[right]
			if (!l || !r) {
				// 一个为null，一个不为null
				if (l !== r) return false
			} else {
				if (l.val !== r.val) {
					return false
				}
			}
			left++
			right--
		}

		return true
	}

	getMirror () {
		const root = this.root

		// const help = node => {
		//   if (node) {
		//     ;[node.left, node.right] = [node.right, node.left]
		//     help(node.right)
		//     help(node.left)
		//   }
		// }

		// help(root)
		// return root

		let stack = [root]
		while (stack.length > 0) {
			let cur = stack.pop()
			if (cur === null) continue
				;[cur.left, cur.right] = [cur.right, cur.left]
			stack.push(cur.left)
			stack.push(cur.right)
		}
		return root
	}

	// 根节点到子节点的所有路径
	// allPath: [ '3->1->0', '3->1->2', '3->5->4', '3->5->6->8->7' ]
	allPath () {
		const root = this.root,
			path = [],
			result = []

		if (!root) return []

		const dfs = node => {
			if (!node) return null

			// 前序遍历
			path.push(node)
			if (!node.left && !node.right) {
				result.push(path.map(item => item.val).join('->'))
			}

			dfs(node.left)
			dfs(node.right)

			// 注意每访问完一个节点记得把它从path中删除，达到回溯效果
			path.pop()
		}

		dfs(root)

		return result
	}

	allPath2 () {
		let node = this.root,
			stack = [],
			result = [],
			set = new Set();

		if (!node) return [];

		while (node || stack.length) {
			while (node) {
				stack.push(node);
				node = node.left;
			}

			const current = stack[stack.length - 1];
			if (!current.right && !current.left) {
				result.push(stack.map(item => item.val).join('->'))
			}
			if (current.right && !set.has(current.right)) {
				node = current.right;

				set.add(current.right)
			} else {
				stack.pop()
			}
		}

		return result
	}

	/**
	 * 二叉树中和为某一值的路径
	 * 输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
	 * !路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径
	 *
	 * !套用回溯算法的思路
	 * @param {*} sum
	 */
	allSumPath (sum) {
		const root = this.root,
			result = [],
			path = []

		if (!root) return []

		// 递归时，带上count，回溯时，count值自动回溯到之前的数值
		const dfs = (node, count) => {
			if (!node) return []

			// 前序遍历，先判断是否符合条件，再遍历
			path.push(node)
			count += node.val

			if (!node.left && !node.right && count === sum) {
				result.push(path.map(item => item.val).join('->'))
			}

			dfs(node.left, count)
			dfs(node.right, count)

			// 注意每访问完一个节点记得把它从path中删除，达到回溯效果
			path.pop()
		}

		dfs(root, 0)

		return result
	}

	/**
	 * 和为某一值的所有路径，路径可以不经过根节点
	 * @param {Number} sum
	 */
	pathSum (sum) {
		const root = this.root,
			result = [],
			path = []
		if (!root) return []

		const help = (node, count) => {
			if (!node) return

			// 让每个节点都从头开始继续向下遍历
			if (!node.isVisited) {
				node.isVisited = true
				node.left && help(node.left, 0)
				node.right && help(node.right, 0)
			}
			path.push(node)

			count += node.val

			if (count === sum) {
				result.push(path.map(item => item.val).join('->'))
			}

			node.left && help(node.left, count)
			node.right && help(node.right, count)
			path.pop()
		}

		help(root, 0)

		return result
	}

	// 最近公共祖先
	commonAncestor (p, q) {
		return this._commonAncestor(this.root, p, q).val
	}

	/**
	 * 深度优先遍历二叉树，如果当前节点为 p 或者 q，直接返回这个节点，
	 * 否则查看左右孩子，左孩子中不包含 p 或者 q 则去找右孩子，
	 * 右孩子不包含 p 或者 q 就去找左孩子，
	 * 剩下的情况就是左右孩子中都存在 p 或者 q, 那么此时直接返回这个节点。
	 */
	_commonAncestor (node, p, q) {
		// 相等说明公共祖先为其中某个相等的点
		if (!node || node.val === p || node.val === q) return node

		let left = this._commonAncestor(node.left, p, q)
		let right = this._commonAncestor(node.right, p, q)

		if (!left) return right
		if (!right) return left

		// 左右都存在，则说明该节点为公共祖先
		return node
	}

	/**
	 * 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。
	 * 这条路径可能穿过根结点。
		示例 :
		给定二叉树
				  1
				/ \
				2   3
			  / \
			  4   5
		复制代码返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
		注意：两结点之间的路径长度是以它们之间边的数目表示。

	 * 设置了一个max全局变量，深度优先遍历这棵树，每遍历完一个节点就更新max，
	 * 并通过返回值的方式自底向上把当前节点左右子树的最大高度传给父函数使用，
	 * 使得每个节点只需访问一次即可。
	 */
	maxLength () {
		const root = this.root
		if (!root) return 0
		let max = 0

		const maxDepth = node => {
			if (!node) return 0

			// !后序遍历
			let left = node.left ? maxDepth(node.left) + 1 : 0
			let right = node.right ? maxDepth(node.right) + 1 : 0

			max = Math.max(max, left + right)

			// 这个返回的操作相当关键
			return Math.max(left, right)
		}

		maxDepth(root)
		return max
	}

	maxLength2 () {
		let node = this.root;
		if (!node) return 0;
		let max = 0;
		const help = (node) => {
			if (!node) return 0;

			let left = node.left ? help(node.left) + 1 : 0;
			let right = node.right ? help(node.right) + 1 : 0;

			max = Math.max(max, left + right);
			return Math.max(left, right)
		}

		help(node);

		return max
	}

	/**
	 * 给定一个非空二叉树，返回其最大路径和。
		本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。
		该路径至少包含一个节点，且不一定经过根节点。
		示例:
		输入: [-10,9,20,null,null,15,7]

		  -10
		  / \
		  9  20
			/  \
		  15   7

		输出: 42 (15 + 20 + 7)
	 */
	maxPathSum () {
		const root = this.root
		if (!root) return 0

		let max = Number.MIN_SAFE_INTEGER

		const maxSum = node => {
			if (!node) return 0

			// !后序遍历
			// 最大值为0，说明左子树或者右字数数值为负值，不参与计算
			let left = Math.max(maxSum(node.left), 0)
			let right = Math.max(maxSum(node.right), 0)

			max = Math.max(max, left + right + node.val)

			return Math.max(left, right) + node.val
		}

		maxSum(root)

		return max
	}

	/**
	 * 判断是否是搜索二叉树
	 *
	 * 通过中序遍历，保存前一个节点的值，扫描到当前节点时，
	 * 和前一个节点的值比较，如果大于前一个节点，则满足条件，
	 * 否则不是二叉搜索树。
	 */
	isAVL () {
		const root = this.root
		let prev = null

		if (!root) return true

		const validate = node => {
			if (!node) return true

			if (!validate(node.left)) return false

			if (prev && prev >= node.val) return false

			prev = node.val

			return validate(node.right)
		}

		return validate(root)
	}

	/**
	 * 将有序数组转化为高度平衡二叉搜索树
	 * @param {Array} arr
	 */
	sortedArrayToBST (arr) {
		const help = (left, right) => {
			if (left > right) return null
			if (left === right) return new Node(arr[left])

			let mid = (left + right) >> 1

			let node = new Node(arr[mid])

			node.left = help(left, mid - 1)
			node.right = help(mid + 1, right)

			return node
		}

		this.root = help(0, arr.length - 1)
	}

	/**
	 * 判断后序遍历能否构成二叉搜索树，每个节点数据不一样
	 * !二叉搜索树按顺序排序，则左子树小于根节点，右子树大于根节点,递归左右子树
	 * @param {Array} seq
	 * @returns boolean
	 */
	VerifySequenceOfBST (seq) {
		const len = seq.length
		if (seq && len) {
			const root = seq[len - 1]

			// 以下操作，记得都得小于len-1，排除掉根节点，i要单独定义，才能被第二个for循环使用
			let i
			for (i = 0; i < len - 1; i++) {
				// 大于，则说明到达右子树
				if (seq[i] > root) break
			}
			let j
			for (j = i; j < len - 1; j++) {
				// 小于，则说明无法构成二叉搜索树
				if (seq[i] < root) return false
			}

			let left = true
			if (i > 0) {
				left = this.VerifySequenceOfBST(seq.slice(0, i))
			}
			let right = true
			if (i < len - 1) {
				// 除掉根节点
				right = this.VerifySequenceOfBST(seq.slice(i, len - 1))
			}

			return left && right
		}
	}

	/**
	 * 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
	 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
	 * 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，
	 * 则重建二叉树并返回。
	 * @param {Array} prev
	 * @param {Array} mid
	 */
	rebuild (prev, mid) {
		const help = (prev, mid) => {
			if (!prev || !prev.length) return null

			const head = prev[0]
			if (prev.length === 1) return new Node(head)

			const index = mid.indexOf(head)

			const prevLeft = prev.slice(1, index + 1)
			const prevRight = prev.slice(index + 1)

			const midLeft = mid.slice(0, index)
			const midRight = mid.slice(index + 1)

			const node = new Node(head)
			node.left = help(prevLeft, midLeft)
			node.right = help(prevRight, midRight)

			return node
		}

		this.root = help(prev, mid)
	}

	/**
	 * 根据前序中序，获取后序
	 * @param {*} prev
	 * @param {*} mid
	 */
	getNextTravel (prev, mid) {
		if (!prev || !prev.length) return []
		if (prev.length === 1) return prev

		const head = prev[0]
		const index = mid.indexOf(head)

		const prevLeft = prev.slice(1, index + 1)
		const prevRight = prev.slice(index + 1)
		const midLeft = mid.slice(0, index)
		const midRight = mid.slice(index + 1)

		return this.getNextTravel(prevLeft, midLeft) + this.getNextTravel(prevRight, midRight) + head
	}

	/**
	 * 输入一棵二叉树，判断该二叉树是否是平衡二叉树。
	 * ! 平衡二叉树：每个子树的深度之差不超过1
	 *
	 * !! 后续遍历二叉树
	 * 在遍历二叉树每个节点前都会遍历其左右子树
	 * 比较左右子树的深度，若差值大于1 则返回一个标记 -1表示当前子树不平衡
	 * 左右子树有一个不是平衡的，或左右子树差值大于1，则整课树不平衡
	 * 若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）
	 */
	isBalanceTree () {
		const root = this.root

		const help = node => {
			if (!node) return 0

			// 后序遍历
			const left = help(node.left)
			const right = help(node.right)

			// 后序遍历完之后的操作
			if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
				return -1
			}

			return Math.max(left, right) + 1
		}

		return help(root) !== -1
	}
}

const tree = new Tree()

// const len = 5

// for (let i = 0; i < len; i++) {
//   tree.addNode(Math.ceil(Math.random() * 100))
// }

const nodes = [3, 5, 1, 6, 2, 0, 8, 7, 4]

nodes.forEach(node => {
	tree.addNode(node)
})

tree.prevTravel()
tree.midTravel()
tree.nextTravel()
console.log('levelTravel:', tree.levelTravel())
console.log('levelTravel2:', tree.levelTravel2())
console.log('levelTravelReverse:', tree.levelTravelReverse())
console.log('leftView:', tree.leftView())
console.log('rightView:', tree.rightView())
console.log('rightView2:', tree.rightView2())
console.log('maxDepth:', tree.maxDepth())
console.log('minDepth:', tree.minDepth())
console.log('allPath:', tree.allPath())
console.log('allPath2:', tree.allPath2())

const random = (len = 9) => (Math.random() * len) >> 0
const p = random()
const q = random()
console.log('p:', p, 'q:', q, 'commonAncestor:', tree.commonAncestor(p, q))

const roots = [3, 5, 1, 6, 2, 0, 8, null, null, -2, 1, null, 10, null, null, 9, 12, 11]

const tree2 = new Tree()

tree2.levelAddNode(roots)

console.log('tree2:', tree2.levelTravel())
console.log('tree2 AllPath:', tree2.allPath())
console.log('tree2 allSumPath:', tree2.allSumPath(8))
console.log('tree2 pathSum:', tree2.pathSum(8))
console.log('tree2maxLength:', tree2.maxLength())
console.log('tree2maxLength2:', tree2.maxLength2())

const roots2 = [1, 2, 3, null, 4, null, 5]

const tree3 = new Tree()

tree3.levelAddNode(roots2)
console.log('tree3 maxSum:', tree3.maxPathSum())
console.log('tree3 isCousins:', tree3.isCousins(5, 4))

const avlNodes = [2, 1, 1, 4, 5, 5, 4]
const tree4 = new Tree()

tree4.levelAddNode(avlNodes)
console.log('isAVL:', tree4.isAVL())
console.log('reflection:', tree4.reflection())
console.log('reflection2:', tree4.reflection2())

const sortArr = [-10, -3, 0, 5, 9, 10, 25, 40]

const tree5 = new Tree()
tree5.sortedArrayToBST(sortArr)
console.log('tree5 levelTravel:', tree5.levelTravel())
const postTravel = [1, 2, 3, 5, 6, 7, 8, 9, 10, 4]
console.log('tree5 VerifySequenceOfBST:', tree5.VerifySequenceOfBST(postTravel))

const tree6 = new Tree()
const nodes6 = [8, 10, 6, 11, 9, 7, 5]

tree6.levelAddNode(nodes6)
console.log('tree6:', tree6)
console.log('mirror:', tree6.getMirror())
