import LinkedList from "../linked-list/linked-list.js";

// Extend so that List can handle objects as value
export default class ObjectLinkedList extends LinkedList {
  // Method to check if a key is contained within object in the list
  containsObjKey(key, node = this.headNode) {
    if (!node) {
      return false;
    } else if (node.value.key === key) {
      return true;
    } else {
      return this.containsObjKey(key, node.nextNode);
    }
  }

  // Method to find the index of the node containing a specific value
  findObjWithKey(key, node = this.headNode, count = 0) {
    if (!node) {
      return null;
    } else if (node.value.key === key) {
      return count;
    } else {
      return this.findObjWithKey(key, node.nextNode, ++count);
    }
  }

  arrayOfKeys() {
    const arrayKeys = [];
    const length = this.size();
    for (let i = 0; i < length; i++) {
      arrayKeys.push(this.at(i).value.key);
    }
    return arrayKeys;
  }

  arrayOfValues() {
    const arrayValues = [];
    const length = this.size();
    for (let i = 0; i < length; i++) {
      arrayValues.push(this.at(i).value.value);
    }
    return arrayValues;
  }

  arrayOfEntries() {
    const arrayEntries = [];
    const length = this.size();
    for (let i = 0; i < length; i++) {
      arrayEntries.push([this.at(i).value.key, this.at(i).value.value]);
    }
    return arrayEntries;
  }
}
