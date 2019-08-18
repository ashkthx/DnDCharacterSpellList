// Npm packages
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Login from "./pages/Login";
import Character from "./pages/Character";
import Modals from "./components/Modals";
import API from "./utils/API.js"

// Static
import "./App.css"

class App extends Component {
  state = {
    showAuth: false,
    showChar: false,
    isLoggedIn: false
  };

  componentDidMount() {
    API.userIsLoggedIn().then((response) => {
      this.setState({
        isLoggedIn: response.data
      });
    })
  };

  updateAppState = propName => {
    this.setState({ [propName]: !this.state[propName] });
  };

  render() {
    return (
      <Router>
        <Container bsPrefix="container app-container">
          <Nav isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route exact path="/" render={props => <Home {...props} updateAppState={this.updateAppState} />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/members" component={Members} />
            <Route exact path="/character/:characterId" component={Character} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Modals />
        </Container>
      </Router>
    );
  };
};

// Export
export default App;
