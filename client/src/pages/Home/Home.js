// Dependencies
import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
// import API from "../../utils/API.js";
import "./Home.css";

class Home extends Component {
    render() {
        return (
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Start typing here to search the spell list..."
              aria-label="Spell search"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        )
    }
}

// Export
export default Home;
