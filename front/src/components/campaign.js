import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Button } from "react-bootstrap";
import CampaignDetail from "./campaignDetail";

export default function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((response) => {
        setCampaigns(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const formatTotalBackedAmount = (amount) => {
    const units = ["", "만", "억", "조"];
    let unitIndex = 0;

    while (amount >= 10000 && unitIndex < units.length - 1) {
      amount /= 10000;
      unitIndex++;
    }

    return `${Math.floor(amount)}${units[unitIndex]}+`;
  };

  const handleShow = (campaign) => setSelectedCampaign(campaign);
  const handleClose = () => setSelectedCampaign(null);

  return (
    <>
      <Card
        style={{
          margin: 20,
          padding: 50,
          fontSize: 40,
          fontWeight: "bolder",
          backgroundColor: "#ADD8E6",
          border: "none",
          boxShadow: "0px 5px 5px rgba(0,0,0,0.25)",
        }}
      >
        WADIZ CROWD FUNDING
      </Card>
      <div className="d-flex flex-wrap justify-content-around">
        {campaigns.map((campaign) => (
          <Card
            style={{
              width: "18rem",
              boxShadow: "0px 5px 10px rgba(0,0,0,0.25)",
            }}
            className="m-3"
            key={campaign._id}
          >
            <Card.Img variant="top" src={campaign.photoUrl} />
            <Card.Body>
              <Card.Title style={{ fontSize: 16, fontWeight: "bold" }}>
                {campaign.title}
              </Card.Title>
              <Card.Text>
                <div style={{ marginTop: 20 }}>
                  <span
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: 20,
                      padding: 5,
                      margin: 2,
                      fontSize: 10,
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
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {formatTotalBackedAmount(campaign.totalBackedAmount)}
                  </span>
                  <Button
                    onClick={() => handleShow(campaign)}
                    style={{
                      backgroundColor: "#ADD8E6",
                      border: "none",
                      marginLeft: 20,
                    }}
                  >
                    상세 보기
                  </Button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        {selectedCampaign && (
          <CampaignDetail
            campaignId={selectedCampaign._id}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
}
