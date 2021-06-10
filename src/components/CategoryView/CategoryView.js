import "./CategoryView.css";
import PlaceList from "../PlaceList/PlaceList";
import { Row, Col, Typography, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function CategoryView() {
  const { Title } = Typography;
  let categoryType = "Restaurants 🍝";
  return (
    <div className="container">
      <Row style={{ marginLeft: "20px" }}>
        <Col lg={12}>
          <Title level={2}>{categoryType}</Title>
        </Col>
        <Col lg={12} className="addPlaceButton">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add Restaurant
          </Button>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <PlaceList />
    </div>
  );
}

export default CategoryView;
