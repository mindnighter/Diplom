import React from 'react';
import Block from './Block';

export default class Registry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			docs: [
				'Розклад',
				'Постанова',
				'Наказ'
			],
		};
	};

	add = () => {
		document.getElementById('inputFile').click();
	};

	each = (item, i) => {
		return (
			<Block key={i} index={i} text={item}>
			</Block>
		);
	};

	readFile = () => {
		let selectedFile = document.getElementById('inputFile').files[0];
		let reader = new FileReader()
		let arr = this.state.docs;
		let that = this

		reader.readAsText(selectedFile);

		reader.onload = function (e) {
			let FileContent = e.target.result;
			arr.push(FileContent)
			that.setState({ docs: arr })
		};
	}

	render() {
		return (
			<div className="field">
				<input hidden id="inputFile" type="file" onChange={this.readFile}></input>
				<button onClick={this.add} className="btn add">Додати</button>
				{this.state.docs.map(this.each)}
			</div>
		);
	}
}
