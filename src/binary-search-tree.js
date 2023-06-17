const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.binaryTree = null;
  }

  root() {
    return this.binaryTree;
  }

  add(data) {
    function addData(binaryTree, data) {
      if (binaryTree === null) return new Node(data);
      else if (binaryTree.data === data) return binaryTree;
      else if (binaryTree.data < data) binaryTree.right = addData(binaryTree.right, data);
      else if (binaryTree.data > data) binaryTree.left = addData(binaryTree.left, data);
      return binaryTree;
    }

    this.binaryTree = addData(this.binaryTree, data);
  }

  has(data) {
    function hasData(binaryTree, data) {
      if (binaryTree === null) return false;
      else if (binaryTree.data === data) return true;
      else if (binaryTree.data < data) return hasData(binaryTree.right, data);
      else if (binaryTree.data > data) return hasData(binaryTree.left, data);
    }

    return hasData(this.binaryTree, data);
  }

  find(data) {
    function findData(binaryTree, data) {
      if (binaryTree === null) return null;
      else if (binaryTree.data === data) return binaryTree;
      else if (binaryTree.data < data) return findData(binaryTree.right, data);
      else if (binaryTree.data > data) return findData(binaryTree.left, data);
    }

    return findData(this.binaryTree, data);
  }

  remove(data) {
    function removeData(binaryTree, data) {
      if (binaryTree === null) return null;
      if (binaryTree.data < data) {
        binaryTree.right = removeData(binaryTree.right, data);
        return binaryTree;
      } else if (binaryTree.data > data) {
        binaryTree.left = removeData(binaryTree.left, data);
        return binaryTree;
      } else {
        if (binaryTree.left === null && binaryTree.right === null) return null;
        else if (binaryTree.left === null) { //правый заменяет удаленный
          binaryTree = binaryTree.right;
          return binaryTree;
        } else if (binaryTree.right === null) { //левый заменяет удаленный
          binaryTree = binaryTree.left;
          return binaryTree;
        }

        let rightData = binaryTree.right.data;
        let rightLeft = binaryTree.right.left;
        while (rightLeft) {
          rightData = rightLeft.data;
          rightLeft = rightLeft.left;
        }

        binaryTree.data = rightData;
        binaryTree.right = removeData(binaryTree.right, rightData);
        return binaryTree;
      }
    }

    this.binaryTree = removeData(this.binaryTree, data);
  }

  min() {
    if (this.binaryTree === null) return null;

    let data = this.binaryTree.data;
    let left = this.binaryTree.left;

    while (left) {
      data = left.data;
      left = left.left;
    }

    return data;
  }

  max() {
    if (this.binaryTree === null) return null;

    let data = this.binaryTree.data;
    let right = this.binaryTree.right;

    while (right) {
      data = right.data;
      right = right.right;
    }

    return data;
  }
}

module.exports = {
  BinarySearchTree,
};
