/**
 * Created by aviad on 7/22/2016.
 */

'use strict'

let MinHeap = require('min-heap');
class HashedMinHeap{

	constructor(){
		
		this.minHeap = new MinHeap((a,b)=>{
			// Since we have specified form, we touch the schedule time directly
			return a.st - b.st
		});
	}
	
	get pop(){
		
	}
	set insert(obj){
		
	}
	get peek(){
		
	}
	set modifyEntry(obj){
		
	}
}

module.exports = HashedMinHeap