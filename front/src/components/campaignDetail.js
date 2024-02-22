import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Comment from "./comment";

export default function CampaignDetail({ campaignId, handleClose }) {
  const [campaign, setCampaign] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${campaignId}`)
      .then((response) => {
        setCampaign(response.data.campaign);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [campaignId]);

  if (!campaign) {
    return null;
  }

  const formatTotalBackedAmount = (amount) => {
    const units = ["", "만", "억", "조"];
    let unitIndex = 0;

    while (amount >= 10000 && unitIndex < units.length - 1) {
      amount /= 10000;
      unitIndex++;
    }

    return `${Math.floor(amount)}${units[unitIndex]}+`;
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: 20, fontWeight: "bold" }}>
          {campaign.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            marginRight: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 20,
              padding: 5,
              margin: 2,
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            {campaign.categoryName}{" "}
          </span>
          <span
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 20,
              padding: 5,
              margin: 2,
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            {formatTotalBackedAmount(campaign.totalBackedAmount)}
          </span>
        </div>
        <div
          style={{
            marginTop: 50,
            marginBottom: 50,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 18,
          }}
        >
          {" "}
          {campaign.coreMessage}
        </div>
        <span
          style={{
            backgroundColor: "#F5F5F5",
            borderRadius: 20,
            padding: 10,
            margin: 2,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Comments
        </span>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
