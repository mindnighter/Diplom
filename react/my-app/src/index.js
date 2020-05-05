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

	add = () => {
	//	var foo = "notdefault";
	//	this.setState ({adding: foo});
		document.getElementById('inputFile').click();
	//	var arr = this.state.docs;
	//	arr.unshift( this.state.adding);
	//	this.setState ({docs: arr});
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

	 readFile = () => {
           var selectedFile = document.getElementById('inputFile').files[0];
           var reader = new FileReader
                      reader.onload = function (e) {
             var FileContent = e.target.result;
						 alert(FileContent);
						 return FileContent;
           };
					 var arr = this.state.docs;
					 arr.unshift( reader.readAsText(selectedFile));
					 this.setState ({docs: arr})
         }

	render() {
		return (
			<div className="field">
			<input hidden id="inputFile" type="file"  onChange={this.readFile}></input>
			<button onClick={this.add}  className="btn add">Додати</button>
				{this.state.docs.map (this.each)}
			</div>
		);
	}
}

ReactDOM.render(<Registry />,document.getElementById('root')
);
