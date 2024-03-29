import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import SpellCard from "../../components/SpellCard";
import LevelWrapper from "../../components/LevelWrapper/LevelWrapper";
import FormComplete from "../../components/FormComplete";
import "./Character.css";

class Character extends Component {
  state = {
    name: "",
    characterName: ""
  };

  componentDidMount() {
    API.characterData(this.props.match.params.characterId).then(response => {
      const { characterName, spellsArr } = response.data;
      this.setState({ characterName }, () => this.props.updateAppState({ spellsArr }));
    });
  }

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const apiObj = {
      characterId: this.props.match.params.characterId,
      spellName: this.state.name
    };
    API.spellAdd(apiObj).then(response => {
      this.setState({ name: "" }, () => this.props.updateAppState({ spellsArr: response.data }));
    });
  };

  handleDelete = (spellId) => {
    const deleteObj = {
      characterId: this.props.match.params.characterId,
      spellId
    }
    API.spellDelete(deleteObj).then(response => {
      this.props.updateAppState({ spellsArr: response.data });
    });
  };

  renderSpells = () => {
    const spellsObj = {};

    this.props.spellsArr.forEach((element, i) => {
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
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <h1 className="characterh1">{this.state.characterName}</h1>
        <FormComplete
          list="spell"
          name="name"
          value={this.state.name}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        {this.renderSpells()}
      </Row>
    );
  }
}

export default Character;
