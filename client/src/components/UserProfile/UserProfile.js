import {
    Card,
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
    let numGroups = 0;
    let numPlaces = 0;

    function getPlace(place_id) {
        try {
            numPlaces++;
            let placeName = places.find(place => place.place_id === place_id).name;
            return placeName;
        } catch (e) {
            numPlaces--;
            console.error(e);
        }
    }

    function getRating(rating) {
        return (
            <Rate
            value={rating}
            disabled={true}
          />
        );
    }

    function getGroup(group_id) {
        try {
            numGroups++;
            return (
                <Card size="small"><span className="group">{groups.find(group => group.group_id === group_id).name}</span></Card>
            );
        } catch (e) {
            numGroups--;
            console.error(e);
        }

    }

    const myGroups = userData.groups;
    const myGroupsItems = myGroups.map((group_id) => <li className="group">{getGroup(group_id)}</li>);

    const myReviews = reviews.filter((review) => review.user_id === user.user_id);
    const myReviewsItems = myReviews.map((review) => <li className="review"><Card size="small"><Row><Col span={12}><span className="place">{getPlace(review.place_id)}</span></Col><Col className="rating" span={12}>{getRating(review.rating)}</Col></Row></Card></li>);    

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
            <Row justify="left">
                <Col span={6} className="column1">
                    <img
                        className="profilePic"
                        src={userData.avatarURL}
                        alt="profileImg"
                    />
                    <div className="label">
                        {userData.name}
                    </div>
                    <div>Details</div>
                    <div>Member of {numGroups} Groups</div>
                    <div>Reviewed {numPlaces} Places</div>
                </Col>                 
                <Col span={9} className="column2">
                    <div className="heading">
                        My Groups
                    </div>
                    <ul className="group">{myGroupsItems}</ul>
                </Col>
                <Col span={9} className="column3">
                    <div className="heading">
                        My Reviews
                    </div>
                    <ul>{myReviewsItems}</ul>
                </Col>
            </Row>
        </div>
    );
}

export default UserProfile;
