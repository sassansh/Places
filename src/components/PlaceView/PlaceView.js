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
        {/* <Button
          type="primary"
          shape="circle"
          icon={
            <PlusOutlined
              style={{
                verticalAlign:"middle",
                fontSize: "25px",
                color: "black",
                strokeWidth: "100",
                stroke: "black",
              }}
            />
          }
          size="large"
          style={{
            backgroundColor: "white",
            borderColor: "white",
          }}
        /> */}
        <Col span={8}><Title level={2}>Earls Yaletown</Title></Col>
        <Col span={12}></Col>
        <Col span={4}><Title
          level={2}
        >
          🍔 Restaurant
        </Title></Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row>
      <Col span={10}>
        <Image
          width={500}
          src="https://i.ibb.co/kg11VY4/Screen-Shot-2021-06-04-at-8-54-26-AM.png"
          style={{ borderRadius: "15px" }}
        />
      </Col>
      <Col span={14}>
        <ReviewList />
      </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
