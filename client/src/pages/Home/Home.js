// Dependencies
import React, { Component } from "react";
import FormComplete from "../../components/FormComplete";
import SpellCard from "../../components/SpellCard";
import LevelWrapper from "../../components/LevelWrapper";
import API from "../../utils/API.js";
import "./Home.css";

class Home extends Component {
  state = {
    spellName: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    API.spellSingle(this.state.spellName).then(response => {
      const newSpellsArr = this.props.spellsArr;
      newSpellsArr.push(response.data);
      this.setState({
        spellName: ""
      });
      this.props.updateAppState({ spellsArr: newSpellsArr, homeSearched: true });
    })
  };

  handleDelete = spellId => {
    const newSpellsArr = this.state.spellsArr.filter(element => element.id !== spellId);
    this.setState({ spellsArr: newSpellsArr }, () => {
      if (!newSpellsArr.length) {
        this.props.updateAppState({ homeSearched: false })
      }
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
    return (
      <div className="home-wrapper">
        <FormComplete
          spellName={this.state.spellName}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit} />
        {this.props.spellsArr.length ? (
          <h4>
            <span className="auth" onClick={() => this.props.updateAppState({ showAuth: true, type: "Login" })}>Login</span> or <span className="auth" onClick={() => this.props.updateAppState({ showAuth: true, type: "Sign Up" })}>Sign Up</span> to save these spells for a new Character
          </h4>
        ) : ""}
        {this.renderSpells()}
      </div>
    );
  }
}

// Export
export default Home;
