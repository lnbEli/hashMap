import hash from "./hash.js";
import util from "util";
import ObjectLinkedList from "./ObjectLinkedList.js";

// HashMap factory function
export default function HashMap() {
  const initialBucketCapacity = 16;
  let currentBucketCapacity = initialBucketCapacity;
  const buckets = [];
  buckets.length = currentBucketCapacity;
  const loadFactor = 0.75;

  //Function to watch bucket capacity and enlarge if necessary
  function bucketsUsed() {
    let count = 0;
    buckets.forEach((bucket) => {
      // forEach skips over empty slots(<1 empty item>)
      count++;
    });
    return count;
  }
  //Checks if buckets are about to go over capacity
  function bucketsOverCapacity() {
    if (bucketsUsed() >= currentBucketCapacity * loadFactor) {
      return true;
    } else {
      return false;
    }
  }

  //Double bucket capacity
  function doubleBucketCapacity() {
    currentBucketCapacity = currentBucketCapacity * 2;
  }

  // Makes copy of current entries, clears all entries, doubles bucket capacity and repopulates HashMap
  function rePopulateHashMap() {
    const currentEntries = entries();
    clear();
    doubleBucketCapacity();
    currentEntries.forEach((element) => {
      set(element[0], element[1]);
    });
  }

  function set(key, value) {
    const index = hash(key, currentBucketCapacity);
    //Empty bucket. Create key value object.
    if (!buckets[index]) {
      //Check if reached load factor
      if (bucketsOverCapacity()) {
        rePopulateHashMap();
      }
      const keyValueObj = { key, value };
      buckets[index] = keyValueObj;
      // Bucket already has key value assigned.
    } else if (buckets[index].key) {
      // Key is equal to current key.
      if (buckets[index].key === key) {
        buckets[index].value = value;
        // Create LinkedList and add objects with key value pair to it.
      } else {
        const list = new ObjectLinkedList();
        list.append(buckets[index]);
        list.append({ key, value });
        buckets[index] = list;
      }
      // Check if bucket contains LinkedList.
    } else if (buckets[index] instanceof ObjectLinkedList) {
      const newKeyValueObj = { key, value };
      //Check if key already exist and if it does update it
      if (buckets[index].containsObjKey(key)) {
        const objKeyValueIndex = buckets[index].findObjWithKey(key);
        buckets[index].removeAt(objKeyValueIndex);
        buckets[index].insertAt(newKeyValueObj, objKeyValueIndex);
      } else {
        buckets[index].append(newKeyValueObj);
      }
    }
  }

  function get(key) {
    const index = hash(key, currentBucketCapacity);
    if (!buckets[index]) {
      return null;
    } else if (buckets[index].key === key) {
      return buckets[index].value;
    } else if (buckets[index] instanceof ObjectLinkedList) {
      if (buckets[index].containsObjKey(key)) {
        const objKeyValueIndex = buckets[index].findObjWithKey(key);
        const keyValueObj = buckets[index].at(objKeyValueIndex);
        return keyValueObj.value.value;
      }
    } else {
      return null;
    }
  }

  function has(key) {
    const index = hash(key, currentBucketCapacity);
    if (!buckets[index]) {
      return false;
    } else if (buckets[index].key === key) {
      return true;
    } else if (buckets[index] instanceof ObjectLinkedList) {
      if (buckets[index].containsObjKey(key)) {
        return true;
      }
    } else {
      return false;
    }
  }

  function remove(key) {
    // if key doesn't exist return false
    if (!this.has(key)) {
      return false;
    } else {
      const index = hash(key, currentBucketCapacity);
      //If key exist in bucket without colisions remove by setting to undefined
      // Use of Delete as want to maintain length of buckets array to mimic non dynamic array sizing
      if (buckets[index].key === key) {
        delete buckets[index];
        return true;
        // Remove from linkedList
      } else {
        const objKeyValueIndex = buckets[index].findObjWithKey(key);
        buckets[index].removeAt(objKeyValueIndex);
        // If only one key value pair in LinkedList, LinkedList removed and Key Value object added in its place
        if (buckets[index].size() <= 1) {
          const headNodeKeyValueObj = buckets[index].at(0);
          const newKey = headNodeKeyValueObj.value.key;
          const newValue = headNodeKeyValueObj.value.value;
          buckets[index] = { key: newKey, value: newValue };
        }
        return true;
      }
    }
  }

  function length() {
    let count = 0;
    buckets.forEach((bucket) => {
      if (bucket.key) {
        count++;
      } else if (bucket instanceof ObjectLinkedList) {
        count += bucket.size();
      }
    });

    return count;
  }

  // Resets buckets
  function clear() {
    buckets.length = 0;
    buckets.length = initialBucketCapacity;
  }

  function keys() {
    const keysArray = [];
    buckets.forEach((bucket) => {
      // If bucket doesn't have any colisions push key to keys array(No linkedList)
      if (bucket.key) {
        keysArray.push(bucket.key);
        // If conatins LinkedList iterate through keys in linkedlist and push them to keys array
      } else if (bucket instanceof ObjectLinkedList) {
        const arrayOfLinkedListKeys = bucket.arrayOfKeys();
        arrayOfLinkedListKeys.forEach((element) => {
          keysArray.push(element);
        });
      }
    });
    return keysArray;
  }

  function values() {
    const valuesArray = [];
    buckets.forEach((bucket) => {
      // If bucket doesn't have any colisions push value to values array(No linkedList)
      if (bucket.key) {
        valuesArray.push(bucket.value);
        // If conatins LinkedList iterate through keys in linkedlist and push them to keys array
      } else if (bucket instanceof ObjectLinkedList) {
        const arrayOfLinkedListValues = bucket.arrayOfValues();
        arrayOfLinkedListValues.forEach((element) => {
          valuesArray.push(element);
        });
      }
    });
    return valuesArray;
  }

  function entries() {
    const entriesArray = [];
    buckets.forEach((bucket) => {
      // If bucket doesn't have any colisions push value to values array(No linkedList)
      if (bucket.key) {
        entriesArray.push([bucket.key, bucket.value]);
        // If conatins LinkedList iterate through keys in linkedlist and push them to keys array
      } else if (bucket instanceof ObjectLinkedList) {
        const arrayOfLinkedListEntries = bucket.arrayOfEntries();
        arrayOfLinkedListEntries.forEach((element) => {
          entriesArray.push(element);
        });
      }
    });
    return entriesArray;
  }

  function view() {
    return buckets;
  }

  return {
    set,
    view,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    bucketsUsed,
  };
}
