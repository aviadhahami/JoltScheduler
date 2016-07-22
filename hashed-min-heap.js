/**
 * Created by aviad on 7/22/2016.
 */

'use strict'

let MinHeap = require('min-heap');

class HashedMinHeap{
	
	constructor() {
		this.minHeap = new MinHeap((a, b)=> {
			// Since we have specified form, we touch the schedule time directly
			return a.st - b.st
		});
		this.hashTable = {}
	}
	
	get pop() {
		
	}
	
	// When inserting new entry, we inject the object unique id
	// in a way we will couple the hash to the heap
	set insert(entry) {
		if(this.verifyShape(entry)){
			
		}else{
			throw 'Entry is not of proper form!'
		}
	}
	
	verifyShape(entry) {
		return entry.hasOwnProperty('name') &&
			typeof entry.name == 'string' &&
			entry.hasOwnProperty('st') &&
			typeof entry.st == 'number' &&
			entry.hasOwnProperty('callback') &&
			typeof entry.callback == 'function'
	}
	
	get peek() {
		
	}
	
	set modifyEntry(entry) {
		
	}
	
	generateID(startingTime) {
		
		// Referenced from https://gist.github.com/gordonbrander/2230317
		// Math.random should be unique because of its seeding algorithm.
		// Convert it to base 36 (numbers + letters), and grab the first 7 characters
		// after the decimal.
		return '_' + Math.random().toString(36).substr(2, 7) + startingTime.toString();
	}
}

module.exports = HashedMinHeap