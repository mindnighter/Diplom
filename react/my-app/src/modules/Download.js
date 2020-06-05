import React from 'react';
import { Card } from "react-bootstrap"
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
  mutation SingleUpload($file: Upload!, $type: String!) {
    singleUpload(file: $file, type: $type) {
      filename
      mimetype
      encoding
    }
  }
`;

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})

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
    // const selectedFile = document.getElementById('inputFile').files[0];

    // const reader = new FileReader
    // reader.readAsArrayBuffer(selectedFile);
    // reader.onload = async function (e) {
    //   console.log(freader.result)
    // };

    // reader.onerror = function (e) {
    //   console.log(e)
    // };
  }

  Results = () => (
    <h2>
      <ApolloProvider client={client}>
        <Mutation mutation={UPLOAD_FILE}>
          {(singleUpload, { data, loading }) => {
            console.log(data)
            return (<form onSubmit={() => { console.log("Submitted") }} encType={'multipart/form-data'}>
              <input name={'document'} type={'file'} onChange={({ target: { files } }) => {
                const file = files[0]
                console.log(this.props.type)
                file && singleUpload({ variables: { file: file, type: this.props.type } })
              }} />{loading && <p>Loading.....</p>}</form>)
          }
          }
        </Mutation>
      </ApolloProvider>
      <Card onClick={this.DownloadDocument} style={{ width: '18rem' }}>
        <input hidden id="inputFile" type="file" onChange={this.readFile}></input>
        <Card.Img
          variant="top" style={{ width: '286px' }} src={this.props.img} className='bg-light'
          onMouseOver={this.toggleChangeBackgroundImg} onMouseLeave={this.toggleChangeBackgroundImg} />
        <Card.Body>
          <Card.Text className="h1 font-weight-bold text-center text-primary">{this.props.title}</Card.Text>
        </Card.Body>
      </Card>
    </h2>
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
