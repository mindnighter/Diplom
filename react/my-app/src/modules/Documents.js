import React from 'react';
import { Row, Col, Container } from "react-bootstrap"
import Document from './Document'

export default class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourses: [
        {
          author: "Студент 1 курсу, гр. ТЯ-81 Дзерун М.С.",
          title: "ПРО ВИКОРИСТАННЯ НЕЛІНІЙНОСТІ ХАРАКТЕРИСТИКИ МАЯТНИКОВОЇ КОЛИВАЛЬНОЇ СИСТЕМИ ДЛЯ ЗНАХОДЖЕННЯ ПОЧАТКОВИХ УМОВ ЇЇ РУХУ",
          content: "З метою скорочення часу знаходження початкових умов руху коливальних систем"
        },
        {
          author: "Студент 1 курсу, гр. ТЯ-81 Дзерун М.С.",
          title: "ПРО ВИКОРИСТАННЯ НЕЛІНІЙНОСТІ ХАРАКТЕРИСТИКИ МАЯТНИКОВОЇ КОЛИВАЛЬНОЇ СИСТЕМИ ДЛЯ ЗНАХОДЖЕННЯ ПОЧАТКОВИХ УМОВ ЇЇ РУХУ",
          content: "З метою скорочення часу знаходження початкових умов руху коливальних систем"
        },
        {
          author: "Студент 1 курсу, гр. ТЯ-81 Дзерун М.С.",
          title: "ПРО ВИКОРИСТАННЯ НЕЛІНІЙНОСТІ ХАРАКТЕРИСТИКИ МАЯТНИКОВОЇ КОЛИВАЛЬНОЇ СИСТЕМИ ДЛЯ ЗНАХОДЖЕННЯ ПОЧАТКОВИХ УМОВ ЇЇ РУХУ",
          content: "З метою скорочення часу знаходження початкових умов руху коливальних систем"
        },
        {
          author: "Студент 1 курсу, гр. ТЯ-81 Дзерун М.С.",
          title: "ПРО ВИКОРИСТАННЯ НЕЛІНІЙНОСТІ ХАРАКТЕРИСТИКИ МАЯТНИКОВОЇ КОЛИВАЛЬНОЇ СИСТЕМИ ДЛЯ ЗНАХОДЖЕННЯ ПОЧАТКОВИХ УМОВ ЇЇ РУХУ",
          content: "З метою скорочення часу знаходження початкових умов руху коливальних систем"
        }
      ]
    }
  };

  eachResourse = resourse => {
    return (
      <Col>
        <Document show={1}
          author={resourse.author}
          title={resourse.title}
          content={resourse.content}>
        </Document >
      </Col>
    );
  };

  Results = () => (
    <Container fluid>
      <Row>
        {this.state.resourses.map(this.eachResourse)}
      </Row >
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

