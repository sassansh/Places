import "./AddReview.css";
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Rate,
  Image,
  Avatar,
} from "antd";
import { useState } from "react";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

function AddReview() {
  const [rateValue, setRateValue] = useState(0);
  const { Title } = Typography;

  function handleRateChange(value) {
    setRateValue(value);
  }

  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={24}>
          <Title level={2}>Add Review</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row>
        <Col lg={4} md={5} sm={24}>
          <Image
            preview={false}
            src="https://i.ibb.co/kg11VY4/Screen-Shot-2021-06-04-at-8-54-26-AM.png"
            style={{
              borderRadius: "10px",
            }}
          />
        </Col>
        <Col
          lg={6}
          md={7}
          sm={24}
          style={{
            marginLeft: "20px",
          }}
        >
          <div className="restaurantNameRate">
            <b>Earls Yaletown</b>
            <br />
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              🍔
            </Avatar>{" "}
            Restaurant
          </div>
        </Col>
        <Col lg={13} md={11} sm={24} xs={24} style={{ textAlign: "center" }}>
          <span className="ratingText">Select Overall Rating</span>
          <br />
          <Rate
            style={{ fontSize: "2.5vw" }}
            tooltips={desc}
            onChange={handleRateChange}
            value={rateValue}
          />
          <br />
          <Button className="button" type="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AddReview;
