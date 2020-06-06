import React from 'react';
import { Button, Form, FormControl, Container, InputGroup } from "react-bootstrap"
import api from "../utils/api"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: false,
      subAuthor: false,
      title: false,
      direction: false,
      subAuthor: false,
      profession: false,
      specialization: false,
      udc: false,
      content: false,
      disabled: true
    };
    this.textInput = React.createRef();
  };
  handleChange = e => {
    this.setState({ [e.target.id]: true });
    this.setState({ disabled: false });
  };
  Results = () => (
    <Container fluid>
      <Form>
        <InputGroup className="mb-3 mt-3">
          <FormControl ref={this.textInput} type="text" placeholder="Enter information for searching" disabled={this.state.disabled} />
          <InputGroup.Append>
            <Button onClick={this.SearchBy}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
        {['radio'].map((type) => (
          <div key={`custom-inline-${type}`} className="mb-3">
            <Form.Check
              custom
              inline
              label="author"
              type={type}
              id={`author`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="subAuthor"
              type={type}
              id={`subAuthor`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="title"
              type={type}
              id={`title`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="direction"
              type={type}
              id={`direction`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="profession"
              type={type}
              id={`profession`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="specialization"
              type={type}
              id={`specialization`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="udc"
              type={type}
              id={`udc`}
              onChange={this.handleChange}
            />
            <Form.Check
              custom
              inline
              label="content"
              type={type}
              id={`content`}
              onChange={this.handleChange}
            />
          </div>
        ))}
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

  SearchBy = async () => {
    const consist = `"${this.textInput.current.value}"`
    const author = this.state.author
    const subAuthor = this.state.subAuthor
    const direction = this.state.direction
    const profession = this.state.profession
    const specialization = this.state.specialization
    const udc = this.state.udc
    const content = this.state.content
    const title = this.state.title

    const query = `{
      findResourceBy(
        consist: ${consist},
        author: ${author},
        title: ${title},
        subAuthor: ${subAuthor},
        direction: ${direction},
        profession: ${profession},
        specialization: ${specialization},
        udc: ${udc},
        content: ${content},
      )
     {
        author {
          fullName
        }
        title {
          title
        }
      }
    }`
    api({
      method: 'post',
      data: {
        query
      }
    }).then((result) => {
      this.props.Documents(result)
    });

  }
}

