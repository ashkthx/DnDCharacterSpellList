import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./SpellCard.css";

function SpellCard(props) {
  return (
    <Card className="mb-3" bg="dark" text="white">
      <Card.Body>
        <Card.Title>
          <span className="spell-title">{props.spellTitle}</span>
          <Badge onClick={() => props.handleDelete(props.id)} variant="light">X</Badge>
        </Card.Title>
        <Card.Text>
          Level: {props.level}<br />
          Range: {props.range}<br />
          Duration: {props.duration}<br />
          Casting Time:{props.casting_time}<br />
          Components: {props.components}<br /><br />
          Description: {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SpellCard;
