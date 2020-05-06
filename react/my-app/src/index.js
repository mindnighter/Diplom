import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Block extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};
	};

	edit = () => {
		this.setState({ edit: true });
	};

	save = () => {
		this.props.update(this.refs.txt.value, this.props.index);
		this.setState({ edit: false })
	};

	remove = () => {
		this.props.deleteBlock(this.props.index);
	};

	rendNorm = () => {
		return (
			<div className="box">
				<div className="text">{this.props.children}</div>
				<button onClick={this.edit} className="btn light">Редагувати</button>
				<button onClick={this.remove} className="btn red">Видалити</button>
			</div>
		);
	};

	rendEdit = () => {
		return (
			<div className="box">
				<textarea autoFocus ref='txt' defaultValue={this.props.children}></textarea>
				<button onClick={this.save} className="btn success">Зберегти зміни</button>
			</div>
		);
	};

	render() {
		if (this.state.edit) {
			return this.rendEdit();
		} else {
			return this.rendNorm();
		}
	}
}

class Registry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			docs: [
				'Розклад',
				'Постанова',
				'Наказ'
			]
		};
	};

	add = () => {
		//	let foo = "notdefault";
		//	this.setState ({adding: foo});
		document.getElementById('inputFile').click();
		//	let arr = this.state.docs;
		//	arr.unshift( this.state.adding);
		//	this.setState ({docs: arr});
	};

	deleteBlock = (i) => {
		let arr = this.state.docs;
		arr.splice(i, 1);
		this.setState({ docs: arr });
	};

	updateText = (text, i) => {
		let arr = this.state.docs;
		arr[i] = text;
		this.setState({ docs: arr });
	};

	each = (item, i) => {
		return (
			<Block key={i} index={i} update={this.updateText} deleteBlock={this.deleteBlock}>
				{item}
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
			console.log(arr)
			that.setState({ docs: arr })
		};
	}

	render() {
		return (
			<div className="field">
				<input hidden id="inputFile" type="file" onChange={this.readFile}></input>
				<button onClick={this.add} className="btn add">Додати</button>
				{this.state.docs.reverse().map(this.each)}
			</div>
		);
	}
}

ReactDOM.render(<Registry />, document.getElementById('root')
);
