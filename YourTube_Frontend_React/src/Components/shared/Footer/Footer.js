import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';


const Footer = () => {
  return (
    <footer  className='footer'>
      <Container fluid>
        <Row>
          <Col className='text-center py-2'>
            <p>Copyright &copy; {new Date().getFullYear()} YourTube. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;
