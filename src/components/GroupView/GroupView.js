import "./GroupView.css";
import CategoryList from "../CategoryList/CategoryList";
import { Row, Col, Typography, Divider, Avatar } from "antd";

function GroupView() {
  const { Title } = Typography;
  const categoriesData = [
    {
      categoryEmoji: "🏖️",
      categoryName: "Beaches",
      places: [
        { placeName: "Jericho Beach", placeRating: 5 },
        { placeName: "Sunset Beach", placeRating: 3 },
        { placeName: "Locarno Beach", placeRating: 4.5 },
        { placeName: "Kitsilano Beach", placeRating: 2.5 },
      ],
    },
    {
      categoryEmoji: "🍔",
      categoryName: "Restaurants",
      places: [
        { placeName: "Blue Water Cafe", placeRating: 2 },
        { placeName: "Tasty Indina Bistro", placeRating: 3.5 },
        { placeName: "The Moose", placeRating: 4.5 },
        { placeName: "Roxy Burger", placeRating: 2.5 },
        { placeName: "McDonalds", placeRating: 1 },
        { placeName: "Viet House", placeRating: 4.5 },
        { placeName: "Congee Noodle House", placeRating: 5 },
        { placeName: "Italian Kitchen", placeRating: 1.5 },
      ],
    },
  ];
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={10}>
          <Title level={2}>
            <Avatar
              size="large"
              src="https://mspoweruser.com/wp-content/uploads/2017/09/azure-1.png"
            />{" "}
            Azure Group
          </Title>
        </Col>
        <Col lg={4}></Col>
        <Col lg={10}>
          <Title level={2}>👤 13 Members</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <CategoryList categoriesData={categoriesData} />
    </div>
  );
}

export default GroupView;
