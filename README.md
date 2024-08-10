## HashMap Functionality

### Bucket Management

- **Initialization**: Starts with 16 buckets.
- **Load Factor**: Aims to maintain a load factor of 0.75 before resizing.
- **Resizing**: Doubles the bucket capacity and rehashes existing entries when the load factor threshold is exceeded.

### Basic Operations

- **`set(key, value)`**: Adds or updates key-value pairs. Handles collisions using linked lists.
- **`get(key)`**: Retrieves the value associated with a key.
- **`has(key)`**: Checks if a key exists in the map.
- **`remove(key)`**: Removes a key-value pair. Handles removal from linked lists if necessary.

### Utility Methods

- **`length()`**: Returns the total number of entries in the hash map.
- **`clear()`**: Clears the hash map but maintains the bucket capacity.
- **`keys()`**: Returns an array of all keys in the hash map.
- **`values()`**: Returns an array of all values in the hash map.
- **`entries()`**: Returns an array of key-value pairs.

### Internal Methods

- **`bucketsUsed()`**: Returns the number of buckets that are used.
- **`bucketsOverCapacity()`**: Checks if the number of used buckets exceeds the load factor threshold.
- **`enlargeBucketCapacity()`**: Calculates the new bucket capacity when resizing.
- **`rePopulateHashMap()`**: Rehashes and redistributes all entries to the new bucket array.

### Viewing Internal State

- **`view()`**: Returns the internal bucket array, which can be useful for debugging.

### Notes

- **Collision Handling**: Uses linked lists to handle collisions, which is a standard approach. The use of `ObjectLinkedList` to manage collisions allows efficient handling of multiple entries in the same bucket.
