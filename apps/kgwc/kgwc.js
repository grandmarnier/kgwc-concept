import React from "react";
import ReactDOM from "react-dom";

class Tester extends React.Component {

	constructor() {
			super();
			this.state = { data: ["a1","a2","a3","a4"] };
	}
	render() {
		return (
			<div>
				<h2>Ordered List</h2>
				<ol>
					{this.state.data.map(text => <li>{text}</li>)}
				</ol>
			</div>
		);
	}
}

window.onload = function() {
	ReactDOM.render(<Tester />, document.getElementById('root'));
};
