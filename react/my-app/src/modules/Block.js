import React from 'react';
import ReactDOM from 'react-dom';

export default class Block extends React.Component {
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
