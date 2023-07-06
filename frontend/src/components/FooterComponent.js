import { Row, Col, Container } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="text-white text-center py-3 bg-dark">
            Shopping-online Copyright
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
