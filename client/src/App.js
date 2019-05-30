// Npm packages
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Login from "./pages/Login";
import Character from "./pages/Character";

// Static
import "./App.css"

function App() {
  return (
    <Router>
      <Container bsPrefix="container app-container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/character/:characterId" component={Character} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </Container>
    </Router>
  );
}

// Export
export default App;
