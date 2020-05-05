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
		this.setState ({edit: true});
	};

	save = () => {
		this.props.update (this.refs.txt.value, this.props.index);
		this.setState ({edit: false})
	};

	remove = () => {
		this.props.deleteBlock (this.props.index);
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
				return this.rendEdit ();
			} else {
				return this.rendNorm ();
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

	add = (text) => {
		var arr = this.state.docs;
		arr.unshift(text);
		this.setState ({docs: arr});
	};

	deleteBlock = (i) => {
		var arr = this.state.docs;
		arr.splice (i, 1);
		this.setState ({docs: arr});
	};

	updateText = (text, i) => {
		var arr = this.state.docs;
		arr[i] = text;
		this.setState ({docs: arr});
	};

	each = (item, i) => {
		return (
			<Block key={i} index={i} update={this.updateText} deleteBlock={this.deleteBlock}>
				{item}
			</Block>
		);
	};

	render() {
		return (
			<div className="field">
			<button onClick={this.add.bind(null,"default")}  className="btn add">Додати</button>
				{this.state.docs.map (this.each)}
			</div>
		);
	}
}

ReactDOM.render(<Registry />,document.getElementById('root')
);
