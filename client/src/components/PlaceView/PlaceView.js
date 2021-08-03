import './PlaceView.css';

import { Col, Divider, Rate, Row, Tooltip, Typography, Table, Modal } from 'antd';
import { setCurrentPlace } from '../../redux/actions/placeActions';
import { Link } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import {
  addFavouritePlace,
  deleteFavouritePlace,
  getFavourites,
} from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import ReviewList from '../ReviewList/ReviewList';
import RatingDetail from "../RatingDetail/RatingDetail";
import { getCategories } from '../../redux/actions/categoryActions';
import { getPlaces } from '../../redux/actions/placeActions';
import { getReviews } from '../../redux/actions/reviewActions';
import { useEffect } from 'react';

const { Title } = Typography;

function PlaceView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getReviews());
    dispatch(getFavourites());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );
  const places = useSelector((state) => state.places.allPlaces);
  const myFavourites = useSelector((state) => state.users.favourite_places);
  const currentPlaceID = useSelector((state) => state.places.currentPlaceID);
  const currentPlace = places.find(
    (place) => place.place_id === currentPlaceID
  );
  let reviewsData = useSelector((state) => state.reviews.allReviews).filter(
    (review) => review.place_id === currentPlaceID
  );

  let averageScore =
    reviewsData
      .map((reviewData) => reviewData.rating)
      .reduce((p, c) => p + c, 0) / reviewsData.length;

  const averageScoreString = averageScore !== undefined ? Number(averageScore.toFixed(2)).toString() : "?";


  let isCustom = true;

  let ratingCriteria = [
      {
        name: "Beauty",
        outOf: 6,
        score: 1
      },
      {
        name: "Fun",
        outOf: 3,
        score: 2
      },
      {
        name: "Convenience",
        outOf: 7,
        score: 3
      },
      {
        name: "Quiet",
        outOf: 5,
        score: 4
      },
      {
        name: "Sand",
        outOf: 5,
        score: 5
      }
  ];

  const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      if (record.key === "1") {
        return (
        <div>
          {record.name}
          <br/>
          <Link
            to="/addReview"
            onClick={() => {
              dispatch(setCurrentPlace(currentPlaceID));
            }}
          >
            Edit Review
          </Link>
        </div>
      );
      } else {
        return (
        <div onClick={
          () => {
            Modal.info({
            title: '',
            content: (
              <RatingDetail name={record.name} numeric={true} criteria={ratingCriteria} score={15} outOf={25} />
            ),
            icon: (<div/>),
            closable: true,
            okButtonProps: {style: {visibility: "hidden"}},
            onOk() {},
            onCancel() {},
          });
          }
        }>
        {record.name}
        </div>
      );
      }
    },
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: 'Beauty (6)',
    dataIndex: 'Beauty',
    key: 'Beauty',
    sorter: (a, b) => a.Beauty - b.Beauty,
    responsive: ["md"]
  },
  {
    title: 'Fun (3)',
    dataIndex: 'Fun',
    key: 'Fun',
    sorter: (a, b) => a.Fun - b.Fun,
    responsive: ["md"]
  },
  {
    title: 'Convenience (7)',
    dataIndex: 'Convenience',
    key: 'Convenience',
    sorter: (a, b) => a.Convenience - b.Convenience,
    responsive: ["md"]
  },
  {
    title: 'Quiet (5)',
    key: 'Quiet',
    dataIndex: 'Quiet',
    sorter: (a, b) => a.Quiet - b.Quiet,
    responsive: ["md"]
  },
  {
    title: 'Sand (5)',
    key: 'Sand',
    dataIndex: 'Sand',
    sorter: (a, b) => a.Sand - b.Sand,
    responsive: ["md"]
  },
];

const data = [
  {
    key: '1',
    name: 'Amelia Duckworth',
    total: 19,
    Beauty: 6,
    Fun: 3,
    Convenience: 5,
    Quiet: 2,
    Sand: 3
  },
  {
    key: '2',
    name: 'Sam Coolrater',
    total: 17,
    Beauty: 2,
    Fun: 3,
    Convenience: 7,
    Quiet: 1,
    Sand: 4
  },
  {
    key: '3',
    name: 'Flora McBag',
    total: 18,
    Beauty: 5,
    Fun: 2,
    Convenience: 4,
    Quiet: 4,
    Sand: 3
  },
];


  function addFavourite() {
    dispatch(addFavouritePlace(currentPlaceID));
  }

  function removeFavourite() {
    dispatch(deleteFavouritePlace(currentPlaceID));
  }

  return (
    <div>
      <Row
        style={{
          marginLeft: '20px',
          marginBottom: '10px',
        }}
      >
        <Col span={24}>
          <Row justify="center">
            <Col lg={12} md={12} sm={12}>
              <Title level={2}>
                {currentPlace.name}{' '}
                {myFavourites.includes(currentPlaceID) ? (
                  <Tooltip title="Remove favourite">
                    <HeartFilled
                      onClick={removeFavourite}
                      style={{ color: 'red' }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Favourite place">
                    <HeartOutlined
                      onClick={addFavourite}
                      style={{ color: 'red' }}
                    />
                  </Tooltip>
                )}
              </Title>
            </Col>
            <Col lg={0} md={0} sm={0} xs={24}></Col>
            <Col lg={12} md={12} sm={12} className="categoryName">
              <Title level={3}>
                {currentCategory.name_singular + ' ' + currentCategory.emoji}
              </Title>
            </Col>
          </Row>
          <Row className="placeviewaddress">
            <span>📍 {currentPlace.address}</span>
          </Row>
          <Row className="overallRating">
            <span>
              <Rate allowHalf defaultValue={averageScore} disabled={true} />
              {averageScoreString} out of 5
            </span>
          </Row>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5,
        }}
      />
      <Row type="flex" justify="center" gutter={[36,36]} align="middle">
        <Col
          lg={11}
          sm={22}
          xs={22}
        >
          <img src={currentPlace.ImageURL}
          style={{
            objectFit: "cover",
            height: "300px",
            width: "100%",
          }}
          alt={currentPlace.name}
          />
        </Col>
        <Col lg={11} sm={22} xs={22}>
          {isCustom?
          <RatingDetail criteria={ratingCriteria} score={15} outOf={25} /> :
          <ReviewList reviewsData={reviewsData} />
          }
        </Col>
      </Row>
      {isCustom &&
        <Row justify="center" style={{ marginTop: 36 }}>
        <Col span={22}>
          <Table columns={columns} dataSource={data} pagination={{hideOnSinglePage: true}} />
        </Col>
        </Row>
      }
    </div>
  );
}

export default PlaceView;
