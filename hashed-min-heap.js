/**
 * Created by aviad on 7/22/2016.
 */

'use strict'

let MinHeap = require('./data-structures/min-heap');

// Adding peek to the library...who the fuck doesn't implement peek?!

class HashedMinHeap{
	
	constructor() {
		this.minHeap = new MinHeap((a, b)=> {
			// Since we have specified form, we touch the schedule time directly
			return a.st - b.st
		});
		this.hashTable = {}
	}
	
	get pop() {
		let poped = this.minHeap.removeHead();
		if(poped != null && poped != undefined){
			// Clear hash entry
			delete this.hashTable[poped._id];
			return poped
		}else{
			return null
		}
		
	}
	
	// When inserting new entry, we inject the object unique id
	// in a way we will couple the hash to the heap
	insert(entry) {
		if(this.verifyShape(entry)){
			// entry is of the proper form, need to generate id
			let id = this.generateID(entry.st);
			
			// Generate new object and inject id
			let modifiedEntry = Object.assign({},entry,{_id:id})
			
			// Insert new entry to the hash (id : entry) and to the heap
			this.hashTable[id] = modifiedEntry;
			this.minHeap.insert(modifiedEntry);
			return id;
		}else{
			throw 'Entry is not of proper form!'
		}
	}
	
	get peek() {
		return this.minHeap.peek()
	}
	
	get amountOfRecords(){
		return this.minHeap.getSize()
	}
	
	contains(id){
		return !!this.hashTable.hasOwnProperty(id);
	}
	
	modifyEntry(id,entry) {
		
		// If the st wasn't modified, we don't need to heapify
		let ptr = this.hashTable[id];
		
		if(entry.st != null){
			// Remove the record from heap and hash O(log n)
			delete this.hashTable[id];
			this.minHeap.remove(ptr);
			
			// Update time & inject back
			ptr.st = entry.st;
			this.hashTable[id] = ptr;
			this.minHeap.insert(ptr);
		}
		if(entry.callback != null){
			ptr.callback = entry.callback;
		}
		if(entry.name != null){
			ptr.name = entry.name;
		}
	}
	
	generateID(startingTime) {
		
		// Referenced from https://gist.github.com/gordonbrander/2230317
		// Math.random should be unique because of its seeding algorithm.
		// Convert it to base 36 (numbers + letters), and grab the first 7 characters
		// after the decimal.
		return '_' + Math.random().toString(36).substr(2, 7) + startingTime.toString();
	}
	
	verifyShape(entry) {
		return entry.hasOwnProperty('name') &&
			typeof entry.name == 'string' &&
			entry.hasOwnProperty('st') &&
			typeof entry.st == 'number' &&
			entry.hasOwnProperty('callback') &&
			typeof entry.callback == 'function'
	}
}

module.exports = HashedMinHeap