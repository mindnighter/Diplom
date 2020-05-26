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

  DownloadDocument = () => {
    document.getElementById('inputFile').click();
  }

  readFile = () => {
    const selectedFile = document.getElementById('inputFile').files[0];

    const reader = new FileReader
    reader.readAsDataURL(selectedFile);
    reader.onload = function (e) {
      console.log(reader.result)
    };

    reader.onerror = function (e) {
      console.log(e)
    };
  }

  Results = () => (
    <Card onClick={this.DownloadDocument} style={{ width: '18rem' }}>
      <input hidden id="inputFile" type="file" onChange={this.readFile}></input>
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

    if (this.props.show) {
      results = this.Results()
    } else {
      results = null
    }

    return results
  }
}
