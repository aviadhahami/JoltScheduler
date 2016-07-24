/**
 * Created by aviad on 7/24/2016.
 */
import React, { Component } from 'react'
import './../style/index.css'
import './../style/TasksPane.css'
import JoltScheduler from './../../../index'

/* eslint-disable */
class TasksPane extends Component{
	constructor(){
		super();
		this.sched = new JoltScheduler();
	}
	handleSubmit(){
		let that = this;
		let msg = this.refs.msg.value;
		let st = parseInt(this.refs.time.value,10);
		let name = this.refs.name.value;
		let cb = function(){
			return that.props.callback(`Task '${name}' said: ${msg}`)
		};
		let date = new Date();
		date.setSeconds(date.getSeconds() + st/1000);
		let task ={
			name: name,
			st: date.getTime(),
			callback:cb
		};
		this.sched.insert(task);
		this._clearFields()
	}
	
	_clearFields() {
		this.refs.msg.value = '';
		this.refs.time.value = '';
		this.refs.name.value = '';
	}
	render(){
		return (
			<div className="half-size">
				<div className="pane">
					<h4>Insert new task</h4>
					<input type="text" ref='name' placeholder="Task name"/>
					<input type="number" ref='time' placeholder="Time in ms"/>
					<input type="text" ref='msg' placeholder="Text for callback"/>
					<button onClick={this.handleSubmit.bind(this)}>Submit</button>
				</div>
			</div>
		)
	}
}

export default TasksPane;