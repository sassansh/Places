import "./CategoryView.css";

import { Button, Col, Divider, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PlaceList from "../PlaceList/PlaceList";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../redux/actions/categoryActions";

function CategoryView() {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  let currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );
  let categoryType = currentCategory.name + " " + currentCategory.emoji;
  let btnCategory = currentCategory.name_singular;

  return (
    <div className="container">
      <Row style={{ marginLeft: "20px" }}>
        <Col lg={12}>
          <Title level={2}>{categoryType}</Title>
        </Col>
        <Col lg={12} className="addPlaceButton">
          <Link to="/addPlace" onClick={() => {dispatch(setCategory(currentCategoryID))}}>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Add {btnCategory}
            </Button>
          </Link>
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
