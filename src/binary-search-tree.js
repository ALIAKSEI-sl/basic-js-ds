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

  add(element) {
    function addData(binaryTree, element) {
      if (binaryTree === null) return new Node(element);
      else if (binaryTree.data < element) binaryTree.right = addData(binaryTree.right, element);
      else if (binaryTree.data > element) binaryTree.left = addData(binaryTree.left, element);
      else return binaryTree;
      return binaryTree;
    }

    this.binaryTree = addData(this.binaryTree, element);
  }

  has(element) {
    function hasData(binaryTree, element) {
      if (binaryTree === null) return false; 
      else if (binaryTree.data < element) return hasData(binaryTree.right, element);
      else if (binaryTree.data > element) return hasData(binaryTree.left, element);
      else return true;
    }

    return hasData(this.binaryTree, element);
  }

  find(element) {
    function findData(binaryTree, element) {
      if (binaryTree === null) return null;
      else if (binaryTree.data < element) return findData(binaryTree.right, element);
      else if (binaryTree.data > element) return findData(binaryTree.left, element);
      else return binaryTree;
    }

    return findData(this.binaryTree, element);
  }

  remove(element) {
    function removeData(binaryTree, element) {
      if (binaryTree === null) return null;
      if (binaryTree.data < element) {
        binaryTree.right = removeData(binaryTree.right, element);
        return binaryTree;
      } else if (binaryTree.data > element) {
        binaryTree.left = removeData(binaryTree.left, element);
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

    this.binaryTree = removeData(this.binaryTree, element);
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
