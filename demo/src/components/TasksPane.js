/**
 * Created by aviad on 7/24/2016.
 */
import React, { Component } from 'react'
import './../style/index.css'
import './../style/TasksPane.css'

class TasksPane extends Component{
	render(){
		return (
			<div className="float-left padding-left-10">
				<div className="pane">
					<h4>Insert new task</h4>
					<input type="text" placeholder="Task name"/>
					<input type="number" placeholder="Time in ms"/>
					<input type="text" placeholder="Text for callback"/>
				</div>
			</div>
		)
	}
}

export default TasksPane;