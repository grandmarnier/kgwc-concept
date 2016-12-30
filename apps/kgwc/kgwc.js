import React from "react";
import ReactDOM from "react-dom";

class Tester extends React.Component {
	render() {
		return (
			<div>
				<h2>Ordered List</h2>
				<ol>
					<li>test1</li>
					<li>test2</li>
					<li>test3</li>
				</ol>
			</div>
		);
	}
}

window.onload = function() {
	ReactDOM.render(<Tester />, document.getElementById('root'));
};
