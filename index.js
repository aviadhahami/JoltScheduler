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
		let id = dataSet.insert(item);
		this._updateInvoker()
		return id;
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
		this._updateInvoker();
	}
	remove(id){
		return dataSet.remove(id);
	}
	
	_updateInvoker() {
		
		// If we update but no tasks are present
		if(dataSet.peek == null) return;
		
		// Means that the DS is either empty or we've got earlier event
		this.closestTask = dataSet.peek;
		
		// Stop previous timeout
		if(timeoutHolder) {
			clearTimeout(timeoutHolder);
		}
		
		// Force new timeout
		this._invoker();
	}
	
	_invoker() {
		let that = this;
		// on timeout, we invoke callback and pop the task from the dataset
		let invocationCallback = function(){
			dataSet.pop;
			that.closestTask.callback();
			that._updateInvoker()
		};
		
		// Save timeout ID and count...
		let timeToWait= (this.closestTask.st - Date.now());
		timeoutHolder = setTimeout(invocationCallback,timeToWait < 0? 0 : timeToWait );
	}
	
	_pop(){
		return dataSet.pop;
	}
	
}

module.exports = JoltScheduler;