const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else{
      this.tail.next = node;
      this.tail = this.tail.next;
    }
  }

  dequeue() {
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }
}

module.exports = {
  Queue
};

const q = new Queue;
q.enqueue(0)
q.enqueue(1)
q.enqueue(2)
// q.dequeue()
// q.dequeue()
// q.enqueue(3)
// q.enqueue(4)
// q.enqueue(5)
console.log(q.getUnderlyingList())