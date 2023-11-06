import React, { useContext, useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import logo from "../../images/yourtube.jpg";
import { AuthContext } from "../../context/auth_context";
import { useHttpClient } from "../../hooks/http_hook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const {  sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:8000/user/login",
        "POST",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      if (responseData.success) {
        auth.login(responseData.userId, responseData.token);
      }else {
        setAlertShow(true);
        resetForm();
      }
    } catch (err) {
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
            <h3 className="mt-2">User Login</h3>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mt-3 mx-1">
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3 mx-1">
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <div className="mt-4 d-flex justify-content-center">
              <Button
                variant="danger"
                type="submit"
                size="md"
                onClick={handleAuthSubmit}
              >
                Login
              </Button>
            </div>
          </Form>
          {/* <div className="mt-3 text-center">
              <a href="/forgot-password">Forgot Password?</a>
            </div> */}
        </Col>
      </Row>
      <Alert
        variant="danger"
        show={alertShow}
        onClose={() => setAlertShow(false)}
        dismissible
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Try again later!</p>
      </Alert>
    </Container>
  );
};

export default Login;
