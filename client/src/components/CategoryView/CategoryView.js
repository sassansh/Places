import "./CategoryView.css";

import { Button, Col, Divider, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import PlaceList from "../PlaceList/PlaceList";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCategory } from "../../redux/actions/categoryActions";

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
  let categoryType = (currentCategory === undefined)? "" : currentCategory.name + " " + currentCategory.emoji;
  let btnCategory = (currentCategory === undefined)? "" : currentCategory.name_singular;

  return (currentCategory === undefined) ? (
    <Redirect to="/groupview" /> 
  ) : (
    <Col className="container">
      <Row justify="center">
        <Col lg={12} md={12} sm={12}>
          <Title level={2}>{categoryType}</Title>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24}></Col>
        <Col lg={12} md={12} sm={12} className="addPlaceButton">
          <Link to="/addPlace" onClick={() => {dispatch(setCurrentCategory(currentCategoryID))}}>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Add {btnCategory}
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5,
        }}
      />
      <PlaceList />
    </Col>
  );
}

export default CategoryView;
