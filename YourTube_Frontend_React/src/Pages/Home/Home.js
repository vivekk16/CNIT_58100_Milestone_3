import React, { useState, useEffect } from 'react';
import './Home.css';
import { Container, Row, Col, Card } from "react-bootstrap";
import { useHttpClient } from "../../hooks/http_hook";
import entThumbnail from '../../images/ent_thumbnail.png';
import edThumbnail from '../../images/ed_thumbnail.png';


const Home = ({ profile }) => {
  const { sendRequest } = useHttpClient();
  const [videoData, setVideoData] = useState([{}])

  const getVideoData = async () => {
    try {
      const responseData = await sendRequest(
        'http://localhost:8000/videos',
        "GET",
        null,
        {
          'Content-Type': 'application/json'
        }
      );
      console.log(responseData);
      setVideoData(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVideoData();
  }, []);

  const filteredData = videoData.filter(item => item.video_category === profile);
  const thumbnail = profile==="Entertainment" ? entThumbnail : edThumbnail;



  return (
    
    <Container>
    <Row xs={1} md={2} lg={4}>
      {filteredData.map((item, idx) => (
        <Col key={idx}>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src={thumbnail} style={{ height: "200px", objectFit: "cover" }} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text style={{ marginBottom: "10px" }}>{item.channel_name}</Card.Text>
              <Card.Text style={{ display: "flex", alignItems: "center" }}>
                <span >{item.views} views</span>
                <span style={{ margin: "0 5px", fontWeight: "bold"  }}>·</span>
                <span>{item.uploaded_at}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  )
};

export default Home;
