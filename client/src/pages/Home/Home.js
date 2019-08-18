// Dependencies
import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Redirect } from "react-router-dom";
import FormComplete from "../../components/FormComplete";
import SpellCard from "../../components/SpellCard";
import LevelWrapper from "../../components/LevelWrapper";
import API from "../../utils/API.js";
import "./Home.css";

class Home extends Component {
  state = {
    name: ""
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  handleSubmit = event => {
    API.spellSingle(this.state.name).then(response => {
      const newSpellsArr = this.props.spellsArr;
      newSpellsArr.push(response.data);
      this.setState({
        name: ""
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
    if (this.props.isLoggedIn) {
      return <Redirect to="/members" />
    }

    return (
      <div className="home-wrapper">
        <Jumbotron>
          <h1>Welcome to Spell Tracker</h1>
          <h6>Use the search field below to look up spells.
            {this.props.spellsArr.length ?
              <> You can now <span className="auth" onClick={() => this.props.updateAppState({ showAuth: true, type: "Login" })}>Login</span> or <span className="auth" onClick={() => this.props.updateAppState({ showAuth: true, type: "Sign Up" })}>Sign Up</span> for a new account to save these spells for a new Character</>
              :
              " After you've looked up some, you'll have the option to save your selections under a new character."
            }
          </h6>
        </Jumbotron>
        <FormComplete
          list="spell"
          name="name"
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit} />
        {this.renderSpells()}
      </div>
    );
  }
}

// Export
export default Home;
