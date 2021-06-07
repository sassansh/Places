import "./PlaceView.css";
import ReviewList from "../ReviewList/ReviewList";
import { Row, Col, Typography, Image, Divider } from "antd";

function PlaceView() {
  const { Title } = Typography;
  return (
    <div className="container">
      <Row style={{
            marginLeft: "20px"

          }}>
        <Col lg={10}><Title level={2}>Earls Yaletown</Title></Col>
        <Col lg={4}></Col>
        <Col lg={10}><Title
          level={2}
        >
          Restaurant 🍝
        </Title></Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row style={{
            marginRight: "0px"

          }}>
      <Col lg={10} style={{
            marginTop: "20px" }}>
        <Image
          width={500}
          src="https://i.ibb.co/kg11VY4/Screen-Shot-2021-06-04-at-8-54-26-AM.png"
          style={{
            borderRadius: "15px" }}
        />
      </Col>
      <Col lg={4}></Col>
      <Col lg={10}>
        <ReviewList/>
      </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
