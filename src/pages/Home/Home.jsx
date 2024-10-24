import React from "react";
import "./Home.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <div className="home-container">
      <div className="detail-container">
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src="./bell1.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text style={{ fontSize: "1.5rem" }}>
              pongpeera pannakit
            </Card.Text>
            <Card.Text style={{ fontSize: "1.5rem" }}>
              พงศ์ภีรา พันณะกิจ
            </Card.Text>
            <Card.Text style={{ fontSize: "1.3rem" }}>
              66023450
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="info">
        CSI205 Front End Software Development
        Sripatum University (SPU)

      </div>
      </div>
    </div>
  );
}

export default Home;
