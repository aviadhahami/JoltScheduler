/**
 * Created by aviad on 7/24/2016.
 */
import React, { Component } from 'react'
import './../style/App.css'
import './../style/MessagePane.css'

class MessagePane extends Component{
	render(){
		return (
			<div className="half-size">
				<h3>Text from callbacks</h3>
				<div className="spawn-zone">
					<p>{this.props.message || "no text yet... "}</p>
				</div>
			</div>
		)
	}
}

export default MessagePane;