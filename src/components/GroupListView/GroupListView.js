import "./GroupListView.css";

import { Button, Col, Divider, Row, Typography } from "antd";

import GroupList from "../GroupList/GroupList";
import { TeamOutlined } from "@ant-design/icons";

function GroupListView() {
  const { Title } = Typography;
  const groupsData = [
    {
      name: "Some Real Eaters",
      description: "reliable sites for reliable bites",
      avatarURL: "https://media.techeblog.com/images/cooking-food-cpu.jpg",
      numReviews: 128,
      numMembers: 13,
      groupID: 4,
    },
    {
      name: "Brews Sisters",
      description: "The Real Lives of Alewives",
      avatarURL:
        "https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2015/08/beerAllergy-1165339040-770x553-1-745x490.jpg",
      numReviews: 557,
      numMembers: 18,
      groupID: 1,
    },
    {
      name: "Nature Fam",
      description: "go play outside!!!",
      avatarURL:
        "https://t3.ftcdn.net/jpg/01/70/15/08/240_F_170150827_KWCkNDhPVSmCq48BoxuVwvuANWv5JSjT.jpg",
      numReviews: 83,
      numMembers: 35,
      groupID: 2,
    },
    {
      name: "La Cuisine du Père Noël",
      description: "Food snob hub for the UBC Fronch Club",
      avatarURL:
        "https://i0.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2016/09/iStock-119483507.jpg?resize=1024%2C683&ssl=1",
      numReviews: 28,
      numMembers: 47,
      groupID: 3,
    },
    {
      name: "Park-er Posse",
      description: "picnic basket optional",
      avatarURL:
        "https://hookedonhouses.net/wp-content/uploads/2015/09/Full-House-credits-in-front-of-Alamo-Square-Victorians.jpg",
      numReviews: 28,
      numMembers: 47,
      groupID: 4,
    },
  ];
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col span={12}>
          <Title level={2}>
            <TeamOutlined size="large" /> Groups
          </Title>
        </Col>
        <Col span={12} className="joinGroup">
          <Button type="primary" icon={<TeamOutlined />} size="large">
            Create Group
          </Button>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <GroupList groupsData={groupsData} />
    </div>
  );
}

export default GroupListView;
