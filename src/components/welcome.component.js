import React from "react";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

import header1 from "./welcomeResrc/header.jpg"
import header2 from "./welcomeResrc/header2.JPG"
import './welcomeResrc/welcome.css'
// import header3 from "./welcomeResrc/header3.jpg"

const Welcome = () => {
    return (
      <div>
        <div className="headerImg"></div>
        <div className="container py-5">
          <CardDeck>
          <Card>
            <Card.Img variant="top" src={header1} />
            <Card.Body>
              <Card.Title>MicroGreens</Card.Title>
              <Card.Text>
                Microgreens are baby vegetables, herbs, and flowers. They are packed with 4-6x as much nutrients as your typical vegatable.
              </Card.Text>
              <Button href="#" variant="info">Learn about Microgreens!</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Evolution Urban Grows</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={header2} />
            <Card.Body>
              <Card.Title>NJ Native Plants</Card.Title>
              <Card.Text>
              With New Jersey our home state we find it important to not just feed the people but the ecosystem too!
              </Card.Text>
              <Button href="#" variant="info">Learn NJ Natives!</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Evolution Urban Grows</small>
            </Card.Footer>
          </Card>
          <Card>
            {/* <Card.Img variant="top" src={header3} /> */}
            <Card.Body>
              <Card.Title>Our Team</Card.Title>
              <Card.Text>
              Our team is composed of three young and innovative individuals. Their diverse backgrounds allow for a unique thought processes leading them here
              </Card.Text>
              <Button href="#" variant="info">Meet the team!</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Evolution Urban Grows</small>
            </Card.Footer>
          </Card>
        </CardDeck>
        </div>

      </div>
    );
  }

export default Welcome;
