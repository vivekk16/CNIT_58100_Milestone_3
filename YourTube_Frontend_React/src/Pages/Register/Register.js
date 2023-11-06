import React, {useState} from "react";
import {Container, Form, Button, Row, Col, InputGroup, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faPenToSquare,
  faSignature
} from "@fortawesome/free-solid-svg-icons";
import './Register.css';
import logo from "../../images/yourtube.jpg";
import { useHttpClient } from "../../hooks/http_hook";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const { sendRequest} = useHttpClient();

  let alertHeading, alertMessage;

  if (alertType === "success") {
    alertHeading = "Success! You are registered.";
    alertMessage = "You have successfully registered for YourTube.";
  } else {
    alertHeading = "Oh snap! You got an error!";
    alertMessage =
      "Try again later!";
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
try{
      const responseData = await sendRequest('http://localhost:8000/user/create', 'POST',JSON.stringify({
        email: email,
        username:email,
        password: password,
        first_name:first_name,
        last_name: last_name
      }),{
        'Content-Type': 'application/json'
      })
      if(responseData.ok){
        setAlertType("success");
      }
      else{
        setAlertType("danger")
      }
      setAlertShow(true);
      resetForm();
    }catch(err){
      console.log(err);
    }

  };

  return (

    <Container>
      <Row className="justify-content-center align-items-center login-container">
        <Col xs={10} sm={8} md={6} lg={4} className="login-box">
        <div className="text-center mb-4 mr-2 align-items-center">
              <img
                src={logo}
                alt="logo"
                className="img-thumbnail mx-3 w-50 h-50"
              />
              <h3 className="mt-2">Register User</h3>
            </div>
          <Form>

          <Form.Group controlId="formBasicFirstName" className="mt-3 mx-1">
            <InputGroup hasValidation>
            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSignature} /></InputGroup.Text>
              <Form.Control type="text" placeholder="Enter First Name" value={first_name} onChange={handleFirstNameChange} required />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className="mt-3 mx-1">
            <InputGroup hasValidation>
            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faPenToSquare} /></InputGroup.Text>
              <Form.Control type="text" placeholder="Enter Last Name" value={last_name} onChange={handleLastNameChange} required />
              </InputGroup>
            </Form.Group>
          
            <Form.Group controlId="formBasicEmail" className="mt-3 mx-1">
            <InputGroup hasValidation>
            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
              <Form.Control type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange} required />
            </InputGroup>

            </Form.Group>
       
            <Form.Group controlId="formBasicPassword" className="mt-3 mx-1">
            <InputGroup hasValidation>
            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faKey} /></InputGroup.Text>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} required />
              </InputGroup>
            </Form.Group>

            <div className="mt-4 d-flex justify-content-center">
              <Button variant="danger" type="submit" size="md" onClick={handleAuthSubmit}>
                Register
              </Button>
            </div>
          </Form>
          {/* <div className="mt-3 text-center">
              <a href="/forgot-password">Forgot Password?</a>
            </div> */}
        </Col>
      </Row>
      <Alert variant={alertType} show={alertShow} onClose={() => setAlertShow(false)} dismissible>

        <Alert.Heading>{alertHeading}</Alert.Heading>
        <p>
            {alertMessage}
        </p>
      </Alert>

    </Container>


  )
};

export default Register;
