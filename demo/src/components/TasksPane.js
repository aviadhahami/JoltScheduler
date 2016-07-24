/**
 * Created by aviad on 7/24/2016.
 */
import React, { Component } from 'react'
import './../style/index.css'
import './../style/TasksPane.css'
import JoltScheduler from './../../../index'

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
		let cb = function(msg){
			return that.props.callback.bind(msg);
		};
		let task ={
			name: name,
			st: st,
			callback:cb(msg)
		};
		console.log(task,typeof task.name,typeof task.st, typeof task.callback);
		this.sched.insert(task);
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