/**
 * Created by aviad on 7/22/2016.
 */
'use strict';
let HashedMinHeap = require('./hashed-min-heap');

// ** PRIVATE MEMBERS DECELERATION **
let dataSet

class JoltScheduler{
	
	constructor(){
	 // Init new heap and hash
		dataSet = new HashedMinHeap();
	}
	
	
}

module.exports = JoltScheduler;