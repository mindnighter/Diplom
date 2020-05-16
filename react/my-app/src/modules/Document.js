import React from 'react';
import { Button, Card } from "react-bootstrap"

export default class Document extends React.Component {
  constructor(props) {
    super(props);
  };

  Results = () => (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Навчальний рік: {this.props.author}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Спеціальність: {this.props.title}</Card.Subtitle>
        <Card.Text>Освітня програма: {this.props.content}</Card.Text>
        <Card.Text>Освітній ступень: {this.props.content1}</Card.Text>
        <Card.Text>Випускова кафедра: {this.props.content2}</Card.Text>
        <Card.Link href="#">Завантажити: {this.props.title}</Card.Link>
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
