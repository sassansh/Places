import "./PlaceView.css";
import ReviewList from "../ReviewList/ReviewList";
import { Row, Col, Typography, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PlaceView() {
  const { Title } = Typography;
  return (
    <div>
      <Row>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        />
        <Title level={2}>Earls Yaletown</Title>
      </Row>
      <Row>
        <Col span={10}>
          <Row>
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Row>
          <Row>
          <Title level={2}>🍔 Restaurant</Title>
          </Row>
        </Col>
        <Col span={14}>
          <ReviewList />
        </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
