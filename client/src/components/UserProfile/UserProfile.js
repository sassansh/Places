import {
    Avatar,
    Col,
    Divider,
    Rate,
    Row,
    Typography,
  } from 'antd';
import { useSelector } from 'react-redux';
import './UserProfile.css';

function UserProfile() {
    const { Title } = Typography;
    const user = useSelector((state) => state.users.user);
    const users = useSelector((state) => state.users.allUsers);
    const userData = users.find(item => item.user_id === user.user_id);
    const reviews = useSelector((state) => state.reviews.allReviews);
    const places = useSelector((state) => state.places.allPlaces);
    const groups = useSelector((state => state.groups.allGroups));

    function getPlace(place_id) {
        let placeName = places.find(place => place.place_id === place_id).name;
        return placeName;
    }

    function getRating(rating) {
        return (
            <Rate
            style={{ fontSize: '15px' }}
            value={rating}
            disabled={true}
          />
        );
    }

    function getGroup(group_id) {
        return (
            groups.find(group => group.group_id === group_id).name
        );
    }

    const myGroups = userData.groups;
    const myGroupsItems = myGroups.map((group_id) => <li>{getGroup(group_id)}</li>);

    const myReviews = reviews.filter((review) => review.user_id === user.user_id);
    const myReviewsItems = myReviews.map((review) => <li><Row justify="end"><Col className="place">{getPlace(review.place_id)}</Col><Col>{getRating(review.rating)}</Col></Row></li>);
    
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
                            src={userData.avatarURL}
                        />
                        <div className="label">
                            {userData.name}
                        </div>
                    </Col>                 
                </div>
                <div className="column2">
                    <Col flex={4}>
                        <div className="heading">
                            My Groups
                        </div>
                        <ul className="groups">{myGroupsItems}</ul>
                        <br />
                        <div className="heading">
                            My Reviews
                        </div>
                        <ul>{myReviewsItems}</ul>
                    </Col>
                </div>
            </Row>
        </div>
    );
}

export default UserProfile;
