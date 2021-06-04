import "./PlaceView.css";
import ReviewList from "../ReviewList/ReviewList";
import { Row, Col, Typography, Button, Image, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PlaceView() {
  const { Title } = Typography;
  return (
    <div className="container">
      <Row style={{
            marginLeft: "20px"
            
          }}>
        <Button
          type="primary"
          shape="circle"
          icon={
            <PlusOutlined
              style={{
                fontSize: "18px",
                color: "black",
                strokeWidth: "100",
                stroke: "black",
              }}
            />
          }
          size="large"
          style={{
            backgroundColor: "lightgrey",
            borderColor: "white",
          }}
        />
        <Title level={2}>Earls Yaletown</Title>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Col span={10}>
        <Image
          width={500}
          src="https://i.ibb.co/kg11VY4/Screen-Shot-2021-06-04-at-8-54-26-AM.png"
          style={{ borderRadius: "15px" }}
        />
        <Title
          level={2}
          style={{
            margin: "20px"
            
          }}
        >
          🍔 Restaurant
        </Title>
      </Col>
      <Col span={14}>
        <ReviewList />
      </Col>
    </div>
  );
}

export default PlaceView;
