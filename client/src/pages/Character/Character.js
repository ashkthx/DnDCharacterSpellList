import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import SpellCard from "../../components/SpellCard";
import LevelWrapper from "../../components/LevelWrapper/LevelWrapper";
import "./Character.css";

class Character extends Component {
  state = {
    isLoggedIn: true,
    spellName: "",
    characterName: "",
    spellsArr: []
  };

  componentWillMount() {
    API.characterData(this.props.match.params.characterId).then(response => {
      if (!response.data.status) {
        this.setState({ isLoggedIn: false });
      }
      console.log(response.data);
      const { characterName, spellsArr } = response.data;
      this.setState({
        characterName,
        spellsArr
      });
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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

  handleDelete = (spellId) => {
    const deleteObj = {
      characterId: this.props.match.params.characterId,
      spellId
    }
    API.spellDelete(deleteObj).then(response => {
      this.setState({ spellsArr: response.data });
    });
  };

  renderSpells = () => {
    const spellsObj = {};

    this.state.spellsArr.forEach((element, i) => {
      if (spellsObj[element.level]) {
        spellsObj[element.level].push(<SpellCard {...element} handleDelete={this.handleDelete} key={i} />);
      }
      else {
        spellsObj[element.level] = [<SpellCard {...element} handleDelete={this.handleDelete} key={i} />];
      }
    });

    const orderArr = ["Cantrip", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const wrapperArr = [];

    orderArr.forEach((element, i) => {
      if (spellsObj[element]) {
        wrapperArr.push(
        <LevelWrapper level={element} key={i}>
          {spellsObj[element]}
        </LevelWrapper>
        )
      }
    });

    return wrapperArr;
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <h1>{this.state.characterName}</h1>
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
            <Button onClick={this.handleSubmit} variant="outline-secondary">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {this.renderSpells()}
      </Row>
    );
  }
}

export default Character;
