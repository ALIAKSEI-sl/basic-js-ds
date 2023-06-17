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
      return binaryTree;
    }

    this.binaryTree = addData(this.binaryTree, element);
  }

  has(element) {
    function hasData(binaryTree, element) {
      if (binaryTree === null) return false;
      else if (binaryTree.data < element) return hasData(binaryTree.right, element);
      else if (binaryTree.data > element) return hasData(binaryTree.left, element);
      return true;
    }

    return hasData(this.binaryTree, element);
  }

  find(element) {
    function findData(binaryTree, element) {
      if (binaryTree === null) return null;
      else if (binaryTree.data < element) return findData(binaryTree.right, element);
      else if (binaryTree.data > element) return findData(binaryTree.left, element);
      return binaryTree;
    }

    return findData(this.binaryTree, element);
  }

  remove(element) {
    this.binaryTree = this.removeData(this.binaryTree, element);
  }

  removeData(binaryTree, element) {
    if (binaryTree === null) return null;
      if (binaryTree.data < element) {
        binaryTree.right = this.removeData(binaryTree.right, element);
        return binaryTree;
      } else if (binaryTree.data > element) {
        binaryTree.left = this.removeData(binaryTree.left, element);
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
        return this.removeRoot(binaryTree);
      }
  }

  removeRoot(binaryTree) {
    let rightData = binaryTree.right.data;
    let rightLeft = binaryTree.right.left;
    while (rightLeft) {
      rightData = rightLeft.data;
      rightLeft = rightLeft.left;
    }

    binaryTree.data = rightData;
    binaryTree.right = this.removeData(binaryTree.right, rightData);
    return binaryTree;
  }

  min() {
    return this.extrema('min');
  }

  max() {
    return this.extrema('max');
  }

  extrema(str) {
    if (this.binaryTree === null) return null;

    let data = this.binaryTree.data;
    let child = str === 'max' ? this.binaryTree.right : this.binaryTree.left;

    while (child) {
      data = child.data;
      child = str === 'max' ? child.right : child.left;
    }

    return data;
  }
}

module.exports = {
  BinarySearchTree,
};
