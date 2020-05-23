import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, Button, NavDropdown, Form, FormControl, Image, Container, Row, Col, InputGroup } from "react-bootstrap"
import Search from "./Search"
import Documents from "./Documents"
import SearchOptions from "./SearchOptions"
import 'bootstrap/dist/css/bootstrap.min.css';
import TefLogo from "../images/TefLogo.png";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      showDocuments: false,
      showSearchOptions: false
    };
  };

  SearchOptions = () => {
    this.setState({ showSearchOptions: true });
  };

  Search = () => {
    this.setState({ showSearchOptions: false });
    this.setState({ showSearch: true });
  };

  Documents = () =>{
    this.setState({ showDocuments: true });
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
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col sm={1} >
              <Nav className="flex-column">
                <Nav.Link >
                  <Link onClick={this.SearchOptions} to="/theses">Theses</Link>
                </Nav.Link>
                <Nav.Link >
                  <Link onClick={this.SearchOptions} to="/bachelor-works">Bachelor Works</Link>
                </Nav.Link>
                <Nav.Link >
                  <Link onClick={this.SearchOptions} to="/master-works">Master Works</Link>
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="mt-3" sm={11} >
              <Search Documents ={this.Documents} show={this.state.showSearch}></Search>
              <SearchOptions Search={this.Search} show={this.state.showSearchOptions}></SearchOptions>
              <Switch>
                <Route path="/theses">
                  <Documents show={this.state.showDocuments}></Documents>
                </Route>
                <Route path="/bachelor-works">
                  <Documents show={this.state.showDocuments}></Documents>
                </Route>
                <Route path="/master-works">
                  <Documents show={this.state.showDocuments}></Documents>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}
