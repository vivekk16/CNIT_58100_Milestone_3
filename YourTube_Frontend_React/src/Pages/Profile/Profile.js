import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import img from "../../images/user_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faPenToSquare,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/auth_context";
import { useHttpClient } from "../../hooks/http_hook";

const Profile = () => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [date_joined, setDateJoined] = useState("");
  const [password, setPassword] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [showModal, setShowModal] = useState(false);
  const { sendRequest } = useHttpClient();

  let alertHeading, alertMessage;

  if (alertType === "success") {
    alertHeading = "Success!";
    alertMessage = "You have successfully updated your profile.";
  } else {
    alertHeading = "Oh snap! You got an error!";
    alertMessage = "Try again later!";
  }

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const setUserData = (userData) => {
    setEmail(userData.email);
    setDateJoined(userData.date_joined);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
  };

  const handleInputChange = (event, setter) => {
    const { value } = event.target;
    setter(value);
  };


  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:8000/user/update/"+email,
        "PUT",
        JSON.stringify({
          password: password,
          first_name: first_name,
          last_name: last_name,
        }),
        {
          'Authorization': `Token ${auth.token}`,
          'Content-Type': 'application/json'
        }
      );
      if (responseData.ok) {
        setAlertType("success");
      } else {
        setAlertType("danger");
      }
      setAlertShow(true);
      handleModalClose();
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:8000/user/${auth.userId}`,
        "GET",
        null,
        {
          'Authorization': `Token ${auth.token}`,
        }
      );
      setUserData(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Extracting the date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
    const day = date.getDate();

    // Formatting the date
    const formattedDate = `${month < 10 ? "0" : ""}${month}/${
      day < 10 ? "0" : ""
    }${day}/${year}`;
    return formattedDate;
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Container style={{ maxWidth: "400px" }} className="text-center">
        <Card>
          <Card.Img variant="top" src={img} style={{ padding: "20px" }} />
          <Card.Body>
            <Card.Title>
              {first_name} {last_name}
            </Card.Title>
            <Card.Text>{email}</Card.Text>
            <Button variant="danger" onClick={handleModalShow}>
              Edit Profile
            </Button>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Profile created on {formatDate(date_joined)}
            </small>
          </Card.Footer>
        </Card>

        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicFirstName" className="mt-3 mx-1">
                <InputGroup hasValidation>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faSignature} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={first_name}
                    onChange={(e) => handleInputChange(e, setFirstName)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mt-3 mx-1">
                <InputGroup hasValidation>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    value={last_name}
                    onChange={(e) => handleInputChange(e, setLastName)}
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
                    onChange={(e) => handleInputChange(e, setPassword)}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button
              variant="danger"
              type="submit"
              size="md"
              onClick={handleAuthSubmit}
            >
              Update Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert
          variant={alertType}
          show={alertShow}
          onClose={() => setAlertShow(false)}
          dismissible
        >
          <Alert.Heading>{alertHeading}</Alert.Heading>
          <p>{alertMessage}</p>
        </Alert>
      </Container>
    </div>
  );
};

export default Profile;
