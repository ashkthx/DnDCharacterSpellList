import React from "react";
import Card from "react-bootstrap/Card";
import "./LevelWrapper.css";

function LevelWrapper(props) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{props.level === "Cantrip" ? "Cantrip" : `Level ${props.level}`}</Card.Title>
          {props.children}          
      </Card.Body>
    </Card>
  );
};

export default LevelWrapper;