import './Review.css'
import { Rate } from 'antd';
import { Row, Col } from 'antd';


function Review() {
    let name = "Johnny Li"
    return (
        <div>
            <Row>
                <Col className="reviewName" flex={2.5}>{name}</Col>
                <Col className="reviewRating" flex={2.5}><Rate allowHalf defaultValue={3.5} /></Col>
             </Row>  
        </div>
    );
}

export default Review;