import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, Button, NavDropdown, Form, FormControl, Image, Container, Row, Col, InputGroup } from "react-bootstrap"
import Search from "./Search"
import Documents from "./Documents"
import SearchOptions from "./SearchOptions"
import Add from "./Add"
import 'bootstrap/dist/css/bootstrap.min.css';
import TefLogo from "../images/TefLogo.png";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: true,
      showDocuments: false,
      dataDocuments: null,
      showSearchOptions: false,
      showAddOptions: false
    };
  };

  SearchOptions = () => {
    this.setState({ showSearchOptions: true });
  };

  Search = () => {
    this.setState({ showSearchOptions: false });
    this.setState({ showSearch: true });
  };

  Documents = (result) => {
    console.log(result.data)
    if (result.data) {
      this.setState({ dataDocuments: result.data });
      this.setState({ showDocuments: true });
    }

  }

  Add = () => {
    this.setState({ showAddOptions: true });
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand >
            <Link to="/">
              <Image src={TefLogo} fluid />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link >
                <Link to="/">ТЕПЛОЕНЕРГЕТИЧНИЙ ФАКУЛЬТЕТ НТУУ «КПI імені Ігоря Сікорського»</Link>
              </Nav.Link>
              <NavDropdown title="Опції" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.Add} >Додати</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col sm={1}>
              <Nav className="flex-column">
                <Nav.Link >
                  <Link to="/theses">Тези</Link>
                </Nav.Link>
                <Nav.Link >
                  <Link to="/bachelor-works">Бакалаврські роботи</Link>
                </Nav.Link>
                <Nav.Link >
                  <Link to="/master-works">Магістерські роботи</Link>
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="mt-3" sm={11} >
              <Add show={this.state.showAddOptions}></Add>
              <Switch>
                <Route path="/theses">
                  <Search Documents={this.Documents} show={this.state.showSearch}></Search>
                  <SearchOptions Search={this.Search} show={this.state.showSearchOptions}></SearchOptions>
                  <Documents show={this.state.showDocuments} data={this.state.dataDocuments}></Documents>
                </Route>
                <Route path="/bachelor-works">
                  <Search Documents={this.Documents} show={this.state.showSearch}></Search>
                  <SearchOptions Search={this.Search} show={this.state.showSearchOptions}></SearchOptions>
                  <Documents show={this.state.showDocuments} data={this.state.dataDocuments}></Documents>
                </Route>
                <Route path="/master-works">
                  <Search Documents={this.Documents} show={this.state.showSearch}></Search>
                  <SearchOptions Search={this.Search} show={this.state.showSearchOptions}></SearchOptions>
                  <Documents show={this.state.showDocuments} data={this.state.dataDocuments}></Documents>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }

  //   async componentDidMount() {
  //     const query = `{
  //       findResourceBy(
  //         consist: "програмного", 
  //         author: true, 
  //         title:true
  //       )
  //      {
  //         author {
  //           fullName
  //         }
  //         title {
  //           title
  //         }
  //       }
  //     }`

  //     api({
  //       method: 'post',
  //       data: {
  //         query
  //       }
  //     }).then((result) => {
  //       console.log(result.data)
  //     });

  //   }
}
