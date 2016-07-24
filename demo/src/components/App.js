import React, { Component } from 'react';
import logo from '../assets/jolt.png';
import '../style/App.css';

import TasksPane from './TasksPane';
import MessagePane from './MessagePane';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to JoltScheduler!</h2>
				</div>
				<div className="container">
					<TasksPane className="half-size"/>
					<MessagePane className="half-size"/>
				</div>
			</div>
		);
	}
}

export default App;
