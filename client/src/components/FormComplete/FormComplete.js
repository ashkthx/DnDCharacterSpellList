import React from "react";
import Autocomplete from "react-autocomplete";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import spellList from "../../utils/spellList.js";
import raceList from "../../utils/raceList.js";
import "./FormComplete.css";

const styles = {
  menu: {
    borderRadius: "3px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2px 0",
    fontSize: "100%",
    position: "fixed",
    overflow: "auto",
    maxHeight: "25%",
    zIndex: 100,
    paddingLeft: "13px"
  },
  wrapper: {
    display: "block",
    width: "100%",
    marginBottom: "5px"
  }
};

let i = 0;
const badDontDoThis = () => {
  i++;
  return i;
};

function FormComplete(props) {
  let list;
  switch (props.list) {
    case "spell":
      list = spellList;
      break;
    case "race":
      list = raceList;
      break;
    case "class":
      // list = classList;
      break;
    default:
      list = spellList;
      break;
  }

  return (
    <Autocomplete
      getItemValue={item => item}
      items={list}
      renderItem={(item, isHighlighted) => (
        <div
          key={badDontDoThis()}
          style={{ background: isHighlighted ? "lightgray" : "white" }}
        >
          {item}
        </div>
      )}
      menuStyle={styles.menu}
      wrapperStyle={styles.wrapper}
      inputProps={{ name: props.name }}
      value={props.name}
      onChange={props.handleInputChange}
      onSelect={value => {
        props.handleInputChange({
          target: { name: props.name, value }
        });
      }}
      shouldItemRender={(item, value) =>
        item.toLowerCase().includes(value.toLowerCase())
      }
      renderInput={inputProps => (
        <InputGroup className="mb-3">
          <FormControl
            {...inputProps}
            placeholder="Start typing to search... e.g. Magic Missile"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
          <InputGroup.Append>
            <Button onClick={props.handleSubmit} variant="outline-secondary">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      )}
    />
  );
}

export default FormComplete;
