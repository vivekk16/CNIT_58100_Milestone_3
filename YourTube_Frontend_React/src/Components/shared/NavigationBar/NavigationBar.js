import React, { useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouseChimney,
  faClapperboard,
  faBook,
  faUserPlus,
  faMicrophone,
  faVideo,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import "./NavigationBar.css";
import logo from "../../../images/yourtube.jpg";
import { AuthContext } from "../../../context/auth_context";

const NavigationBar = ({profile, onProfileToggle}) => {
const [homeProfile, setHomeProfile] = useState("Information");

  const handleProfileSelect = (eventKey) => {
    onProfileToggle(eventKey);
    setHomeProfile(eventKey);
    //console.log(eventKey);
  };

  const auth = useContext(AuthContext);

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="bg-body-tertiary px-5"
        bg="light"
        data-bs-theme="light"
      >
        <LinkContainer to="/home">
          <Navbar.Brand className="brand-logo">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            YourTube
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {auth.isLoggedIn && (
              <>
                <DropdownButton
                  id="dropdown-environment"
                  title={
                    <span>
                      <FontAwesomeIcon
                        icon={
                          homeProfile === "Entertainment"
                            ? faClapperboard
                            : faBook
                        }
                        className="px-1"
                      />{" "}
                      {homeProfile}
                    </span>
                  }
                  onSelect={handleProfileSelect}
                  className="px-3"
                  size="md"
                  variant="light"
                  drop="down-centered"
                >
                  <Dropdown.Item eventKey="Entertainment">
                    Entertainment
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Information">
                    Information
                  </Dropdown.Item>
                </DropdownButton>

                <Form className="d-flex">
                  <InputGroup hasValidation style={{ width: "600px", resize: "none" }}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faSearchengin} />
                    </InputGroup.Text>
                    <FontAwesomeIcon className="mx-3" style={{ marginTop: "10px" }}  icon={faMicrophone} />
                  </InputGroup>
                 
                </Form>
              </>
            )}
          </Nav>
          <Nav>
            {auth.isLoggedIn && (
              <React.Fragment>
                <LinkContainer to="/home">
                  <Nav.Link>
                    {" "}
                    <FontAwesomeIcon
                      icon={faHouseChimney}
                      className="px-1"
                    />{" "}
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="">
                  <Nav.Link>
                    {" "}
                    <FontAwesomeIcon
                      icon={faBell}
                      className="px-1"
                    />{" "}
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/uploadVideo">
                  <Nav.Link>
                    {" "}
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="px-1"
                    />{" "}
                  </Nav.Link>
                </LinkContainer>
                <DropdownButton
                  id="dropdown-user"
                  title={
                    <span>
                      <FontAwesomeIcon icon={faUser} className="px-1" />{" "}
                      {auth.userId}
                    </span>
                  }
                  className="px-3 mt-1"
                  size="sm"
                  variant="light"
                  drop="down-centered"
                >
                   <LinkContainer to="/profile"> 
                  <Dropdown.Item>My Profile</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={auth.logout}>Logout</Dropdown.Item>
                </DropdownButton>
              </React.Fragment>
            )}
            {!auth.isLoggedIn && (
              <>
                <LinkContainer to="/register">
                  <Nav.Link>
                    {" "}
                    <FontAwesomeIcon icon={faUserPlus} className="px-1" />{" "}
                    Register
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <span>
                      <FontAwesomeIcon icon={faUser} className="px-1" /> Login
                    </span>
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
