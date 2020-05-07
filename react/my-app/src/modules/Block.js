import React from 'react';

export default class Block extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			text: this.props.text,
			show: true
		};
	};

	edit = () => {
		this.setState({ edit: true });
	};

	save = () => {
		this.setState({ edit: false, text: this.refs.txt.value })
	};

	remove = () => {
		this.setState({ show: false })
	};

	upload = () => {
		alert(this.state.text);
	};

	rendNorm = () => {
		return (
			<div className="box">
				<div className="text">{this.state.text}</div>
				<button onClick={this.edit} className="btn light">Редагувати</button>
				<button onClick={this.remove} className="btn red">Видалити</button>
				<button onClick={this.upload} className="btn green">Завантажити</button>
			</div>
		);
	};

	rendEdit = () => {
		return (
			<div className="box">
				<textarea autoFocus ref='txt' defaultValue={this.state.text}></textarea>
				<button onClick={this.save} className="btn success">Зберегти зміни</button>
			</div>
		);
	};

	render() {
		if (this.state.show) {
			if (this.state.edit) {
				return this.rendEdit();
			} else {
				return this.rendNorm();
			}
		} else {
			return null
		}

	}
}
