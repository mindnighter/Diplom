import React from 'react';
import { Card } from "react-bootstrap"
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

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
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = async function (e) {
      const pdfDoc = await PDFDocument.load(reader.result)
      const firstPage = pdfDoc.getPage(0)
      console.log(firstPage)
      console.log(firstPage.getContentStream().computeContents())
      console.log(Utf8ArrayToStr(firstPage.getContentStream().computeContents()))
      console.log(firstPage.getSize())
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

  Utf8ArrayToStr = (array) => {
    var out, i, len, c;
    var char2, char3;
    console.log(array)
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  }

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

function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;
  console.log(array)
  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}