import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import "./Character.css";

class Character extends Component {
  state = {
    isLoggedIn: true
  };

  componentWillMount() {
    API.characterData(this.props.match.params.characterId).then(response => {
      if(!response.data.status) {
        this.setState({ isLoggedIn: false });
      }
      console.log(response.data);
    });
  };

  render() {
    if(!this.state.isLoggedIn) {
      return <Redirect to="/" />
    };

    return (
      <Row>
        Character Page
      </Row>
    );
  };
};

export default Character;
