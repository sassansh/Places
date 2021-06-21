import "./AddPlace.css";

import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";

import CategoriesContext from "../../context/CategoriesContext";
import CurrentCategoryIDContext from "../../context/CurrentCategoryIDContext";
import CurrentGroupIDContext from "../../context/CurrentGroupIDContext";
import CurrentPlaceIDContext from "../../context/CurrentPlaceIDContext";
import PlacesContext from "../../context/PlacesContext";
import { useContext } from "react";

function AddPlace() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [places, setPlaces] = useContext(PlacesContext);
  const [categories] = useContext(CategoriesContext);
  const [currentCategoryID] = useContext(CurrentCategoryIDContext);
  const [currentGroupID] = useContext(CurrentGroupIDContext);
  const [, setCurrentPlaceID] = useContext(CurrentPlaceIDContext);

  const currentCategory = () => {
    return categories.find(
      (category) => category.category_id === currentCategoryID
    );
  };

  function handleAddPlace() {
    let place_id = places.length + 1;
    let name = form.getFieldValue("name");
    let imgURL = form.getFieldValue("imgURL");
    let address = form.getFieldValue("address");
    if (name === undefined) return;
    let newPlace = {
      place_id: place_id,
      name: name,
      address: address,
      group_id: currentGroupID,
      category_id: currentCategoryID,
      ImageURL: imgURL,
    };
    const newPlaces = [...places];
    newPlaces.push(newPlace);
    setPlaces(newPlaces);
    setCurrentPlaceID(place_id);
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
          <Title level={2}>Add Place</Title>
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
          <Button onClick={handleAddPlace} className="button" type="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AddPlace;
