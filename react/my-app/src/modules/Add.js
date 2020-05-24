import React from 'react';
import { Row, Col, Container } from "react-bootstrap"
import Download from './Download'
import Document from "../images/Document.png";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupByCount: 4,
      resourses: [
        {
          img: Document,
          title: "Theses"
        },
        {
          img: Document,
          title: "Bachelor Works"
        },
        {
          img: Document,
          title: "Master Works"
        }
      ]
    }
  };

  gropBy = (resourse, count) => {
    const result = []
    for (let i = 0; i < resourse.length; i += count) {
      const elementsInRow = []

      for (let j = i; j < resourse.length && j < i + count; j += 1) {
        elementsInRow.push(resourse[j])
      }
      result.push(
        <Row>
          {elementsInRow}
        </Row>
      )
    }
    return result
  }

  eachResourse = (resourse, index) => {
    return (
        <Col>
        <Download show={1}
          img={resourse.img}
          title={resourse.title}>
        </Download>
      </Col >
    );
  };

  Results = () => (
    <Container fluid>
      {this.gropBy(this.state.resourses.map(this.eachResourse), this.state.groupByCount)}
    </Container >
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
