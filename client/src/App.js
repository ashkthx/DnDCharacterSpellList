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
    spellsArr: [],
    newCharConfirm: false,
    showChar: false,
    isLoggedIn: false,
    name: "",
    characterArr: []
  };

  componentDidMount() {
    this.getUserData();
  };

  getUserData = (stateObj = {}) => {
    // Checks if user is logged in, and updates isLoggedIn, characterArr, and name
    API.userInfo().then(response => this.setState({ ...response.data, ...stateObj }));
  };

  updateAppState = stateObj => {
    this.setState(stateObj);
  };

  render() {
    const defaultProps = { isLoggedIn: this.state.isLoggedIn, updateAppState: this.updateAppState };
    const homeProps = { spellsArr: this.state.spellsArr, newCharConfirm: this.state.newCharConfirm };
    const membersProps = { name: this.state.name, characterArr: this.state.characterArr, getUserData: this.getUserData };
    const modalProps = {
      showAuth: this.state.showAuth, showChar: this.state.showChar, type: this.state.type, spellsArr: this.state.spellsArr,
      newCharConfirm: this.state.newCharConfirm, updateAppState: this.updateAppState, getUserData: this.getUserData
    };

    return (
      <Router>
        <Container bsPrefix="container app-container">
          <Nav {...defaultProps} />
          <Switch>
            <Route exact render={props => <Home {...props} {...defaultProps} {...homeProps} />} path="/" />
            <Route exact render={props => <Members {...props} {...defaultProps} {...membersProps} />} path="/members" />
            <Route exact render={props => <Character {...props} {...defaultProps} spellsArr={this.state.spellsArr} />} path="/character/:characterId" />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Modals {...modalProps} />
        </Container>
      </Router>
    );
  };
};

// Export
export default App;
