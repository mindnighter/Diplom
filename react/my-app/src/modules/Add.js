import React from 'react';
import { Row, Col, Container } from "react-bootstrap"
import Download from './Download'
import Document from "../images/Document.png";
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient } from "apollo-client"
import { ApolloProvider, Mutation } from "react-apollo"
import gql from "graphql-tag"

const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql', // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true"
  }
})

const UPLOAD_FILE = gql`
  mutation findResourceBy($author: Boolean, $subAuthor: Boolean, $title: Boolean,
    $direction: Boolean, $profession: Boolean, $specialization: Boolean,
    $udc: Boolean, $content: Boolean, $consist: String) {
  findResourceBy(
    author: $author
    subAuthor: $subAuthor
    title: $title
    direction: $direction
    profession: $profession
    specialization: $specialization
    udc: $udc
    content: $content
    consist: $consist
  ){
    author {
      fullName
    }
    title {
      title
    }
  }
  }
`;

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupByCount: 4,
      resourses: [
        {
          img: Document,
          title: "Theses",
          type: "THETHIS"
        },
        {
          img: Document,
          title: "Bachelor Works",
          type: "BAKALAVR"
        },
        {
          img: Document,
          title: "Master Works",
          type: "MAGISTER"
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
          title={resourse.title}
          type={resourse.type}>
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
