import React from 'react';
import { Row, Col, Container } from "react-bootstrap"
import SearchOption from './SearchOption'
import Content from "../images/Content.png";
import Author from "../images/Author.png";
import Title from "../images/Title.png";

export default class SearchOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupByCount: 4,
      resourses: [
        {
          img: Content,
          title: "Content"
        },
        {
          img: Author,
          title: "Author"
        },
        {
          img: Title,
          title: "Title"
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
        <SearchOption show={1}
          img={resourse.img}
          title={resourse.title}>
        </SearchOption>
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
