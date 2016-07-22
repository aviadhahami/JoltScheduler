/**
 * Created by aviad on 7/22/2016.
 */
'use strict';
let HashedMinHeap = require('./hashed-min-heap');

// ** PRIVATE MEMBERS DECELERATION **
let dataSet;

class JoltScheduler{
	
	constructor(){
	 // Init new heap and hash
		dataSet = new HashedMinHeap();
	}
	
	get size(){
		return dataSet.amountOfRecords
	}
	insert(item){
		dataSet.insert(item)
	}
	pop(){
		return dataSet.pop;
	}
	
}

module.exports = JoltScheduler;