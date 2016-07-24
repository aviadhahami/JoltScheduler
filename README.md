# JoltScheduler

This project is a part of my application process to [Jolt](jolt.us).
The scheduler enables one to queue tasks for a certain time without being worried of their insertion order or due date.

# Usage
1. Import scheduler
```javascript
let JoltScheduler = require('./JoltScheduler/index')
OR
import JoltScheduler from './JoltScheduler/index'
```
2. Create new JoltScheduler
```javascript
let scheduler = new JoltScheduler()
```
3. Append new entries
```javascript
let task = {
    name: 'my task',
    st: Date.now(),
    callback: function(){ return 1;}
}
scheduler.insert(task)
```
4. Wait for invocation :)
 
# Important!
The task object passed to the scheduler should be of the following shape( or form or model or w/e u call it)
```javascript
{
    name: <String>,
    st: <Number>,
    callback: <Function>
}
```
If failed to create this kind of objects, you'll hit an exception

# Full API
| API       | Description |
| ------------- |-------------|
| size     | Property.  Returns the amount of tasks waiting |
| insert(item)      | Inserts an item of the shape ```task```. Returns entry id      | 
| modify(id,newEntry) | Modifies an existing entry's props ```name, st or callback``` given the right id. One should pass an object composed at least from one of those fields in order to properly modify an entry     |
|remove(id)| Deletes an entry given the right id and under the assumption it wasn't executed yet|

# Data Model
The data model here is composed of min-heap and hash table.
The hash is used in order to keep pointers into the heap itself in order
to modify nodes. (Otherwise it's `O(n)` only for searching the node).

Insertion is `O(log n)`, updates are `O(1)` unless they are time updates.
Time updates force re-bubbling of the specific node in the tree, yielding time-complexity of `O(log n)`

Deletion (not pop but an arbitrary item) is of `O(n)` for search in heap and `O(n)` for heapifying thus `O(n)`

# Testing
Supplied by Mocha. Either run ```$ npm install``` and then ```$ mocha``` or (if you have mocha globaly) ```$ mocha```


#### Props
*  [jaz303](https://github.com/jaz303) for his [min-heap](https://github.com/jaz303/min-heap) implementation
