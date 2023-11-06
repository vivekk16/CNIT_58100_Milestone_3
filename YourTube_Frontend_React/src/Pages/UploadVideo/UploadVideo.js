import React, { useState, useContext } from "react";
import {
  Container,
  FormControl,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPenNib,
  faLink,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./UploadVideo.css";
import { useHttpClient } from "../../hooks/http_hook";
import { AuthContext } from "../../context/auth_context";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [channelName, setChannelName] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertShow, setAlertShow] = useState(false);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  let alertHeading, alertMessage;

  if (alertType === "success") {
    alertHeading = "Success!";
    alertMessage = "You have successfully uploaded a video to YourTube.";
  } else {
    alertHeading = "Oh snap! You got an error!";
    alertMessage = "Try again later!";
  }

  const handleInputChange = (event, setter) => {
    const { value } = event.target;
    setter(value);
  };

  const resetForm = () => {
    setTitle("");
    setChannelName("");
    setDescription("");
    setLink("");
  };

  const handleVideoSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:8000/video/create",
        "POST",
        JSON.stringify({
          title: title,
          channel_name: channelName,
          likes: `${Math.floor(Math.random() * 100) + 1}K`,
          views: `${Math.floor(Math.random() * 100) + 1}M`,
          uploaded_at: `${Math.floor(Math.random() * 24) + 1} hours ago`,
          description: description,
          comments: {},
          image: null,
          link: link,
          video_category: videoCategory,
        }),
        {
          Authorization: `Token ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      if (responseData.ok) {
        setAlertType("success");
      } else {
        setAlertType("danger");
      }
      setAlertShow(true);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="upload-container justify-content-center align-items-center my-5">
        <div className="upload-box">
          <h2 className="text-center">Add a New Video</h2>
          <Form>
            <Form.Group controlId="formBasicVideoTitle" className="mt-3 mx-1">
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faPenNib} />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Enter Video Title"
                  value={title}
                  onChange={(e) => handleInputChange(e, setTitle)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicChannelName" className="mt-3 mx-1">
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faYoutube} />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Enter Channel Name"
                  value={channelName}
                  onChange={(e) => handleInputChange(e, setChannelName)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group
              controlId="formBasicVideoCategory"
              className="mt-3 mx-1"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faVideo} />
                </InputGroup.Text>
                <Form.Select
                  aria-label="Video Category Select"
                  value={videoCategory}
                  onChange={(e) => handleInputChange(e, setVideoCategory)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Information">Information</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3 mx-1">
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faMessage} />
                </InputGroup.Text>
                <FormControl
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => handleInputChange(e, setDescription)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicLink" className="mt-3 mx-1">
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faLink} />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Enter Link"
                  value={link}
                  onChange={(e) => handleInputChange(e, setLink)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <div className="mt-4 d-flex justify-content-center">
              <Button
                variant="danger"
                type="submit"
                size="md"
                onClick={handleVideoSubmit}
                className="my-3"
              >
                Upload Video
              </Button>
            </div>
          </Form>
          <Alert
            variant={alertType}
            show={alertShow}
            onClose={() => setAlertShow(false)}
            dismissible
          >
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        </div>
      </div>
    </Container>
  );
};

export default UploadVideo;
