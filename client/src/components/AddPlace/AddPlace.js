import "./AddPlace.css";

import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { addPlace } from "../../redux/actions/placeActions";
import { useDispatch, useSelector } from "react-redux";

function AddPlace() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories = useSelector(state=>state.categories.allCategories);
  const currentCategoryID = useSelector(state=>state.categories.currentCategoryID);
  const currentGroupID = useSelector(state=>state.groups.currentGroupID);

  const currentCategory = () => {
    return categories.find(
      (category) => category.category_id === currentCategoryID
    );
  };

  function handleAddPlace() {
    let name = form.getFieldValue("name");
    let imgURL = form.getFieldValue("imgURL");
    let address = form.getFieldValue("address");
    if (name === undefined) return;
    let newPlace = {
      name: name,
      address: address,
      group_id: currentGroupID,
      category_id: currentCategoryID,
      ImageURL: imgURL,
    };
    dispatch(addPlace(newPlace));
    form.resetFields();
  }
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col span={12}>
          <Title level={2}>Add {currentCategory().name_singular}</Title>
        </Col>
        <Col span={12} className="currentCategory">
          <h2>
            {currentCategory().emoji} {currentCategory().name}
          </h2>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row justify="center">
        <Col lg={8}>
          <Form className="form" form={form} layout="vertical" size="large">
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="imgURL" label="Image URL">
              <Input placeholder="http://" />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input placeholder="Address" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Link to="/placeView" onClick={handleAddPlace}>
            <Button className="button" type="primary">
              Submit
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AddPlace;
