// Npm packages
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Character from "./pages/Character";
import Modals from "./components/Modals";
import API from "./utils/API.js"

// Static
import "./App.css"

class App extends Component {
  state = {
    showAuth: false,
    type: "",
    showChar: false,
    isLoggedIn: false
  };

  componentDidMount() {
    API.userIsLoggedIn().then((response) => {
      this.setState({
        isLoggedIn: response.data
      });
    });
  };

  updateAppState = stateObj => {
    this.setState(stateObj);
  };

  render() {
    const defaultProps = {
      isLoggedIn: this.state.isLoggedIn,
      updateAppState: this.updateAppState
    };

    return (
      <Router>
        <Container bsPrefix="container app-container">
          <Nav {...defaultProps} />
          <Switch>
            <Route exact render={props => <Home {...props} {...defaultProps} />} path="/" />
            <Route exact render={props => <Members {...props} {...defaultProps} />} path="/members" />
            <Route exact render={props => <Character {...props} {...defaultProps} />} path="/character/:characterId" />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Modals showAuth={this.state.showAuth} showChar={this.state.showChar} type={this.state.type} updateAppState={this.updateAppState} />
        </Container>
      </Router>
    );
  };
};

// Export
export default App;
