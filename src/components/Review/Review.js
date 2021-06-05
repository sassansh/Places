import './Review.css'
import { Card, Rate, Col, Row } from 'antd';

function Review(props) {
    let reviewItems = props.reviews.map((review) => 
        <div>
            <li>
                <Card className="review" size="small" style={{borderRadius: "10px"}}>
                    <Row>
                        <Col span={12} className="reviewer"><h2>{review.reviewer}</h2></Col>
                        <Col span={12} className="rating"><Rate allowHalf defaultValue={review.rating} /></Col>
                    </Row>
                </Card>  
            </li>   
        </div>
    );
    return (
    <div>
      <h1>{props.reviews.length + " Reviews"}</h1>
      <ul>{reviewItems}</ul> 
    </div>
 
    );
}

export default Review;
