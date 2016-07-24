import React, { Component } from 'react';
import logo from '../assets/jolt.png';
import '../style/App.css';

import TasksPane from './TasksPane';
import MessagePane from './MessagePane';

class App extends Component {
	constructor(){
		super();
		this.state= {
			message:null
		}
	}
	updateMessage(msg){
		console.info('changing state...');
		this.setState({
			message:msg
		});
	}
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to JoltScheduler!</h2>
				</div>
				<div className="row">
					<div className="col">
						<TasksPane className="half-size" callback={this.updateMessage.bind(this)}/>
					</div>
					<div className="col">
						<MessagePane className="half-size" message={this.state.message}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
