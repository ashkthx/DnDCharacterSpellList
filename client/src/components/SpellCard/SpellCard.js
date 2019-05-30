import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./SpellCard.css";

function SpellCard(props) {
  return (
    <Card bsPrefix="card spell-card-body" bg="dark" text="white" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          <span className="spell-title">{props.spellTitle}</span>
          <Badge onClick={() => this.handleDelete(props.id)} variant="light">X</Badge>
        </Card.Title>
        <Card.Text>
          Level: {props.level} 
          Range: {props.range}
          Duration: {props.duration}
          Casting Time:{props.casting_time}
          Components: {props.components}
          Description: {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SpellCard;
