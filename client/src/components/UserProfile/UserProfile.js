import {
    Title,
    Avatar,
    Button,
    Col,
    Divider,
    Image,
    Rate,
    Row,
    Typography,
  } from 'antd';
import { useSelector } from 'react-redux';
import './UserProfile.css';
import { useEffect, useRef, useState } from 'react';


function UserProfile() {
    const { Title } = Typography;

    const user = useSelector((state) => state.users.user);
    const groups = useSelector((state) => state.groups.allGroups);
    const reviews = useSelector((state) => state.reviews.allReviews);

    const [myGroups, setMyGroups] = useState(groups.filter((group) => user.groups.includes(group.group_id)));
    const myGroupsItems = myGroups.map((group) => <li>{group.name}</li>);

    const [myReviews, setMyReviews] = useState(reviews.filter((review) => review.user_id === user.user_id));
    const myReviewsItems = myReviews.map((review) => <li>{review.place_id + ": " + review.rating}</li>);

    return (
        <div className="container">
            <Row justify="left">
                <Col>
                    <Title level={2}>
                        User Profile
                    </Title>
                </Col>
            </Row>
            <Divider
                style={{
                marginTop: '0',
                borderWidth: 5,
                }}
            />
            <Row justify="center">
                <div className="column1">
                    <Col flex={1}>
                        <Avatar
                            size={200}
                            src={user.avatarURL}
                        />
                        <div className="label">
                            {user.name}
                        </div>
                    </Col>                 
                </div>
                <Col flex={4}>
                    <Title level={4}>
                        My Groups
                    </Title>
                    <ul>{myGroupsItems}</ul>
                    <Title level={4}>
                        My Reviews
                    </Title>
                    <ul>{myReviewsItems}</ul>
                </Col>
            </Row>

        </div>
    );
}

export default UserProfile;
