import React from 'react';
import { Button, Form, FormControl, Container, InputGroup } from "react-bootstrap"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  };

  Results = () => (
    <Container fluid>
      <Form>
        <InputGroup className="mb-3 mt-3">
          <FormControl placeholder="Enter information for searching" />
          <InputGroup.Append>
            <Button>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
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

