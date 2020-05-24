import React from 'react';
import { Card } from "react-bootstrap"

export default class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  };

  toggleChangeBackgroundImg = (e) => {
    this.setState({ hover: !this.state.hover })
    if (this.state.hover) {
      e.target.className = 'bg-light';
    } else {
      e.target.className = 'bg-secondary'
    }
  }

    DownloadDocument = () =>{
        document.getElementById('inputFile').click();
    }

    readFile = () => {
        var selectedFile = document.getElementById('inputFile').files[0];
        var reader = new FileReader
                   reader.onload = function (e) {
          var FileContent = e.target.result;
                      alert(FileContent);
                      return FileContent;
        };
      }

  Results = () => (
    <Card onClick = {this.DownloadDocument} style={{ width: '18rem' }}>
        <input hidden id="inputFile" type="file"  onChange={this.readFile}></input>
      <Card.Img
        variant="top" style={{ width: '286px' }} src={this.props.img} className='bg-light'
        onMouseOver={this.toggleChangeBackgroundImg} onMouseLeave={this.toggleChangeBackgroundImg} />
      <Card.Body>
        <Card.Text className="h1 font-weight-bold text-center text-primary">{this.props.title}</Card.Text>
      </Card.Body>
    </Card>
  )

  render() {
    let results
    console.log(this.props.img)
    if (this.props.show) {
      results = this.Results()
    } else {
      results = null
    }

    return results
  }
}
