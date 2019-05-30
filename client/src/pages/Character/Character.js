import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import "./Character.css";

class Character extends Component {
  state = {
    isLoggedIn: true,
    spellName: "",
    spellsArr: []
  };

  componentWillMount() {
    API.characterData(this.props.match.params.characterId).then(response => {
      if(!response.data.status) {
        this.setState({ isLoggedIn: false });
      }
      console.log(response.data);
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const apiObj = {
      characterId: this.props.match.params.characterId,
      spellName: this.state.spellName
    };
    API.spellAdd(apiObj).then(response => {
      console.log(response.data);
      this.setState({
        spellsArr: response.data
      });
    });
  };

  render() {
    if(!this.state.isLoggedIn) {
      return <Redirect to="/" />
    };

    return (
      <Row>
        <h1>Character Page</h1>
        <InputGroup className="mb-3">
            <FormControl
              placeholder="Start typing here to search the spell list..."
              aria-label="Spell search"
              aria-describedby="basic-addon2"
              onChange={this.handleInputChange}
              name="spellName"
              value={this.state.spellName}
            />
            <InputGroup.Append>
              <Button onClick={this.handleSubmit} variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
      </Row>
    );
  };
};

export default Character;
