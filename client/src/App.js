// Npm packages
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Login from "./pages/Login";
// Static
import "./App.css"

function App() {
  return (
    <Router>
      <Container>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/members" component={Members} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
