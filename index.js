/**
 * Created by aviad on 7/22/2016.
 */
'use strict';
let HashedMinHeap = require('./hashed-min-heap');

// ** PRIVATE MEMBERS DECELERATION **
let dataSet, timeoutHolder;

class JoltScheduler{
	
	constructor(){
		// Init new heap and hash
		dataSet = new HashedMinHeap();
		this.closestTask = null;
	}
	
	get size(){
		return dataSet.amountOfRecords
	}
	
	insert(item){
		dataSet.insert(item);
		this.updateInvoker()
	}
	
	updateInvoker() {
		
		// If we update but no tasks are present
		if(dataSet.peek == null) return;
		if (this.closestTask != dataSet.peek){
			// Means that the DS is either empty or we've got earlier event
			this.closestTask = dataSet.peek;
			
			// Stop previous timeout
			if(timeoutHolder) {
				clearTimeout(timeoutHolder);
			}
			
			// Force new timeout
			this.invoker();
		}else return;
		
	}
	
	invoker() {
		let that = this;
		// on timeout, we invoke callback and pop the task from the dataset
		let invocationCallback = function(){
			dataSet.pop;
			that.closestTask.callback();
			that.updateInvoker()
		};
		
		// Save timeout ID and count...
		timeoutHolder = setTimeout(invocationCallback,this.closestTask.st)
	}
	
	pop(){
		return dataSet.pop;
	}
	
	modify(id,newEntry){
		if(!dataSet.contains(id)) return;
		if(newEntry == null || newEntry == undefined) return;
		
		// Sterilize new entry before passing it
		let sterilizedEntry = {
			name:newEntry.name || null,
			st: newEntry.st || null,
			callback: newEntry.callback || null
		};
		dataSet.modifyEntry(id,sterilizedEntry);
	}
}

module.exports = JoltScheduler;