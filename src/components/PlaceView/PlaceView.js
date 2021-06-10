import "./PlaceView.css";
import ReviewList from "../ReviewList/ReviewList";
import { Avatar, Row, Col, Typography, Image, Divider } from "antd";

function PlaceView() {
  const { Title } = Typography;
  let reviewsData = [
    { reviewer: "Johnny Li", rating: 3.5 },
    { reviewer: "Sassan Shokoohi", rating: 2.5 },
    { reviewer: "Laura Rodgers", rating: 4 },
    { reviewer: "Amir Jafarvand", rating: 5 },
  ];
  let averageScore =
    reviewsData
      .map((reviewData) => reviewData.rating)
      .reduce((p, c) => p + c, 0) / reviewsData.length;
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={12}>
          <Title level={2}>
            Earls Yaletown{" "}
            <Avatar
              style={{ color: "#ffffff", backgroundColor: "#512da8" }}
              shape="square"
              size={64}
            >
              {averageScore}
            </Avatar>
          </Title>
        </Col>
        <Col lg={12} className="category-of-place">
          <Title level={2}>Restaurant 🍝</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row
        style={{
          marginRight: "0px",
        }}
      >
        <Col
          lg={10}
          style={{
            marginTop: "20px",
          }}
        >
          <Image
            width={500}
            src="https://i.ibb.co/kg11VY4/Screen-Shot-2021-06-04-at-8-54-26-AM.png"
            style={{
              borderRadius: "15px",
            }}
          />
        </Col>
        <Col lg={4}></Col>
        <Col lg={10}>
          <ReviewList reviewsData={reviewsData} />
        </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
