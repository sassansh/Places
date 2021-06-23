import "./CategoryView.css";

import { Button, Col, Divider, Row, Typography } from "antd";

import PlaceList from "../PlaceList/PlaceList";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function CategoryView() {
  const { Title } = Typography;
  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  let currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );
  let categoryType = currentCategory.name + " " + currentCategory.emoji;
  let btnCategory = currentCategoryID === 1 ? "Beach" : "Restaurant";

  return (
    <div className="container">
      <Row style={{ marginLeft: "20px" }}>
        <Col lg={12}>
          <Title level={2}>{categoryType}</Title>
        </Col>
        <Col lg={12} className="addPlaceButton">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add {btnCategory}
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
