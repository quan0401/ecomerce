import { Row, Col, Container } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="text-white text-center py-3 bg-dark">
            If the app had issues. Please, let's me know!
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
