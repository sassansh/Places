import "./Category.css";
import { Card, Col, Row } from "antd";

function Category(props) {
  return (
    <li>
      <Card className="category" size="small">
        <Row>
          <Col lg={12} className="categoryName">
            <h2>{props.category.categoryName}</h2>
          </Col>
          <Col lg={12} className="numberOfPlaces">
            <h2>{props.category.places.length + " Places"}</h2>
          </Col>
        </Row>
      </Card>
    </li>
  );
}

export default Category;