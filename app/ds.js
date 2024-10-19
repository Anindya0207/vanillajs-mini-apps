//Stack
export var MyStack = function () {
  this.top = -1;
  this.arr = [];
};

MyStack.prototype.push = function (elem) {
  this.arr[++this.top] = elem;
};
MyStack.prototype.pop = function () {
  if (this.top == -1) return;
  return this.arr[this.top--];
};
MyStack.prototype.topp = function () {
  if (this.top == -1) return;
  return this.arr[this.top];
};
MyStack.prototype.empty = function () {
  return this.top == -1;
};

// Queue

export var MyQueuee = function () {
  this.array = [];
  this.front = -1;
  this.rear = -1;
};

MyQueuee.prototype.enqueue = function (el) {
  if (this.front == -1) this.front = 0;
  this.array[++this.rear] = el;
};

MyQueuee.prototype.dequeue = function () {
  if (this.front == -1 || this.rear == -1) return;
  return this.array[this.front++];
};

MyQueuee.prototype.frontt = function () {
  if (this.front == -1 || this.rear == -1) return -1;
  return this.array[this.front];
};
MyQueuee.prototype.empty = function () {
  return this.front == -1 || this.rear == -1 || this.front > this.rear;
};

//DQueue

var Node = function (val) {
  this.value = val;
  this.next = null;
  this.prev = null;
};

export var DQueue = function () {
  this.front = null;
  this.rear = null;
};

DQueue.prototype.pushFront = function (el) {
  const newNode = new Node(el);
  if (this.rear == null) {
    this.rear = newNode;
  }
  if (this.front == null) {
    this.front = newNode;
  } else {
    newNode.next = this.front;
    this.front.prev = newNode;
    this.front = newNode;
  }
};

DQueue.prototype.pushBack = function (el) {
  const newNode = new Node(el);
  if (this.front == null) {
    this.front = newNode;
  }
  if (this.rear == null) {
    this.rear = newNode;
  } else {
    newNode.prev = this.rear;
    this.rear.next = newNode;
    this.rear = newNode;
  }
};

DQueue.prototype.popFront = function () {
  if (this.front == null) {
    return;
  }
  if (this.front == this.rear) {
    const ret = this.front;
    this.front = null;
    this.rear = null;
    return ret.value;
  }
  const ret = this.front;
  const next = this.front.next;
  next.prev = null;
  this.front = next;
  return ret.value;
};

DQueue.prototype.popBack = function () {
  if (this.rear == null) {
    return;
  }
  if (this.front == this.rear) {
    const ret = this.front;
    this.front = null;
    this.rear = null;
    return ret.value;
  }
  const ret = this.rear;
  const prev = this.rear.prev;
  prev.next = null;
  this.rear = prev;
  return ret.value;
};

export class PriorityQueue {
  constructor(minMax) {
    this.heap = [];
    this.minMax = minMax || 'min';
  }
  getParent(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChild(index) {
    return 2 * index + 1;
  }
  getRightChild(index) {
    return 2 * index + 2;
  }
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = this.getParent(index);
      if (
        this.minMax == 'min' &&
        this.heap[parent].priority <= this.heap[index].priority
      )
        break;
      if (
        this.minMax == 'max' &&
        this.heap[parent].priority >= this.heap[index].priority
      )
        break;
      this.swap(index, parent);
      index = parent;
    }
  }
  heapifyDown() {
    let index = 0;
    let n = this.heap.length;
    while (true) {
      let leftIndex = this.getLeftChild(index);
      let rightIndex = this.getRightChild(index);
      let overrideIndex = index;
      if (leftIndex < n) {
        if (
          this.heap[leftIndex].priority < this.heap[overrideIndex].priority &&
          this.minMax == 'min'
        )
          overrideIndex = leftIndex;
        if (
          this.heap[leftIndex].priority > this.heap[overrideIndex].priority &&
          this.minMax == 'max'
        )
          overrideIndex = leftIndex;
      }
      if (rightIndex < n) {
        if (
          this.heap[rightIndex].priority < this.heap[overrideIndex].priority &&
          this.minMax == 'min'
        )
          overrideIndex = rightIndex;
        if (
          this.heap[rightIndex].priority > this.heap[overrideIndex].priority &&
          this.minMax == 'max'
        )
          overrideIndex = rightIndex;
      }

      if (index == overrideIndex) break;
      this.swap(index, overrideIndex);
      index = overrideIndex;
    }
  }
  peek() {
    return this.heap[0];
  }
  isEmpty() {
    return this.heap.length == 0;
  }
  dequeue() {
    if (this.heap.length == 0) return null;
    if (this.heap.length == 1) return this.heap.pop();
    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }
}

export function DisjoinSet(size) {
  this.rankArr = Array.from({ length: size }, () => 0);
  this.sizeArr = Array.from({ length: size }, () => 1);
  this.parentArr = Array.from({ length: size });
  for (let i = 0; i < size; i++) {
    this.parentArr[i] = i;
  }
}

DisjoinSet.prototype.findParent = function (pivot) {
  if (this.parentArr[pivot] == pivot) return pivot;
  this.parentArr[pivot] = this.findParent(this.parentArr[pivot]);
  return this.parentArr[pivot];
};

DisjoinSet.prototype.unionRank = function (U, V) {
  let parentU = this.findParent(U);
  let parentV = this.findParent(V);
  if (parentU == parentV) return;
  if (this.rankArr[parentU] > this.rankArr[parentV]) {
    this.parentArr[parentV] = parentU;
  } else if (this.rankArr[parentU] < this.rankArr[parentV]) {
    this.parentArr[parentU] = parentV;
  } else {
    this.parentArr[parentU] = parentV;
    this.rankArr[parentV]++;
  }
};
DisjoinSet.prototype.unionSize = function (U, V) {
  let parentU = this.findParent(U);
  let parentV = this.findParent(V);
  if (parentU == parentV) return;
  if (this.sizeArr[parentU] >= this.sizeArr[parentV]) {
    this.parentArr[parentV] = parentU;
    this.sizeArr[parentU] += this.sizeArr[parentV];
  } else {
    this.parentArr[parentU] = parentV;
    this.sizeArr[parentV] += this.sizeArr[parentU];
  }
};
DisjoinSet.prototype.getDisconnected = function () {
  let count = 0;
  console.log(this.parentArr);
  for (let i = 0; i < this.parentArr.length; i++) {
    if (this.parentArr[i] == i) {
      count++;
    }
  }
  return count;
};

export class TrieNode {
  links = {};
  flag = false;
  wordCount = 0;
  count = 0;
  getLink(ch) {
    return this.links[ch];
  }
  setLink(ch, node) {
    this.links[ch] = node;
  }
  getFlag() {
    return this.flag;
  }
  setFlag(f) {
    this.flag = f;
  }
  getCount() {
    return this.count;
  }
  setCount(c) {
    this.count = c;
  }
  getWordCount() {
    return this.wordCount;
  }
  setWordCount(c) {
    this.wordCount = c;
  }
}

var Trie = function () {
  this.root = new TrieNode();
};
Trie.prototype.insert = function (word) {
  let pivot = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      pivot.setLink(word[i], new TrieNode());
    }
    pivot = pivot.getLink(word[i]);
    pivot.setCount(pivot.getCount() + 1);
  }
  pivot.setFlag(true);
  pivot.setWordCount(pivot.getWordCount() + 1);
};
Trie.prototype.search = function (word) {
  let pivot = root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return false;
    }
    pivot = pivot.getLink(word[i]);
  }
  return !!pivot.getFlag();
};
Trie.prototype.searchPrefix = function (word) {
  let pivot = root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return false;
    }
    pivot = pivot.getLink(word[i]);
  }
  return true;
};
Trie.prototype.countWordsEqualTo = function (word) {
  let pivot = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return 0;
    }
    pivot = pivot.getLink(word[i]);
  }
  return pivot.getWordCount();
};
Trie.prototype.countWordsStartingWith = function (word) {
  let pivot = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!pivot.getLink(word[i])) {
      return 0;
    }
    pivot = pivot.getLink(word[i]);
  }
  return pivot.getCount();
};
Trie.prototype.erase = function (word) {
  let pivot = this.root;
  let nodes = [];
  for (let i = 0; i < word.length; i++) {
    nodes.push(pivot);
    pivot = pivot.getLink(word[i]);
    if (!pivot) return;
  }
  pivot.setWordCount(pivot.getWordCount() - 1);
  for (let i = word.length - 1; i >= 0; i--) {
    let node = nodes[i].getLink(word[i]);
    node.setCount(node.getCount() - 1);
    if (node.getCount() == 0) {
      delete node.links[word[i]];
    }
  }
};

export function binaryInsert(arr, value) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  arr.splice(left, 0, value);
}
