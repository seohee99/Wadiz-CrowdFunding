import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function Comment({ comment }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  console.log(comment);

  return (
    <Card
      style={{
        margin: 20,
        marginLeft: comment.parentCommentId ? "50px" : "0px",
        backgroundColor: !comment.parentCommentId ? "#FFFFF0" : "#FAF0E6",
      }}
    >
      <Card.Body>
        <Card.Title style={{ marginTop: 10, marginBottom: 15 }}>
          <span
            style={{
              backgroundColor: "#F5F5F5",
              border: "none",
              borderRadius: 10,
              padding: 5,
              margin: 5,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {comment.userNickname}
          </span>
        </Card.Title>
        <Card.Text>
          {isOpen
            ? comment.body
            : `${comment.body ? comment.body.substring(0, 50) : ""}...`}
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Button
            style={{ alignItems: "end" }}
            variant="secondary"
            onClick={handleToggle}
          >
            {isOpen ? "줄이기" : "더보기"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
