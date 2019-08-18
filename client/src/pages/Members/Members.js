// Dependencies
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import API from "../../utils/API";
import "./Members.css";

class Members extends Component {

  componentDidMount() {
    this.props.getUserData();
  }

  handleCardClick = characterId => {
    this.props.history.push("/character/" + characterId);
  };

  handleDelete = (event, characterId) => {
    event.stopPropagation();
    API.characterDelete(characterId).then(response => {
      this.setState({ characterArr: response.data });
    });
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <div className="col-md-6 col-md-offset-3">
          <h2>Welcome {this.props.name}!</h2>
          <Button onClick={() => this.props.updateAppState({ showChar: true })} variant="dark">
            Create a New Character
            </Button>
          {this.props.characterArr.reverse().map((element, i) => {
            return <Card key={i} border="dark" bsPrefix="card character-card" onClick={() => this.handleCardClick(element.id)}>
              <Card.Body>
                <Card.Title>
                  <span className="character-title">{element.characterName}</span>
                  <Badge onClick={(event) => this.handleDelete(event, element.id)} variant="light">X</Badge>
                </Card.Title>
                <Card.Text>
                  Level {element.characterLevel} {element.characterRace} {element.characterClass}
                </Card.Text>
              </Card.Body>
            </Card>
          })}
        </div>
      </Row>
    );
  }
}

// Export
export default withRouter(Members);
